import { Button, Card, Tabs, TabsProps } from "antd";
import { BugIcon } from "lucide-react";
import { useMemo } from "react";

import { useDemand } from "@/services/demand.service";
import { HandleDemand } from "@/utils/handleDemand";
import { useNavigate, useParams } from "@tanstack/react-router";

import { DetailsTab } from "../view/details";
import { HistoryTab } from "../view/history";

export function DemandShowForm() {
  const { id } = useParams({ from: "/dashboard/demands/show/$id" });
  const { data: demand, isLoading, isFetching } = useDemand(id);
  const navigate = useNavigate();

  const demandShow = useMemo(
    () => (demand ? HandleDemand.toProduction(demand) : undefined),
    [demand]
  );

  const tabsItems: TabsProps["items"] = [
    {
      key: "details",
      label: "Detalhes",
      children: <DetailsTab demand={demand} />,
    },
    {
      key: "history",
      label: "Histórico",
      children: <HistoryTab demand={demand} />,
    },
  ];

  return (
    <Card
      loading={isLoading || isFetching}
      title={
        !(isLoading || isFetching)
          ? `${demand?.id} - ${demand?.experiments.name}`
          : null
      }
    >
      <Tabs
        defaultActiveKey="1"
        items={tabsItems}
        tabBarExtraContent={
          demandShow?.issues.length ? (
            <Button
              icon={<BugIcon className="h-4 w-4" />}
              onClick={() =>
                navigate({
                  to: "/dashboard/issues",
                  search: {
                    experiment: demandShow?.id,
                  },
                })
              }
            >
              Problemas
            </Button>
          ) : null
        }
      />
    </Card>
  );
}
