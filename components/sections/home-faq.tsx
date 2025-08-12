import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HomeFAQ() {
  const faqs = [
    { q: "What’s the typical turnaround?", a: "Most orders ship in 5–7 business days. Rush options available." },
    { q: "Do you digitize logos?", a: "Yes, within 24–48 hours from vector or high‑res artwork." },
    { q: "Any minimums?", a: "No minimums for most items. Discounts apply for larger quantities." },
  ]
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
          <p className="text-muted-foreground mt-1">Answers to common questions.</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
