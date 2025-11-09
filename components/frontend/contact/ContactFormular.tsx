import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import React from "react";

const ContactFormular = () => {
  return (
    <div className="rounded-2xl border bg-secondary/30 p-8 shadow-sm">
      <Typography variant="h2" className="mb-6 text-2xl">
        Send us a message
      </Typography>
      <form className="grid gap-4">
        <div className="grid gap-2">
          <label
            className="font-nunito-sans text-sm font-semibold"
            htmlFor="name"
          >
            Full name
          </label>
          <Input id="name" placeholder="Jane Doe" required />
        </div>
        <div className="grid gap-2">
          <label
            className="font-nunito-sans text-sm font-semibold"
            htmlFor="email"
          >
            Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <label
            className="font-nunito-sans text-sm font-semibold"
            htmlFor="phone"
          >
            Phone (optional)
          </label>
          <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
        </div>
        <div className="grid gap-2">
          <label
            className="font-nunito-sans text-sm font-semibold"
            htmlFor="message"
          >
            How can we help?
          </label>
          <Textarea
            id="message"
            placeholder="Tell us a bit about your needs or the property you are interested in."
            rows={5}
            required
          />
        </div>
        <Button type="submit" className="mt-2 w-full sm:w-auto">
          Submit message
        </Button>
      </form>
    </div>
  );
};

export default ContactFormular;
