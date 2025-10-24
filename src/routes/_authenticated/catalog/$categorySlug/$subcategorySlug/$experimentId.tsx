import { createFileRoute } from "@tanstack/react-router";

import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { SafeHTML } from "@/components/shared/safe-html";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { experimentQueryOptions } from "@/features/experiments/api/getById";
import {
  ExperimentDetails,
  ExperimentNotFount,
  ExperimentsButtons,
  ExperimentSkeleton,
} from "@/features/experiments/components";

export const Route = createFileRoute(
  "/_authenticated/catalog/$categorySlug/$subcategorySlug/$experimentId"
)({
  component: RouteComponent,
  pendingComponent: ExperimentSkeleton,
  errorComponent: ExperimentNotFount,
  loader: async ({ params: { experimentId }, context: { queryClient } }) => {
    const experimentData = await queryClient.ensureQueryData(
      experimentQueryOptions(experimentId)
    );

    const platformNames = new Set<string>();
    if (experimentData.web) platformNames.add("Web");
    if (experimentData.android) platformNames.add("Android");
    if (experimentData.ios) platformNames.add("iOS");
    const platforms = Array.from(platformNames);

    const equivalences: { id: number; name: string }[] = [];
    experimentData.tags?.forEach((tag) => {
      tag.equivalencies?.forEach((eq) => {
        equivalences.push({ id: eq.id, name: eq.name });
      });
    });

    const languagesNames = new Set<string>();
    if (experimentData.pt) languagesNames.add("pt");
    if (experimentData.en) languagesNames.add("en");
    if (experimentData.es) languagesNames.add("es");

    const languages = Array.from(languagesNames);

    return {
      ...experimentData,
      platforms,
      equivalences,
      languages,
      crumb: {
        text: experimentData.name.replaceAll(" ", "-").toLocaleLowerCase(),
        to: "/catalog/$categorySlug/$subcategorySlug/$experimentId",
      },
    };
  },
});

function RouteComponent() {
  const experimentData = Route.useLoaderData();

  return (
    <>
      <CardHeader>
        <CardTitle>
          {experimentData.id} - {experimentData.name}
        </CardTitle>
      </CardHeader>
      <CardContent
        className="grid 
          gap-4 
          sm:grid-cols-1 
          md:grid-cols-2"
      >
        <div className="flex flex-col gap-4 items-start">
          <ImageWithFallback
            src={experimentData.image!}
            alt={experimentData.name}
            className="p-12"
            fallbackContainerClassName="rounded-2xl"
          />
          <ExperimentsButtons link={experimentData.test} />
          <ExperimentDetails
            languages={experimentData.languages}
            platforms={experimentData.platforms}
            equivalences={experimentData.equivalences}
          />
        </div>
        <SafeHTML html={experimentData.description} />
      </CardContent>
    </>
  );
}
