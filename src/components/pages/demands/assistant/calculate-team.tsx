import { Button, FormInstance, InputNumber, Select, Space } from "antd";
import { useState } from "react";

import { useAuth } from "@/hooks";
import { businessDaysAdd, businessDaysSubtract } from "@/utils/isBusinessDay";

type DepartmentSelectOption =
  | "scripting"
  | "modeling"
  | "coding"
  | "testing"
  | "ualab"
  | "designing";

interface CalculateTeamProps {
  formInstante: FormInstance;
  team: DepartmentSelectOption;
}
export function CalculateTeam({ formInstante, team }: CalculateTeamProps) {
  const { user } = useAuth();
  const [time, setTime] = useState<number | null>(1);
  const [control, setControl] = useState<"add" | "minus">("add");

  const handleCalculateTeam = () => {
    const values = formInstante.getFieldsValue();
    const startedAt = values[`${team}_startedAt`];
    const finishedAt = values[`${team}_finishedAt`];

    if (time && startedAt && finishedAt) {
      const start =
        control === "add"
          ? businessDaysAdd(startedAt, time)
          : businessDaysSubtract(startedAt, time);
      const finish =
        control === "add"
          ? businessDaysAdd(finishedAt, time)
          : businessDaysSubtract(finishedAt, time);

      formInstante.setFieldsValue({
        [`${team}_finishedAt`]: finish,
        [`${team}_startedAt`]: start,
      });
    }
  };

  if (!user?.role.super_admin) {
    return null;
  }
  return (
    <Space>
      <Select
        className="w-32"
        options={[
          { label: "Adiar", value: "add" },
          { label: "Antecipar", value: "minus" },
        ]}
        value={control}
        onChange={setControl}
      />
      <InputNumber
        min={1}
        className="w-40"
        value={time}
        onChange={setTime}
        addonAfter="Dias Úteis"
      />

      <Button type="primary" onClick={handleCalculateTeam}>
        Aplicar
      </Button>
    </Space>
  );
}
