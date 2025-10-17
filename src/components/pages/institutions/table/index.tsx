import { Card } from "antd";

import { useInstitutionColumns } from "@/components/columns/useInstitutionColumns";
import { useInstitutionList } from "@/services/institutions.service";

import { DataTable } from "../../../../components/data-table";

export function InstitutionsTable() {
  const { data: institutions, isLoading } = useInstitutionList();
  const columns = useInstitutionColumns();

  return (
    <Card styles={{ body: { padding: 16 } }}>
      <DataTable
        loading={isLoading}
        columns={columns}
        dataSource={institutions}
        showTotalText={(total, range) =>
          `${range[0]}-${range[1]} de ${total} instituições`
        }
      />
    </Card>
  );
}
