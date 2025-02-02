import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";

export const FAQ = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: t("faq.questions.rating.question"),
      answer: t("faq.questions.rating.answer"),
    },
    {
      question: t("faq.questions.privacy.question"),
      answer: t("faq.questions.privacy.answer"),
    },
    {
      question: t("faq.questions.notifications.question"),
      answer: t("faq.questions.notifications.answer"),
    },
    {
      question: t("faq.questions.trial.question"),
      answer: t("faq.questions.trial.answer"),
    },
    {
      question: t("faq.questions.frequency.question"),
      answer: t("faq.questions.frequency.answer"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          {t("faq.title")}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};