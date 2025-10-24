import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import android from "@/assets/android.png";
import ios from "@/assets/ios.png";

interface ExperimentDetailsProps {
  languages: string[];
  platforms: string[];
  equivalences: { id: number; name: string }[];
}

const platformIcons: Record<string, React.ReactNode> = {
  Web: <Globe size={20} />,
  Android: <img src={android} alt="Android" width={20} height={20} />,
  iOS: <img src={ios} alt="iOS" width={20} height={20} />,
};

export function ExperimentDetails({
  languages,
  platforms,
  equivalences,
}: ExperimentDetailsProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <div className="text-gray-500 font-medium text-sm">Idiomas</div>
        <span>
          {languages.map((lang) => t(`navUser.language.${lang}`)).join(", ")}
        </span>
      </div>
      <div>
        <div className="text-gray-500 font-medium text-sm">Plataformas</div>
        {platforms.length > 0 ? (
          <div className="flex items-center gap-4 mt-1">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center gap-2">
                {platformIcons[platform]}
                <span>{platform}</span>
              </div>
            ))}
          </div>
        ) : (
          <span>Nenhuma plataforma informada.</span>
        )}
      </div>
      <div>
        <div className="text-gray-500 font-medium text-sm">Equivalencias</div>
        {equivalences.length > 0 ? (
          equivalences.map((eq) => (
            <div key={eq.id} className="flex items-center gap-2 mt-1">
              <span>{eq.name}</span>
            </div>
          ))
        ) : (
          <span>Nenhuma equivalência informada.</span>
        )}
      </div>
    </div>
  );
}
