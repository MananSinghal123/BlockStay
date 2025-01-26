import type { FC } from "react"
import { motion } from "framer-motion"
import { Image } from "@/components/ui/image"
import { config } from "@/config"
import Twitter from "@/assets/icons/twitter.svg"
import Link from "@/assets/icons/link.svg"
import Discord from "@/assets/icons/discord.svg"

export const Socials: FC = () => {
  if (!config.socials) return null

  const socialIcons = [
    { name: "twitter", icon: Twitter, link: config.socials.twitter },
    { name: "discord", icon: Discord, link: config.socials.discord },
    { name: "homepage", icon: Link, link: config.socials.homepage },
  ].filter((social) => social.link)

  return (
    <motion.ul
      className="flex gap-[2rem] mr-[2rem]"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: 0.3,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {socialIcons.map((social) => (
        <motion.li
          key={social.name}
          variants={{
            hidden: { y: 10, opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
        >
          <motion.a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-100 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Image
              src={social.icon || "/placeholder.svg"}
              className="w-6 h-6 filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>
        </motion.li>
      ))}
    </motion.ul>
  )
}

