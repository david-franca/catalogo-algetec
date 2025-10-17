import { DatePicker, Form, Input, Modal, Select, Slider, Switch } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

import { useAuth } from "@/hooks";
import { useCreateDemandLog } from "@/services/demand.service";
import { useUserSelect } from "@/services/user.service";
import { handleTypeName } from "@/utils";
import { numberOfBusinessDays } from "@/utils/isBusinessDay";

interface AddLogProps {
  onClose: () => void;
  open: boolean;
  demandId: number;
  lastStartedAt: string;
  type: string;
}

interface InitialValues {
  deadline: number;
  developers: number[];
  finishedAt: Dayjs;
  createdAt: Dayjs;
  type: string;
  active: boolean;
  progress: number;
  message: string;
}

export function AddLogModalForm({
  onClose,
  open,
  demandId,
  lastStartedAt,
  type,
}: AddLogProps) {
  const { data: users, isLoading: usersLoading } = useUserSelect();
  const [form] = Form.useForm<InitialValues>();
  const [checked, setChecked] = useState(true);
  const initialValues: Partial<InitialValues> = {
    progress: 0,
  };
  const { user } = useAuth();
  const { mutate } = useCreateDemandLog();

  const onFinish = async () => {
    const values = await form.validateFields();

    if (user) {
      const create = {
        active: checked,
        type,
        demand_id: demandId,
        logger_id: user?.id,
        deadline:
          numberOfBusinessDays(
            dayjs(lastStartedAt).toDate(),
            values.finishedAt.toDate()
          )?.hours || 0,
        developers: values.developers,
        progress: values.progress,
        finishedAt: values.finishedAt.toISOString(),
        createdAt: values.createdAt.toISOString(),
      };

      mutate(create);
    }
  };

  const onCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={`Adicionar Histórico - ${handleTypeName(type)}`}
      open={open}
      okText="Salvar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={onFinish}
      okButtonProps={
        {
          // loading: isLoading,
        }
      }
      styles={{
        mask: {
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item name="active" label="Status">
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e)}
            checkedChildren="Ativo"
            unCheckedChildren="Inativo"
          />
        </Form.Item>
        <Form.Item
          name="createdAt"
          label="Data de Criação do Histórico"
          rules={[
            {
              required: true,
              message: "Data de Criação do Histórico é obrigatória",
            },
            {
              type: "date",
              message: "Data de Criação do Histórico deve ser uma data válida",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            showTime={{ format: "HH:mm" }}
            showNow
          />
        </Form.Item>
        <Form.Item
          name="finishedAt"
          label="Data de Finalização"
          rules={[
            {
              required: true,
              message: "Data de Criação do Histórico é obrigatória",
            },
            {
              type: "date",
              message: "Data de Criação do Histórico deve ser uma data válida",
            },
          ]}
        >
          <DatePicker
            format="DD/MM/YYYY HH:mm"
            showTime={{ format: "HH:mm" }}
            showNow
            disabledDate={(e) => {
              const last = dayjs(lastStartedAt);
              return last.valueOf() > e.valueOf();
            }}
            onChange={(value) => {
              if (value) {
                form.setFieldValue(
                  "message",
                  numberOfBusinessDays(
                    dayjs(lastStartedAt).toDate(),
                    value.toDate()
                  )?.message
                );
              }
            }}
          />
        </Form.Item>
        <Form.Item name="message" label="Prazo">
          <Input readOnly />
        </Form.Item>
        <Form.Item
          name="developers"
          label="Responsáveis"
          rules={[
            {
              type: "array",
              required: true,
              message: "Responsáveis é obrigatório",
            },
          ]}
        >
          <Select
            placeholder="Selecione um responsável"
            mode="multiple"
            allowClear
            showSearch
            disabled={usersLoading}
            options={users}
            optionFilterProp="label"
          />
        </Form.Item>
        <Form.Item
          name="progress"
          label="Progresso (%)"
          rules={[
            {
              required: true,
              message: "Progresso é obrigatório",
            },
            {
              type: "number",
              min: 0,
              max: 100,
              message: "Progresso deve ser entre 0 e 100",
            },
          ]}
        >
          <Slider
            min={0}
            max={100}
            marks={{
              0: "0%",
              20: "20%",
              40: "40%",
              60: "60%",
              80: "80%",
              100: "100%",
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
