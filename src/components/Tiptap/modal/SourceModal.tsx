import { Form, Input, Modal } from "antd";
import { html_beautify as beautify } from "js-beautify";

interface FormValues {
  source: string;
}

interface LinkModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: (source: string) => void;
  dataSource?: string;
}

export function SourceModal({
  isOpen,
  onCancel,
  onOk,
  dataSource,
}: LinkModalProps) {
  const [form] = Form.useForm<FormValues>();

  const ok = () => {
    form.validateFields().then(({ source }) => {
      form.resetFields();
      onOk(source);
    });
  };

  return (
    <Modal
      title="Editar Código fonte"
      open={isOpen}
      onOk={ok}
      onCancel={onCancel}
      width="70%"
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          source: dataSource ? beautify(dataSource, { indent_size: 2 }) : "",
        }}
        style={{
          width: "100%",
          maxHeight: "70dvh",
          overflow: "auto",
          overflowWrap: "break-word",
        }}
      >
        <Form.Item name="source" label="Código fonte" style={{ width: "100%" }}>
          <Input.TextArea rows={15} autoFocus />
        </Form.Item>
      </Form>
    </Modal>
  );
}
