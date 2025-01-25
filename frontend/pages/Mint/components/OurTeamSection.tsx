import type { FC } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Image } from "@/components/ui/image"
import { type ConfigTeamMember, config } from "@/config"
import Twitter from "@/assets/icons/twitter.svg"
import Discord from "@/assets/icons/discord.svg"

type OurTeamSectionProps = {}

export const OurTeamSection: React.FC<OurTeamSectionProps> = () => {
  if (!config.ourTeam) return null

  return (
    <section className="relative py-24 px-6 overflow-hidden bg-[#070B1E]">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-blue-900/10 to-transparent opacity-90" />
      <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K8dKEv9rfsFGI2VbjoceMwH2Yy575S.png')] bg-cover bg-center opacity-5" />

      <div className="relative max-w-screen-xl mx-auto w-full">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-white text-center mb-16 tracking-tight"
        >
          {config.ourTeam.title}
        </motion.h2>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex flex-wrap gap-8 justify-center items-stretch"
        >
          {config.ourTeam.members.map((member, i) => (
            <motion.li
              key={`${member.name}-${i}`}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
              }}
              className="w-full max-w-[320px]"
            >
              <TeamCard member={member} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

const TeamCard: FC<{ member: ConfigTeamMember }> = ({ member }) => {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
      <Card className="bg-white/10 backdrop-blur-sm border-blue-300/20 hover:border-blue-300/40 transition-all duration-300 overflow-hidden h-full">
        <CardHeader className="p-0">
          <div className="aspect-square w-full overflow-hidden">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
              <Image src={member.img || "/placeholder.svg"} className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="flex justify-center items-center gap-3 text-white mb-2">
            <span className="text-xl">{member.name}</span>
            <div className="flex gap-2">
              {member.socials?.twitter && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  href={member.socials.twitter}
                  className="hover:opacity-75 transition-opacity"
                  rel="noreferrer"
                >
                  <Image
                    width={18}
                    height={18}
                    src={Twitter || "/placeholder.svg"}
                    className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              )}
              {member.socials?.discord && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  target="_blank"
                  href={member.socials.discord}
                  className="hover:opacity-75 transition-opacity"
                  rel="noreferrer"
                >
                  <Image
                    width={18}
                    height={18}
                    src={Discord || "/placeholder.svg"}
                    className="brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
                  />
                </motion.a>
              )}
            </div>
          </CardTitle>
          <CardDescription className="text-center text-blue-100 text-sm">{member.role}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  )
}

