import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ChatMessage } from "@ant-design/pro-chat";
import { ReviewScript } from "@/types/designer";

interface ChatStore {
  messages: ChatMessage[];
  analysisMessages: ChatMessage[];
  systemContext: Partial<ReviewScript>;
  analysisContext: string | undefined;
  resetChat: () => void;
  resetAnalysisChat: () => void;
}

export const useChat = create(
  persist<ChatStore>(
    () => ({
      messages: [],
      analysisMessages: [],
      systemContext: {},
      analysisContext: undefined,
      resetChat: () => setMessages([]),
      resetAnalysisChat: () => setAnalysisMessages([]),
    }),
    {
      name: "chat-messages",
    }
  )
);

/**
 * Set the messages in the chat state.
 *
 * @param messages The messages to set.
 */

export const setMessages = (messages: ChatMessage[]) => {
  useChat.setState(() => ({ messages }));
};

export const setAnalysisMessages = (messages: ChatMessage[]) => {
  useChat.setState(() => ({ analysisMessages: messages }));
};

/**
 * Updates the system context in the chat state.
 *
 * @param context The context to update.
 *
 * The system context is an object that contains information that is not
 * related to the conversation history, such as the user's name, age, and
 * other relevant information. This information is used by the AI to
 * generate more accurate responses.
 */
export const updateSystemContext = (context: Partial<ReviewScript>) => {
  useChat.setState((state) => ({
    systemContext: { ...state.systemContext, ...context },
  }));
};

export const updateAnalysisContext = (context: string) => {
  useChat.setState(() => ({ analysisContext: context }));
};
