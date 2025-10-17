import { Flex, Form, Input, InputNumber, Modal } from 'antd';

interface FormValues {
  url: string;
  height: number;
  width: number;
}

interface YoutubeModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onOk: (url: string, height: number, width: number) => void;
}

export function YoutubeModal({ isOpen, onCancel, onOk }: YoutubeModalProps) {
  const [form] = Form.useForm<FormValues>();
  const ok = () => {
    form.validateFields().then(({ height, url, width }) => {
      form.resetFields();
      onOk(url, height, width);
    });
  };

  return (
    <Modal title="Adicionar vídeo do Youtube" open={isOpen} onOk={ok} onCancel={onCancel}>
      <Form
        form={form}
        layout="vertical"
        name="youtube"
        initialValues={{
          url: '',
          height: 480,
          width: 640,
        }}
      >
        <Form.Item
          name="url"
          label="Link do video"
          style={{ width: '100%' }}
          rules={[
            {
              required: true,
              message: 'Por favor, insira o link do video',
            },
          ]}
        >
          <Input placeholder="https://www.youtube.com/watch?v=..." />
        </Form.Item>
        <Flex justify="space-between" style={{ width: '100%' }}>
          <Form.Item
            name="height"
            label="Altura"
            rules={[
              {
                required: true,
                message: 'Por favor, insira a altura',
              },
              {
                validator: (_, value) => {
                  if (value < 180) return Promise.reject();
                  return Promise.resolve();
                },
                message: 'Altura deve ser maior ou igual a 180',
              },
            ]}
          >
            <InputNumber placeholder="480" style={{ width: '100%' }} min={180} />
          </Form.Item>
          <Form.Item
            name="width"
            label="Largura"
            rules={[
              {
                required: true,
                message: 'Por favor, insira a largura',
              },
              {
                validator: (_, value) => {
                  if (value < 320) return Promise.reject();
                  return Promise.resolve();
                },
                message: 'Largura deve ser maior ou igual a 320',
              },
            ]}
          >
            <InputNumber placeholder="640" style={{ width: '100%' }} min={320} />
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
}
