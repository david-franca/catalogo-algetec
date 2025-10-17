import { Button, Form, FormProps, Input, Upload } from "antd";
import { useTheme } from "antd-style";
import { RcFile } from "antd/es/upload";
import { nanoid } from "nanoid";
import { ReactNode, useRef } from "react";
import { toast } from "sonner";

import { useAuth } from "@/hooks";
import {
  setAnalysisMessages,
  updateAnalysisContext,
  useChat,
} from "@/hooks/useChat";
import { useChatService } from "@/services/chat.service";
import { readFileContent } from "@/utils/fileReader";
import { UploadOutlined } from "@ant-design/icons";
import { ProChat, ProChatInstance } from "@ant-design/pro-chat";

import { analyzeScript } from "./prompt";

type FieldType = {
  area: string;
  discipline: string;
  file: {
    file: RcFile;
    fileList: RcFile[];
  };
};

export function AnalyzeScript() {
  const theme = useTheme();
  const [form] = Form.useForm<FieldType>();
  const { analysisMessages, resetAnalysisChat } = useChat();
  const proChatRef = useRef<ProChatInstance>();
  const { user } = useAuth();
  const { mutateAsync } = useChatService();

  const analyzeScriptsForm = (
    _: ReactNode,
    onMessageSend: (message: string) => void | Promise<unknown>
  ) => {
    const onFinish: FormProps<FieldType>["onFinish"] = async ({
      area,
      discipline,
      file: { file },
    }) => {
      proChatRef.current?.clearMessage();
      resetAnalysisChat();
      const message = `Por favor faça a análise do roteiro da disciplina ${discipline} da área ${area}. O arquivo de roteiro é ${file.name}.`;
      await onMessageSend(message);
    };

    return (
      <Form
        layout="vertical"
        onFinish={onFinish}
        className="!rounded-b-lg !p-3 !bg-white"
        form={form}
      >
        <div className="!flex !space-x-2">
          <Form.Item<FieldType>
            label="Selecione o arquivo de roteiro"
            name="file"
            rules={[
              { required: true, message: "Por favor, selecione um arquivo" },
            ]}
          >
            <Upload
              beforeUpload={async (file) => {
                const isTXT = file.type === "text/plain";
                const isPDF = file.type === "application/pdf";
                const isDOC =
                  file.type ===
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                if (!isTXT && !isPDF && !isDOC) {
                  toast.error(`${file.name} não é um arquivo válido!`);
                  return Upload.LIST_IGNORE;
                }

                return isTXT || isPDF || isDOC ? false : Upload.LIST_IGNORE;
              }}
              maxCount={1}
              accept={[
                "application/pdf",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "text/plain",
              ].join(",")}
            >
              <Button icon={<UploadOutlined />}>Selecionar arquivo</Button>
            </Upload>
          </Form.Item>
          <Form.Item<FieldType>
            label="Área ou Curso"
            name="area"
            className="!flex-1"
            rules={[{ required: true, message: "Por favor informe a área" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Disciplina"
            name="discipline"
            className="!flex-1"
            rules={[
              { required: true, message: "Por favor informe a disciplina" },
            ]}
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item className="!w-full !m-auto">
          <Button type="primary" block htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return (
    <ProChat
      showTitle
      chatRef={proChatRef}
      userMeta={{
        avatar: "/android-chrome-192x192.png",
        title: user ? user.name : "Algetec",
      }}
      assistantMeta={{
        title: "Assistente de Análise de Roteiros",
        avatar: "/robot.png",
      }}
      className="!shadow-xs !rounded-lg"
      style={{ background: theme.colorBgLayout }}
      helloMessage="Olá, como posso ajudar? Ao se referir ao conteúdo de outra seção, digite o nome dela da seguinte forma: #DesignerDeDocumentos, #AnalisarRoteiros."
      inputAreaRender={analyzeScriptsForm}
      initialChats={analysisMessages}
      request={async (messages) => {
        const message = messages.pop()?.content;

        const validMessage = typeof message === "string" ? message : "";

        const {
          area,
          discipline,
          file: { file },
        } = form.getFieldsValue();

        const content = await readFileContent(file);

        const script = await analyzeScript(
          area,
          discipline,
          content,
          validMessage
        );

        const res = await mutateAsync({
          messages: script,
          isAnalyzeScript: true,
        });

        updateAnalysisContext(res);
        setAnalysisMessages(
          [
            ...script,
            {
              id: nanoid(),
              role: "assistant",
              content: res,
              createAt: Date.now(),
              updateAt: Date.now(),
            },
          ].filter((m) => m.role !== "system")
        );

        form.resetFields();
        return res;
      }}
    />
  );
}
