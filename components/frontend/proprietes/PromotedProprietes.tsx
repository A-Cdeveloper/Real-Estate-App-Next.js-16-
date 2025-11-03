import { getPromotedProperties } from "@/lib/queries/properties";
import RealtyListItem from "./RealtyListItem";
import CarouselCustum from "@/components/frontend/CarouselCustum";

const PromotedProprietes = async () => {
  const promotedProperties = await getPromotedProperties(9);
  return (
    <div>
      <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
        Promoted Properties
      </h2>
      <CarouselCustum
        items={promotedProperties}
        render={(property) => <RealtyListItem property={property} />}
        itemClassName="basis-full md:basis-1/2 lg:basis-1/2"
      />
    </div>
  );
};

export default PromotedProprietes;
