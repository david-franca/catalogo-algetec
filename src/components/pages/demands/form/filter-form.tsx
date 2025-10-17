import { Button, Drawer, Form, Select, Space } from "antd";

import { useDemandTags } from "@/services/demand.service";
import { useInstitutionSelect } from "@/services/institutions.service";
import { useUserSelect } from "@/services/user.service";
import { DemandStatus } from "@/types/demand";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect } from "react";

interface FilterFormProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface FilterFormValues {
  institutions: string[];
  tags: string[];
  status: string[];
  scripting: string[];
  modeling: string[];
  coding: string[];
  testing: string[];
  ualab: string[];
  design: string[];
  author: string;
}

export function FilterForm({ isOpen, onToggle }: FilterFormProps) {
  const { data: institutionsOptions, isLoading: institutionsLoading } =
    useInstitutionSelect();
  const { data: demandTags, isLoading: demandTagsLoading } = useDemandTags();
  const status = Object.values(DemandStatus).map((value) => ({
    text: value,
    value,
  }));
  const { data: userOptions, isLoading: userLoading } = useUserSelect();

  const [form] = Form.useForm<FilterFormValues>();

  const navigate = useNavigate({ from: "/dashboard/demands" });
  const search = useSearch({ from: "/dashboard/demands/" });

  const onFinish = async () => {
    const values = await form.validateFields();

    const params = Object.entries(values)
      .map(([key, value]) => [key, value?.length ? value : undefined])
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    navigate({ search: (prev) => ({ ...prev, ...params }) });
  };

  const onReset = () => {
    form.resetFields();
    const values = form.getFieldsValue();
    navigate({ search: (prev) => ({ ...prev, ...values }) });
  };

  useEffect(() => {
    form.setFieldsValue(search);
  }, [form, search]);

  return (
    <Drawer
      placement="right"
      open={isOpen}
      onClose={onToggle}
      title="Filtros das entregas"
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
      <Form layout="vertical" form={form}>
        <Form.Item name="institutions" label="Instituições">
          <Select
            loading={institutionsLoading}
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={institutionsOptions}
            placeholder="Selecione as instituições"
            className="w-full"
          />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={demandTags}
            placeholder="Selecione as tags"
            className="w-full"
            loading={demandTagsLoading}
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={status}
            placeholder="Selecione os status"
            className="w-full"
          />
        </Form.Item>

        <Form.Item name="author" label="Autor">
          <Select
            showSearch
            optionFilterProp="label"
            options={userOptions}
            placeholder="Selecione os autores"
            className="w-full"
            loading={userLoading}
            allowClear
          />
        </Form.Item>
        <Form.Item name="scripting" label="Roteirização">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione os roteiristas"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
        <Form.Item name="modeling" label="Modelagem">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione os modelistas"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
        <Form.Item name="coding" label="Programação">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione os programadores"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
        <Form.Item name="testing" label="Testes">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione os testadores"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
        <Form.Item name="ualab" label="UALAB">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
        <Form.Item name="design" label="Design">
          <Select
            mode="multiple"
            showSearch
            optionFilterProp="label"
            allowClear
            options={userOptions}
            placeholder="Selecione os designers"
            className="w-full"
            loading={userLoading}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
