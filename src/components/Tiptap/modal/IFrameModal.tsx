import { Form, Input, Modal } from 'antd';

interface FormValues {
  href: string;
}

interface IFrameModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: (href: string) => void;
}

export function IFrameModal({ isOpen, onCancel, onOk }: IFrameModalProps) {
  const [form] = Form.useForm<FormValues>();

  const ok = () => {
    form.validateFields().then(({ href }) => {
      form.resetFields();
      onOk(href);
    });
  };

  return (
    <Modal title="Adicionar link" open={isOpen} onOk={ok} onCancel={onCancel}>
      <Form form={form} layout="vertical" name="link" initialValues={{ href: '' }}>
        <Form.Item
          name="href"
          label="Link"
          rules={[
            { required: true, message: 'Por favor, insira o link' },
            { type: 'url', message: 'Link inválido' },
          ]}
          style={{ width: '100%' }}
        >
          <Input placeholder="https://example.com" autoFocus autoComplete="off" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
