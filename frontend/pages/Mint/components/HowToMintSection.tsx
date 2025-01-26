import { FC, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, CreditCard, CheckCircle, Hotel } from 'lucide-react'

interface HowToMintSectionProps {}

export const HowToMintSection: FC<HowToMintSectionProps> = () => {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const steps = [
    {
      title: "Connect Your Wallet",
      icon: Wallet,
      description: "Link your digital wallet to our platform. We support MetaMask, Coinbase Wallet, and more.",
      tip: "Ensure your wallet has sufficient funds for gas fees and the NFT purchase."
    },
    {
      title: "Select Booking Details",
      icon: CreditCard,
      description: "Choose your desired hotel, dates, and the number of NFT bookings you want to mint.",
      tip: "Each NFT represents a unique booking that can be traded or transferred."
    },
    {
      title: "Confirm Transaction",
      icon: CheckCircle,
      description: "Review the details and confirm the transaction in your wallet. This step mints your NFT booking.",
      tip: "Double-check all details before confirming to ensure accuracy."
    },
    {
      title: "Receive Your NFT Booking",
      icon: Hotel,
      description: "Once confirmed, your NFT booking will be sent to your wallet. It's now yours to use or trade.",
      tip: "You can view your NFT bookings in your wallet or on our dashboard."
    },
  ]

  return (
    <section className="relative py-24 overflow-hidden  bg-gradient-to-b from-blue-600/10 via-blue-900/10 to-transparent ">
      <div className="absolute inset-0 bg-cover bg-center opacity-5
      bg-gradient-to-b from-blue-600/10 via-blue-900/10 to-transparent" />
      
      <div className="relative px-4 max-w-screen-xl mx-auto w-full">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white mb-12 text-center"
        >
          How to Mint Your NFT Booking
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredStep(index)}
              onMouseLeave={() => setHoveredStep(null)}
              className="relative"
            >
              <motion.div
                initial={false}
                animate={{
                  scale: hoveredStep === index ? 1.05 : 1,
                  boxShadow: hoveredStep === index ? "0 10px 30px -10px rgba(59, 130, 246, 0.5)" : "0 0 0 0 rgba(0, 0, 0, 0)",
                }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col items-center justify-center border border-blue-300/20 cursor-pointer transition-all duration-300"
              >
                <div className="text-5xl mb-4 text-blue-300">
                  <step.icon size={48} />
                </div>
                <div className="text-4xl font-bold text-blue-200 mb-4">
                  {index + 1}
                </div>
                <p className="text-lg text-blue-100 font-medium text-center">
                  {step.title}
                </p>
                <AnimatePresence>
                  {hoveredStep === index && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 flex items-center justify-center bg-black rounded-2xl p-4"
                    >
                      <div className="text-white ">
                        <p className="font-semibold mb-2">{step.description}</p>
                        <p className="text-blue-200 text-sm italic">Tip: {step.tip}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
