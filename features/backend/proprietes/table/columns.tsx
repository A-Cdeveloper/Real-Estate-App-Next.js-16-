import CustumImage from "@/components/shared/CustumImage";
import { Column } from "@/components/shared/GenericTable";
import { formatLongDate } from "@/lib/utils/date";

import { DEFAULT_NEWS_IMAGE } from "@/lib/constants";
import { PropertyWithOwner } from "@/types/properties";
import ActionsCell from "./ActionsCell";

/**
 * Columns for the news table
 * @returns {Column<News>[]} Columns for the news table
 */
export const getColumns = (): Column<PropertyWithOwner>[] => [
  {
    key: "image",
    label: "",
    render: (property) => {
      return (
        <CustumImage
          src={property.image || DEFAULT_NEWS_IMAGE}
          alt={property.name}
          className="w-17 h-17 rounded-none"
        />
      );
    },
  },
  {
    key: "name",
    label: "Name",
    render: (property) => {
      return (
        <h2 className="text-white max-w-[120px] line-clamp-2">
          {property.name || "N/A"}
        </h2>
      );
    },
  },

  {
    key: "type",
    label: "Type",
    render: (property) => <span>{property.type || "N/A"}</span>,
  },

  {
    key: "price",
    label: "Price",
    render: (property) => (
      <span>€ {property.price.toLocaleString() || "N/A"}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (property) => <span>{property.status || "N/A"}</span>,
  },
  {
    key: "owner",
    label: "Owner",
    render: (property) => <span>{property.owner.name || "N/A"}</span>,
  },
  {
    key: "createdAt",
    label: "Created",
    render: (property) => formatLongDate(property.createdAt),
  },

  {
    key: "edit/delete",
    label: "",
    render: (property) => <ActionsCell property={property} />,
  },
];
