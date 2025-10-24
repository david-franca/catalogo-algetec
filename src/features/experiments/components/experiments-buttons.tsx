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
    <div className="flex flex-col xl:flex-row items-center justify-center gap-4 w-full px-2">
      <ExperimentsDialog />
      {link && (
        <Button size="sm" onClick={openLink} className="w-full xl:w-auto">
          Testar Laboratório
        </Button>
      )}
      <Button size="sm" className="w-full xl:w-auto">
        Adicionar a lista
      </Button>
    </div>
  );
}
