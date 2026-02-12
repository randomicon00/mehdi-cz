import ContactForm from "@/components/ContactForm";
import { genPageMetadata } from "app/seo";

export const metadata = genPageMetadata({
  title: "Contact",
  description:
    "Get in touch with Mehdi Akiki for consulting, collaborations, or project inquiries via a secure contact form or email.",
});

export default function Contact() {
  const formKey = process.env.NEXT_PUBLIC_FORMSPREE_KEY;

  return (
    <>
      <div className="space-y-4 pb-8 pt-6 text-center">
        <h1 className="text-4xl font-extrabold">Contact Me</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Tell me what you're building (or fixing). I'll reply within 24 hours with next steps.
        </p>
      </div>
      <div className="container mx-auto max-w-2xl space-y-8">
        {!formKey ? (
          <div className="text-center">
            <p className="text-lg text-gray-500">
              The contact form is currently unavailable. Please email me at{" "}
              <a href="mailto:mehdi.akiki@gmail.com" className="text-primary-500 underline">
                mehdi.akiki@gmail.com
              </a>
              .
            </p>
          </div>
        ) : (
          <ContactForm />
        )}
      </div>
    </>
  );
}
