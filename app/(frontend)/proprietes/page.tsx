import PropertiesGridSkeleton from "@/components/frontend/skeletons/PropertiesGridSkeleton";
import { APP_NAME, SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

import { Typography } from "@/components/ui/typography";
import { Suspense } from "react";
import ProprietesList from "@/components/frontend/proprietes/ProprietesList";
import PropertyTypeFilter from "@/components/frontend/proprietes/PropertyTypeFilter";
import ProprietesFilterWrapper from "@/components/frontend/proprietes/ProprietesFilterWrapper";

export const metadata: Metadata = {
  title: `Properties | ${APP_NAME}`,
  description:
    "Browse our extensive collection of properties for sale and rent. Find your perfect home, apartment, or investment property with Real Estate Pro.",
  openGraph: {
    title: `Properties | ${APP_NAME}`,
    description:
      "Browse our extensive collection of properties for sale and rent. Find your perfect home, apartment, or investment property with Real Estate Pro.",
    url: `${SITE_URL}/proprietes`,
    type: "website",
  },
};

type SearchParams = Promise<{ [key: string]: string | undefined }>;

const ProprietesPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const params = await searchParams;

  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <Typography variant="h1" className="mb-2">
        All Proprietes
      </Typography>

      {/* Filters */}

      <ProprietesFilterWrapper initialParams={params} />

      <Suspense key={params.page} fallback={<PropertiesGridSkeleton />}>
        <ProprietesList params={params} />
      </Suspense>
    </section>
  );
};

export default ProprietesPage;
