import { useUploadImage } from "@/services/image.service";
import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, Modal, Upload, UploadFile } from "antd";
import { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FormValues {
  href: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: (href: string) => void;
  source: "network" | "local";
}

export function ImageModal({
  isOpen,
  onCancel,
  onOk,
  source,
}: ImageModalProps) {
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const [form] = Form.useForm<FormValues>();

  const [fileList, setFileList] = useState<UploadFile<RcFile>[]>([]);
  const [images, setImages] = useState<
    {
      link: string;
      file: File;
    }[]
  >([]);

  useEffect(() => {
    if (images.length > 0) {
      images.forEach((image) => {
        onOk(image.link);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const ok = () => {
    if (source === "network") {
      form.validateFields().then(({ href }) => {
        form.resetFields();
        onOk(href);
      });
    } else {
      form.resetFields();
      onCancel();
    }
  };

  return (
    <Modal
      title={
        source === "network"
          ? "Adicionar da internet"
          : "Adicionar imagem do computador"
      }
      open={isOpen}
      onOk={ok}
      onCancel={onCancel}
      okButtonProps={{ loading: isUploading }}
    >
      <Form form={form} layout="vertical" name="link">
        {source === "local" && (
          <Form.Item
            name="images"
            style={{ width: "100%", paddingTop: "0.5rem" }}
          >
            <Upload.Dragger
              maxCount={1}
              multiple={false}
              showUploadList={false}
              fileList={fileList}
              beforeUpload={(file) => {
                const isAcceptedType = ["image/jpeg", "image/png"].includes(
                  file.type
                );

                if (!isAcceptedType) {
                  toast.error(`${file.name} não é um arquivo válido!`);
                }

                if (file && isAcceptedType) {
                  const formData = new FormData();
                  formData.append("images", file);
                  setFileList((prev) => [...prev, file]);

                  return uploadImage(formData)
                    .then((res) => {
                      const [link] = res.links;
                      setImages((prev) => [...prev, { link, file }]);
                    })
                    .catch((error) => {
                      toast.error(error.data.message);
                    });
                }

                return isAcceptedType ? false : Upload.LIST_IGNORE;
              }}
              accept={["image/jpeg", "image/png"].join(", ")}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Clique ou arraste o arquivo para esta área para carregar
              </p>
              <p className="ant-upload-hint">
                Suporte para um carregamento único ou em massa. Estritamente
                proibido de fazer upload de dados da empresa ou outros arquivos
                proibidos.
              </p>
            </Upload.Dragger>
          </Form.Item>
        )}
        {source === "network" && (
          <Form.Item
            name="href"
            label="Link"
            rules={[
              { required: true, message: "Por favor, insira o link" },
              { type: "url", message: "Link inválido" },
            ]}
            style={{ width: "100%" }}
          >
            <Input
              placeholder="https://example.com"
              autoFocus
              autoComplete="off"
              allowClear
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}
