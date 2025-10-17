import { Button, Card, Empty, List, Space, Typography } from "antd";
import { DotIcon, Edit2Icon, ListOrderedIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { lazy } from "react";

import { useDisclosure } from "@/hooks";
import { useDesigner } from "@/hooks/useDesigner";

const DesignerMaterialEditModal = lazy(() => import("./edit-modal"));

export function DesignerMaterials() {
  const editModal = useDisclosure();
  const { necessary_materials } = useDesigner();

  return (
    <Card
      title={
        <Space align="center">
          <ListOrderedIcon className="h-4 w-4" />
          <Typography.Text strong>Materiais Necessários</Typography.Text>
        </Space>
      }
      extra={
        <Button
          icon={<Edit2Icon className="h-4 w-4" />}
          type="text"
          shape="circle"
          onClick={editModal.onOpen}
        />
      }
    >
      {necessary_materials && necessary_materials.length > 0 ? (
        <List
          dataSource={necessary_materials}
          renderItem={(item) => (
            <List.Item key={nanoid()}>
              <List.Item.Meta title={item} avatar={<DotIcon />} />
            </List.Item>
          )}
        />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <DesignerMaterialEditModal {...editModal} />
    </Card>
  );
}
