import { PropertyType } from "@prisma/client";
import { PropertyFilters } from "@/types/properties";

type SearchParams = { [key: string]: string | undefined };

/**
 * Parse search params and return page, filters, and queryParams
 */
export function parsePropertySearchParams(params: SearchParams): {
  page: number;
  filters: PropertyFilters;
  queryParams: Record<string, string>;
} {
  const page = Number(params.page) || 1;
  const type = params.type as PropertyType | undefined;
  const location = params.location;
  const minPrice = params.minPrice;
  const maxPrice = params.maxPrice;

  // Create filters object
  const filters: PropertyFilters = {
    ...(type && { type }),
    ...(location && { location }),
    ...(minPrice && { minPrice }),
    ...(maxPrice && { maxPrice }),
  };

  // Create query params for pagination (without page)
  const queryParams: Record<string, string> = {};
  if (type) queryParams.type = type;
  if (location) queryParams.location = location;
  if (minPrice) queryParams.minPrice = minPrice;
  if (maxPrice) queryParams.maxPrice = maxPrice;

  return {
    page,
    filters,
    queryParams,
  };
}
