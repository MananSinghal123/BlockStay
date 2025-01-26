import { config } from "@/config";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQSectionProps = {};

// Update this in your config file
const projectFAQs = [
  {
    title: "What is Hotel Coin Exchange?",
    description:
      "Hotel Coin Exchange is a revolutionary platform that allows you to book hotel rooms using blockchain technology. We turn your bookings into NFTs, giving you the flexibility to trade or transfer your reservations.",
  },
  {
    title: "How does booking with NFTs work?",
    description:
      "When you book a room through our platform, you receive an NFT that represents your reservation. This NFT can be held in your digital wallet, transferred to someone else, or even traded on supported marketplaces.",
  },
  {
    title: "What if I need to cancel my booking?",
    description:
      "Instead of traditional cancellation, you can sell or transfer your booking NFT to someone else. This gives you more flexibility and potentially allows you to recoup your costs if your plans change.",
  },
  {
    title: "Is my booking secure?",
    description:
      "Yes, your booking is secured on the blockchain. The NFT you receive is a tamper-proof record of your reservation, ensuring that your booking is honored by the hotel.",
  },
  {
    title: "What cryptocurrencies can I use for booking?",
    description:
      "Currently, we support Aptos (APT) for bookings. We're working on expanding to other cryptocurrencies in the future.",
  },
  {
    title: "Do I need a specific wallet to use Hotel Coin Exchange?",
    description:
      "You'll need an Aptos-compatible wallet like Petra etc. wallet to interact with our platform and store your booking NFTs.",
  },
];

config.faqs = {
  title: "Frequently Asked Questions",
  questions: projectFAQs,
};

export const FAQSection: React.FC<FAQSectionProps> = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!config.faqs || !config.faqs.questions.length) return null;

  const toggleItem = (value: string) => {
    setOpenItems((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="relative py-24 overflow-hidden bg-[#070B1E]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-900/10 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-cover bg-center opacity-5" />

      <div className="relative px-4 max-w-screen-xl mx-auto w-full">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold mb-12 text-blue-300 uppercase tracking-wider"
        >
          {config.faqs.title}
        </motion.h2>

        <Accordion type="multiple" value={openItems} onValueChange={setOpenItems}>
          {config.faqs.questions.map(({ title, description }, i) => (
            <AccordionItem
              value={`${i}-${title}`}
              key={`${i}-${title}`}
              className="border-b border-blue-700/50 last:border-b-0"
            >
              <AccordionTrigger
                onClick={() => toggleItem(`${i}-${title}`)}
                className="py-6 group"
                onMouseEnter={() => setHoveredItem(`${i}-${title}`)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <motion.div
                  className="flex items-center justify-between w-full"
                  initial={false}
                  animate={{
                    color: openItems.includes(`${i}-${title}`) ? "#93c5fd" : "#ffffff",
                    scale: hoveredItem === `${i}-${title}` ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.p className="text-lg font-semibold transition-colors duration-300">{title}</motion.p>
                  <motion.div
                    animate={{
                      rotate: openItems.includes(`${i}-${title}`) ? 180 : 0,
                      scale: hoveredItem === `${i}-${title}` ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.div>
                </motion.div>
              </AccordionTrigger>
              <AnimatePresence>
                {openItems.includes(`${i}-${title}`) && (
                  <AccordionContent forceMount>
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="py-4 text-blue-100"
                    >
                      {description}
                    </motion.p>
                  </AccordionContent>
                )}
              </AnimatePresence>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};
