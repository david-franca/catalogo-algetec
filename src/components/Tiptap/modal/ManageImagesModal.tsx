import { DeleteOutlined, LinkOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Image, List, Modal, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface ManageImageModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
  dataSource?: string;
}

export function ManageImagesModal({
  isOpen,
  onCancel,
  onOk,
  dataSource,
}: ManageImageModalProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (dataSource && isOpen) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(dataSource, "text/html");
      const images = doc.querySelectorAll("img");
      const urls = Array.from(images).map((img) => img.src);
      setImageUrls(urls);
    } else {
      setImageUrls([]); // Limpa a lista quando o modal é fechado ou não há dados
    }
  }, [dataSource, isOpen]);

  return (
    <Modal
      title="Gerenciar imagens"
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      width="60%"
    >
      <List
        locale={{ emptyText: "Nenhuma imagem encontrada" }}
        grid={{ gutter: 16, xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}
        dataSource={imageUrls}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.19)",
              }}
              actions={[
                <Tooltip title="Copiar link">
                  <Button
                    icon={<LinkOutlined />}
                    type="link"
                    onClick={() => {
                      navigator.clipboard.writeText(item);
                      toast.success("Copiado para a área de transferência!");
                    }}
                  />
                </Tooltip>,

                <Tooltip title="Remover imagem">
                  <Button
                    type="link"
                    danger
                    onClick={() => {
                      const imageIndex = imageUrls.findIndex(
                        (image) => image === item
                      );
                      const newImages = imageUrls.slice();
                      newImages.splice(imageIndex, 1);
                      setImageUrls(newImages);
                    }}
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>,
              ]}
            >
              <Flex justify="center">
                <Image src={item} height={100} />
              </Flex>
            </Card>
          </List.Item>
        )}
      />
    </Modal>
  );
}
