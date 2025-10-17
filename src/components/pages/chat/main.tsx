import { useTheme } from "antd-style";
import { nanoid } from "nanoid";

import { useAuth } from "@/hooks";
import { setMessages, useChat } from "@/hooks/useChat";
import { useChatService } from "@/services/chat.service";
import { ProChat } from "@ant-design/pro-chat";

export function MainChat() {
  const theme = useTheme();
  const { user } = useAuth();
  const { messages, resetChat, systemContext, analysisContext } = useChat();
  const { mutateAsync } = useChatService();

  return (
    <ProChat
      showTitle
      userMeta={{
        avatar: "/android-chrome-192x192.png",
        title: user ? user.name : "Algetec",
      }}
      assistantMeta={{
        title: "Assistente de Análise de Roteiros",
        avatar: "/robot.png",
      }}
      style={{ background: theme.colorBgLayout, height: "100%", flexGrow: 1 }}
      helloMessage="Olá, como posso ajudar? Ao se referir ao conteúdo de outra seção, digite o nome dela da seguinte forma: #DesignerDeDocumentos, #AnalisarRoteiros."
      initialChats={messages}
      request={async (messages) => {
        const response = await mutateAsync({
          messages,
          context: systemContext,
          analysisContext,
        });

        setMessages([
          ...messages,
          {
            id: nanoid(),
            role: "assistant",
            content: response,
            createAt: Date.now(),
            updateAt: Date.now(),
          },
        ]);
        return response;
      }}
      onChatsChange={(chats) => {
        if (chats.length === 0) resetChat();
      }}
    />
  );
}
