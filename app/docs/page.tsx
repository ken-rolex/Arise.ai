import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DocsPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Documentation</h1>
      <p className="mb-8 text-muted-foreground">
        Learn how to use Arise to manage and interact with your local AI models.
      </p>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="getting-started">
          <AccordionTrigger>Getting Started</AccordionTrigger>
          <AccordionContent>
            Learn the basics of using Arise, including installation and setup.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="model-library">
          <AccordionTrigger>Model Library</AccordionTrigger>
          <AccordionContent>
            Discover how to browse, install, and manage AI models.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="interactive-console">
          <AccordionTrigger>Interactive Console</AccordionTrigger>
          <AccordionContent>
            Learn how to interact with your installed models through the console interface.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

