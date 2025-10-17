import { Card, Select, Space, Tabs, TabsProps } from "antd";
import { useMemo, useState } from "react";
import { SkillsTable } from "./skills.table";
import ObjectsTableList from "./objects.table";

export function SkillListTable() {
  const [selectPractice, setSelectPractice] = useState<string>();
  const handleSelectChange = (value: string) => {
    setSelectPractice(value);
  };
  const items: TabsProps["items"] = useMemo<TabsProps["items"]>(
    () => [
      {
        key: "skills",
        label: "Habilidades",
        children: <SkillsTable filter={selectPractice} />,
      },
      {
        key: "objects",
        label: "Objetos",
        children: <ObjectsTableList />,
        disabled: true,
      },
    ],
    [selectPractice]
  );
  return (
    <Card>
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={
          <Space>
            <Select
              allowClear
              className="w-72"
              placeholder="Exibindo tudo"
              onChange={handleSelectChange}
              options={[
                {
                  label: "Objetos de conhecimento sem práticas",
                  value: "objects",
                },
                { label: "Habilidades sem práticas", value: "skills" },
              ]}
            />
          </Space>
        }
      />
    </Card>
  );
}
