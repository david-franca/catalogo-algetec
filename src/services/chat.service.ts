import { nanoid } from "nanoid";

import { setAnalysisMessages, setMessages } from "@/hooks/useChat";
import { ChatData } from "@/types/chat";
import { ReviewScript } from "@/types/designer";
import { apiClient } from "@/utils";
import { ChatMessage } from "@ant-design/pro-chat";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY;
const MAX_MESSAGES_PER_DAY = 100;

async function getKey() {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(ENCRYPTION_KEY),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("salt"), // Use um salt seguro em produção
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

// Função para criptografar os dados
async function encryptData(data: ChatData): Promise<string> {
  const key = await getKey();
  const encoder = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12)); // Vetor de inicialização
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(JSON.stringify(data))
  );

  // Concatena o IV e o dado criptografado para armazenar no localStorage
  return JSON.stringify({
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  });
}

// Função para descriptografar os dados
async function decryptData(encryptedData: string): Promise<ChatData | null> {
  try {
    const { iv, data } = JSON.parse(encryptedData);
    const key = await getKey();
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(iv) },
      key,
      new Uint8Array(data)
    );
    const decoder = new TextDecoder();
    return JSON.parse(decoder.decode(decrypted));
  } catch {
    return null;
  }
}

function getCurrentDate(): string {
  const today = new Date();
  return today.toISOString().split("T")[0]; // Ex: '2023-01-01'
}

export async function canSendMessage(): Promise<boolean> {
  const currentDate = getCurrentDate();
  const encryptedData = localStorage.getItem("messageCount");
  const chatData: ChatData = encryptedData
    ? (await decryptData(encryptedData)) || { date: "", count: 0 }
    : { date: "", count: 0 };

  // If it's a new day, reset the counter
  if (chatData.date !== currentDate) {
    chatData.date = currentDate;
    chatData.count = 0;
  }

  // Check if the limit has been reached
  return chatData.count < MAX_MESSAGES_PER_DAY;
}

export async function incrementMessageCount(): Promise<void> {
  const currentDate = getCurrentDate();
  const encryptedData = localStorage.getItem("messageCount");
  let chatData: ChatData = encryptedData
    ? (await decryptData(encryptedData)) || { date: "", count: 0 }
    : { date: "", count: 0 };

  chatData = {
    date: currentDate,
    count: (chatData.count || 0) + 1,
  };

  const encryptedChatData = await encryptData(chatData);
  localStorage.setItem("messageCount", encryptedChatData);
}

export const useChatService = () => {
  return useMutation({
    mutationKey: ["chat"],
    mutationFn: async ({
      messages,
      context,
      analysisContext,
      isAnalyzeScript,
    }: {
      messages: ChatMessage<Record<string, unknown>>[];
      context?: Partial<ReviewScript>;
      analysisContext?: string;
      isAnalyzeScript?: boolean;
    }) => {
      if (isAnalyzeScript) {
        setAnalysisMessages([]);
      }

      const canSend = await canSendMessage();
      if (!canSend) {
        const message =
          "Você atingiu o limite de 100 mensagens por dia. Por favor, tente novamente amanha.";
        if (isAnalyzeScript) {
          setAnalysisMessages(
            [
              ...messages,
              {
                id: nanoid(),
                role: "assistant",
                content: message,
                createAt: Date.now(),
                updateAt: Date.now(),
              },
            ].filter((m) => m.role !== "system")
          );
        } else {
          setMessages([
            ...messages,
            {
              id: nanoid(),
              role: "assistant",
              content: message,
              createAt: Date.now(),
              updateAt: Date.now(),
            },
          ]);
        }
        return message;
      }

      const pickMessages = messages.map((message) => ({
        role: message.role as "user" | "assistant" | "system",
        content: message.content as string,
      }));

      const { data } = await apiClient.post<{ content: string }>(
        "/chat/create",
        {
          model: "o3-mini",
          messages: [
            {
              role: "system",
              content: `#DesignerDeDocumentos: ${JSON.stringify(context)}`,
            },
            {
              role: "system",
              content: `#AnalisarRoteiros: ${analysisContext}`,
            },
            ...pickMessages,
          ],
        }
      );

      return data.content;
    },
    onSuccess: async () => {
      await incrementMessageCount();
    },
  });
};

const schema = z.object({
  reasoning: z.string(),
  necessary_materials: z.array(
    z.object({
      id: z.number(),
      item: z.string(),
    })
  ),
  procedures: z.array(
    z.object({
      id: z.number(),
      procedure: z.string(),
      cognitive_hint: z.string(),
      intermediate_text: z.string(),
    })
  ),
  result_analysis: z.array(
    z.object({
      question: z.string(),
      id: z.number(),
    })
  ),
});

export const useImportRoteiro = () => {
  return useMutation({
    mutationKey: ["chat-import"],
    mutationFn: async ({
      messages,
    }: {
      messages: ChatMessage<Record<string, unknown>>[];
    }) => {
      const canSend = await canSendMessage();
      if (!canSend) {
        const message =
          "Você atingiu o limite de 100 mensagens por dia. Por favor, tente novamente amanha.";
        return toast.warning(message);
      }

      const pickMessages = messages.map((message) => ({
        role: message.role as "user" | "assistant" | "system",
        content: message.content as string,
      }));

      const { data } = await apiClient.post<{ content: string }>(
        "/chat/create",
        {
          model: "o3-mini",
          messages: [...pickMessages],
        }
      );

      const parsedContent = JSON.parse(data.content);

      const parsedData = schema.safeParse(parsedContent);

      if (!parsedData.success) {
        return toast.error(parsedData.error.message);
      }

      return parsedData.data;
    },
    onSuccess: async () => {
      await incrementMessageCount();
    },
  });
};
