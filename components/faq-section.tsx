import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  return (
    <div className="rounded-3xl bg-[#12131f] border border-white/5 p-8">
      <h3 className="text-xl font-bold text-white mb-6">Stake frequently asked questions (FAQ)</h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b border-white/5">
          <AccordionTrigger className="text-gray-300 hover:text-white hover:no-underline">
            What is Dypius Staking?
          </AccordionTrigger>
          <AccordionContent className="text-gray-400">
            Dypius Staking is a way to earn rewards by holding your DYP tokens. By locking your tokens for a specific
            period, you can earn competitive APR rates while contributing to the ecosystem's stability.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b border-white/5">
          <AccordionTrigger className="text-gray-300 hover:text-white hover:no-underline">
            How do I start staking?
          </AccordionTrigger>
          <AccordionContent className="text-gray-400">
            To start staking, connect your wallet, choose a pool that suits your preferences (lock time and APR),
            approve the transaction, and deposit your tokens.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b-0">
          <AccordionTrigger className="text-gray-300 hover:text-white hover:no-underline">
            Are my funds safe?
          </AccordionTrigger>
          <AccordionContent className="text-gray-400">
            Yes, Dypius utilizes audited smart contracts to ensure the security of your funds. However, as with all DeFi
            protocols, there are inherent risks involved.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
