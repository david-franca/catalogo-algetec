import { CircleOff } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function ExperimentEmptyDescription() {
  return (
    <Card>
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleOff />
          </EmptyMedia>
          <EmptyTitle>
            O Laboratório não tem uma descrição disponível.
          </EmptyTitle>
          <EmptyDescription>
            Por favor entre em contato com o suporte se isso for um erro.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </Card>
  );
}
