import { Button, Drawer, Form, Input, Radio, Select, Space } from "antd";

import { useExperimentSelect } from "@/services/experiment.service";
import { useUserSelect } from "@/services/user.service";
import { ISSUES_STATUS } from "@/types/issue";
import { PRIORITY } from "@/utils/handlePriority";
import { useNavigate } from "@tanstack/react-router";

interface FilterFormProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface FormFilters {
  problem?: string;
  priority?: string[];
  status?: string[];
  approved?: boolean;
  creator?: string[];
  responsible?: string[];
  experiment?: string;
}

export function FilterForm({ isOpen, onToggle }: FilterFormProps) {
  const navigate = useNavigate({ from: "/dashboard/issues" });
  const [form] = Form.useForm<FormFilters>();

  const { data: experimentsOptions, isLoading: isExperimentsLoading } =
    useExperimentSelect();
  const { data: userOptions, isLoading: isUserLoading } = useUserSelect();

  const onFinish = async () => {
    const values = await form.validateFields();

    const params = Object.entries(values)
      .map(([key, value]) => [key, value?.length ? value : undefined])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    console.log({ params });

    navigate({
      search: (prev) => ({ ...prev, ...params }),
    });
  };

  const onReset = () => {
    form.resetFields();
    const values = form.getFieldsValue();
    navigate({ search: (prev) => ({ ...prev, ...values }) });
  };

  const handleUrgentCorrection = () => {
    form.resetFields();
    onReset();
    const options = {
      priority: [PRIORITY.CRITICAL.toString()],
      approved: false,
    };
    form.setFieldsValue(options);
    navigate({
      search: options,
    });
  };

  const handlePendingApproval = () => {
    form.resetFields();
    onReset();
    const options = {
      approved: false,
      status: [
        ISSUES_STATUS.DUPLICATE,
        ISSUES_STATUS.NO_REMOVE,
        ISSUES_STATUS.RESOLVED,
        ISSUES_STATUS.IS_NOT_ERROR,
      ],
    };
    form.setFieldsValue(options);
    navigate({
      search: options,
    });
  };

  const handleCorrectionPending = () => {
    form.resetFields();
    onReset();
    const options = {
      approved: false,
      status: [ISSUES_STATUS.NEW],
    };
    form.setFieldsValue(options);
    navigate({
      search: options,
    });
  };

  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={onToggle}
      title="Filtros dos problemas"
      width={600}
      extra={
        <Space>
          <Button onClick={onReset}>Limpar</Button>
          <Button type="primary" onClick={onFinish}>
            Aplicar
          </Button>
        </Space>
      }
    >
      <Space direction="vertical" className="mb-4 w-full">
        <Button block onClick={handleUrgentCorrection}>
          Correção Urgente
        </Button>
        <Button block onClick={handleCorrectionPending}>
          Correção Pendente
        </Button>
        <Button block onClick={handlePendingApproval}>
          Aprovação Pendente
        </Button>
      </Space>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item label="Problema" name="problem">
          <Input />
        </Form.Item>
        <Form.Item name="experimentId" label="Prática">
          <Select
            placeholder="Selecione uma Prática"
            allowClear
            showSearch
            disabled={isExperimentsLoading}
            options={experimentsOptions}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item label="Gravidade" name="priority">
          <Select
            mode="multiple"
            allowClear
            options={[
              {
                label: "Baixa",
                value: PRIORITY.LOW.toString(),
              },
              {
                label: "Normal",
                value: PRIORITY.NORMAL.toString(),
              },
              {
                label: "Alta",
                value: PRIORITY.HIGH.toString(),
              },
              {
                label: "Critica",
                value: PRIORITY.CRITICAL.toString(),
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select
            mode="multiple"
            allowClear
            optionFilterProp="label"
            options={[
              {
                label: ISSUES_STATUS.NEW,
                value: ISSUES_STATUS.NEW,
              },
              {
                label: ISSUES_STATUS.IS_NOT_ERROR,
                value: ISSUES_STATUS.IS_NOT_ERROR,
              },
              {
                label: ISSUES_STATUS.DUPLICATE,
                value: ISSUES_STATUS.DUPLICATE,
              },
              {
                label: ISSUES_STATUS.NO_REMOVE,
                value: ISSUES_STATUS.NO_REMOVE,
              },
              {
                label: ISSUES_STATUS.RESOLVED,
                value: ISSUES_STATUS.RESOLVED,
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Aprovado" name="approved">
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio value>Sim</Radio>
            <Radio value={false}>Não</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Autor" name="creator">
          <Select
            mode="multiple"
            optionFilterProp="label"
            maxTagCount="responsive"
            loading={isUserLoading}
            disabled={isUserLoading}
            allowClear
            showSearch
            options={userOptions}
          />
        </Form.Item>
        <Form.Item label="Responsável" name="responsible">
          <Select
            mode="multiple"
            optionFilterProp="label"
            maxTagCount="responsive"
            loading={isUserLoading}
            disabled={isUserLoading}
            allowClear
            showSearch
            options={userOptions}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
