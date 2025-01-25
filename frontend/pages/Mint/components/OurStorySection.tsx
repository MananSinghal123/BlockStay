import { buttonVariants } from "@/components/ui/button"
import { config } from "@/config"
import { motion } from "framer-motion"

type OurStorySectionProps = {}

export const OurStorySection: React.FC<OurStorySectionProps> = () => {
  if (!config.ourStory) return null

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative py-24 overflow-hidden bg-[#070B1E]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-900/10 opacity-90" />
      <div className="absolute inset-0 bg-cover bg-center opacity-5" />

      <div className="relative px-6 flex flex-col lg:flex-row max-w-screen-xl mx-auto w-full items-center gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full lg:w-3/5 space-y-6"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-blue-300 text-sm font-semibold uppercase tracking-wider"
          >
            Ending the Era of Lost Bookings
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl font-bold text-white tracking-tight"
          >
            {config.ourStory.title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-blue-100 text-lg leading-relaxed"
          >
            Hotel Coin Exchange was born from a simple idea, to create a better travel experience for everyone. We
            believe that travelers should have the freedom to manage their bookings without fear of penalties or
            restrictions. By leveraging the power of NFTs and blockchain, we've built a platform that connects travelers
            directly, fostering a community of shared resources and mutual benefit. We're not just selling hotel rooms;
            we're building a more equitable and dynamic travel ecosystem.
          </motion.p>
          {config.socials?.discord && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <a
                href={config.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className:
                    "mt-6 bg-transparent text-blue-300 border-blue-300 hover:bg-blue-300 hover:text-blue-950 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
                })}
              >
                Join Our Discord
              </a>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full lg:w-2/5"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-white/30 to-blue-400/20 blur-xl" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {["NFT-based Bookings", "Decentralized Exchange", "Community-driven", "Flexible Cancellations"].map(
                  (feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      className="flex items-center text-blue-100"
                    >
                      <svg
                        className="w-5 h-5 mr-2 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </motion.li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

