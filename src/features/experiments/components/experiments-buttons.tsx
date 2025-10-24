import { Button } from "@/components/ui/button";

import { ExperimentsDialog } from "./experiments-dialog";

interface ExperimentDetailsProps {
  link?: string | null;
}

export function ExperimentsButtons({ link }: ExperimentDetailsProps) {
  const openLink = () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 w-full px-2">
      <ExperimentsDialog />
      {link && (
        <Button size="sm" onClick={openLink} className="w-full lg:w-auto">
          Testar Laboratório
        </Button>
      )}
      <Button size="sm" className="w-full lg:w-auto">
        Adicionar a lista
      </Button>
    </div>
  );
}
