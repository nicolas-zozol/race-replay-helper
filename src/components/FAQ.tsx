import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "How do you determine if a race is worth watching?",
      answer:
        "We analyze race highlights, overtake numbers, and fan reactions to judge excitement levels.",
    },
    {
      question: "Is my personal data safe?",
      answer: "Yes! We prioritize privacy and never share your contact details.",
    },
    {
      question: "Can I switch my notification method later?",
      answer: "Absolutely! You can update your preferences anytime.",
    },
    {
      question: "What happens after my free trial ends?",
      answer:
        "You will be notified before your trial ends, and you can choose to continue with a paid plan.",
    },
    {
      question: "How often will I receive notifications?",
      answer:
        "You will only receive messages after a race to inform you if it's worth a replay.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary mb-12">
          Frequently Asked Questions
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