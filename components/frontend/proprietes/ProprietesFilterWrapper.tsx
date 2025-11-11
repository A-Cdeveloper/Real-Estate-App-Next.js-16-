"use client";

import { Activity, useState } from "react";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import PropertyTypeFilter from "./PropertyTypeFilter";
import { cn } from "@/lib/utils";

const ProprietesFilterWrapper = ({
  initialParams,
  className,
}: {
  initialParams: { [key: string]: string | undefined };
  className?: string;
}) => {
  // Show filters if there are more than 1 initial params (page is not included)
  const showFilters = Object.keys(initialParams).length > 1;
  const [isOpen, setIsOpen] = useState(showFilters);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex justify-end gap-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsOpen((prev) => !prev)}
          className="font-semibold !bg-transparent"
        >
          {isOpen ? (
            <>
              <X className="size-5" aria-hidden="true" />
              Hide Filters
            </>
          ) : (
            <>
              <FilterIcon className="size-5" aria-hidden="true" />
              Show Filters
            </>
          )}
        </Button>

        <div className="flex items-center gap-2">
          <select className="px-4 py-1.5 border border-input rounded-md bg-background font-nunito-sans text-primary focus:outline-none focus:ring-1 focus:ring-ring">
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <div className="rounded-2xl border border-border/60 bg-secondary/40 p-6 backdrop-blur-sm">
          <PropertyTypeFilter
            initialParams={initialParams}
            clearRoute="/proprietes"
          />
        </div>
      </Activity>
    </div>
  );
};

export default ProprietesFilterWrapper;
