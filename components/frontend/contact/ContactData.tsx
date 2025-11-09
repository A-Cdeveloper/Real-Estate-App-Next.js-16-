import { Typography } from "@/components/ui/typography";
import {
  APP_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/constants";

const ContactData = () => {
  return (
    <div className="rounded-2xl border bg-secondary/30 p-8 shadow-sm">
      <Typography variant="h2" className="text-xl">
        Our office
      </Typography>
      <div className="mt-4 space-y-1 text-sm text-muted-foreground">
        <Typography variant="h3" className="font-semibold text-foreground">
          {APP_NAME}
        </Typography>
        <Typography variant="p">{CONTACT_ADDRESS}</Typography>
      </div>
      <div className="mt-6 space-y-1 text-sm text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">Phone:</span>{" "}
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="text-primary hover:underline"
          >
            {CONTACT_PHONE}
          </a>
        </p>
        <p>
          <span className="font-semibold text-foreground">Email:</span>{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-primary hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p>
          <span className="font-semibold text-foreground">Working hours:</span>{" "}
          Monday – Friday, 9:00 – 18:00
        </p>
      </div>
    </div>
  );
};

export default ContactData;
