import { useDisclosure } from "@/hooks";
import { useWikiCategoryCreate, useWikiSelect } from "@/services/wiki.service";
import { Button, Form, Input, Modal } from "antd";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

export function CreateCategoryForm() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutateAsync: createCategory, isPending: isCreatingCategory } =
    useWikiCategoryCreate();
  const { data: wikiOptions } = useWikiSelect();

  /**
   * Checks if a category name already exists in the wiki options, ignoring case.
   * @param {string} name The category name to check.
   * @returns {boolean} `true` if the name exists, `false` otherwise.
   */
  const categoryNameExists = (name: string): boolean => {
    return !!wikiOptions?.some(
      (option) => option.label.toLowerCase() === name.toLowerCase()
    );
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      const name = values.category;
      if (categoryNameExists(name)) {
        throw new Error("Uma categoria com este nome já existe.");
      }
      await createCategory({ name: values.category, index: 1 });
      form.resetFields();
      toast.success("Categoria criada com sucesso!");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Ocorreu um erro ao criar a categoria.");
      }
    }
  };
  const [form] = Form.useForm();

  return (
    <>
      <Button
        type="primary"
        icon={<PlusIcon className="h-4 w-4" />}
        onClick={onOpen}
      >
        Categoria
      </Button>
      <Modal
        title="Nova categoria"
        open={isOpen}
        onCancel={onClose}
        onOk={onFinish}
        okText="Salvar"
        okButtonProps={{ loading: isCreatingCategory }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Categoria"
            name="category"
            rules={[
              { required: true, message: "Campo obrigatório" },
              { min: 3, message: "Mínimo de 3 caracteres" },
              { max: 100, message: "Máximo de 100 caracteres" },
              {
                validator: (_, value) => {
                  if (value && categoryNameExists(value)) {
                    return Promise.reject(
                      new Error("Uma categoria com este nome já existe.")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input placeholder="Digite o nome da categoria" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
