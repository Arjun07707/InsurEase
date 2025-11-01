
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faqs = [
      {
          question: "How do I file a new claim?",
          answer: "You can file a new claim by navigating to the 'File a Claim' page from the sidebar. You will need to select the policy you are claiming against, provide the amount, and a reason for the claim."
      },
      {
          question: "How can I see my active policies?",
          answer: "Your active policies are listed on the 'My Policies' page. You can find details about coverage, premium, and policy period there."
      },
      {
          question: "Where can I view my payment history?",
          answer: "The 'Payments' page shows a complete history of all your premium payments, including date, amount, and status."
      },
      {
          question: "How do I browse for new insurance policies?",
          answer: "Visit the 'Browse Policies' page to see all available insurance plans. You can compare them and purchase a new one directly from there."
      },
      {
          question: "What do the different claim statuses mean?",
          answer: "'Pending' means your claim is under review. 'Approved' means your claim has been accepted. 'Rejected' means the claim was not approved."
      }
  ]
  
  export default function HelpPage() {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Find answers to frequently asked questions.
          </p>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>If you can't find an answer here, please contact our support team.</CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
      </div>
    );
  }
