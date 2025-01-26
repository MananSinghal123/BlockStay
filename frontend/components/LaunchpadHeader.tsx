import { Link } from "react-router-dom";
import { type FC, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { WalletSelector } from "@/components/WalletSelector";
import { buttonVariants } from "@/components/ui/button";

interface LaunchpadHeaderProps {
  title: string;
}

export const LaunchpadHeader: FC<LaunchpadHeaderProps> = ({ title }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 50], [0.8, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 8]);

  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const navItems = [
    { title: "Book Page", path: "/book" },
    { title: "All Hotels", path: "/my-collections" },
    { title: "List Hotel", path: "/create-collection" },
    { title: "Listings", path: "/portfolio" },
  ];

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className=" top-0 left-0 right-0 z-50"
      style={{
        opacity: headerOpacity,
        backdropFilter: `blur(${headerBlur}px)`,
      }}
    >
      <div className=" inset-0 bg-[#070B1E] opacity-90" />

      <div className="relative flex items-center justify-between py-4 px-8 mx-auto w-full max-w-screen-xl flex-wrap bg-gradient-to-r from-blue-600/10 via-blue-900/10 to-transparent shadow-lg">
        <motion.h2
          className="display"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-white text-2xl font-bold tracking-tight">{title}</span>
        </motion.h2>

        <motion.div
          className="flex flex-wrap gap-4 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg px-6 py-2"
            whileHover={{ y: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="flex gap-4 items-center pr-0 flex-wrap"
              variants={{
                visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
                hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              initial="hidden"
              animate="visible"
            >
              {navItems.map((item) => (
                <motion.div
                  key={item.title}
                  whileHover={{ scale: 1.05 }}
                  variants={{
                    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 24 } },
                    hidden: { y: 20, opacity: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
                  }}
                >
                  <Link
                    className={`${buttonVariants({ variant: "link" })} text-blue-900 hover:text-blue-700 font-medium relative overflow-hidden group`}
                    to={item.path}
                  >
                    {item.title}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-700 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <WalletSelector />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
