// Internal config
import { config } from "@/config";
// Internal components
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQSectionProps {}

export const FAQSection: React.FC<FAQSectionProps> = () => {
  if (!config.faqs || !config.faqs.questions.length) return null;

  return (
    <section className="faq-container px-4 max-w-screen-xl mx-auto w-full bg-black ">
      <h2 className="text-center heading-md text-white">{config.faqs.title}</h2>

      <Accordion type="multiple">
        {config.faqs.questions.map(({ title, description }, i) => (
          <AccordionItem value={`${i}-${title}`} key={`${i}-${title}`}>
            <AccordionTrigger className="">
              <p className="body-md-semibold text-white">{title}</p>
            </AccordionTrigger>
            <AccordionContent>
              <p className="body-sm py-4 text-white">{description}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
