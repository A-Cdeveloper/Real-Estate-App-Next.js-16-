import { getLatestProperties } from "@/lib/queries/properties";
import RealtyListItem from "./RealtyListItem";
import CarouselCustum from "@/components/frontend/CarouselCustum";

const LatestProprietes = async () => {
  const latestProperties = await getLatestProperties(9);
  return (
    <div>
      <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
        Latest Properties
      </h2>
      <CarouselCustum
        items={latestProperties}
        render={(property) => <RealtyListItem property={property} />}
      />
    </div>
  );
};

export default LatestProprietes;
