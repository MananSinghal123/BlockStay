import { type FC, type FormEvent, useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Copy from "@/assets/icons/copy.svg";
import { truncateAddress } from "@/utils/truncateAddress";
import { clampNumber } from "@/utils/clampNumber";
import { aptosClient } from "@/utils/aptosClient";
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { Image } from "@/components/ui/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mintNFT } from "@/entry-functions/mint_nft";
import { Header } from "@/components/Header";
import { OurStorySection } from "./OurStorySection";
import { HowToMintSection } from "./HowToMintSection";

export const HeroSection: React.FC = () => {
  const { data } = useGetCollectionData();
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  const [nftCount, setNftCount] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { userMintBalance = 0, collection, totalMinted = 0, maxSupply = 1 } = data ?? {};
  const mintUpTo = Math.min(userMintBalance, maxSupply - totalMinted);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const mintNft = async (e: FormEvent) => {
    e.preventDefault();
    if (!account || !data?.isMintActive) return;
    if (!collection?.collection_id) return;

    const response = await signAndSubmitTransaction(
      mintNFT({ collectionId: collection.collection_id, amount: nftCount }),
    );
    await aptosClient().waitForTransaction({ transactionHash: response.hash });
    queryClient.invalidateQueries();
    setNftCount(1);
  };

  return (
    <>
      <Header />
      <section className="min-h-screen relative overflow-hidden bg-[#070B1E]">
        {/* Dynamic background elements */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-blue-900/10 to-transparent"
          // style={{
          //   transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          // }}
        />
        <div
          className="absolute inset-0 opacity-5 scale-110"
          style={{
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h1 className="text-7xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                Transform Your Hotel Booking Experience
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl text-blue-100/90 leading-relaxed max-w-3xl mx-auto"
              >
                Experience the future of hotel bookings with blockchain-powered NFT reservations. Secure, flexible, and
                completely under your control.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-2xl shadow-blue-500/10">
                <CardContent className="p-8">
                  <form onSubmit={mintNft} className="space-y-8">
                    <div className="max-w-sm mx-auto space-y-6">
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Input
                          type="number"
                          disabled={!data?.isMintActive}
                          value={nftCount}
                          onChange={(e) => setNftCount(Number.parseInt(e.currentTarget.value, 10))}
                          className="h-16 bg-white/5 border-white/10 text-white text-lg text-center rounded-xl 
                            transition-all duration-300 hover:bg-white/10 focus:bg-white/10 focus:ring-2 
                            focus:ring-blue-400/50 focus:border-blue-400/50"
                          placeholder="Number of rooms"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          className="w-full h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 
                            hover:to-blue-500 text-white font-semibold text-lg rounded-xl transition-all 
                            duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                          type="submit"
                          disabled={!data?.isMintActive}
                        >
                          Book Now
                        </Button>
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="space-y-4"
                    >
                      <div className="flex justify-between text-sm text-blue-100/80">
                        <span>Booking Progress</span>
                        <span>Available: {mintUpTo} rooms</span>
                      </div>
                      <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(totalMinted / maxSupply) * 100}%` }}
                          transition={{ duration: 1, delay: 1 }}
                          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                        />
                      </div>
                      <div className="text-sm text-blue-100/80 text-center">
                        {clampNumber(totalMinted)} / {clampNumber(maxSupply)} Rooms Booked
                      </div>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {account && collection?.collection_id && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-center gap-3 mt-8 text-sm text-blue-200/80"
              >
                <span>Hotel Contract</span>
                <AddressButton address={collection.collection_id} />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* <OurStorySection /> */}
        <HowToMintSection />
      </section>
    </>
  );
};

const AddressButton: FC<{ address: string }> = ({ address }) => {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    if (copied) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <motion.button
      onClick={onCopy}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 
        text-blue-200 transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.span
            key="copied"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-green-400"
          >
            Copied!
          </motion.span>
        ) : (
          <motion.span
            key="address"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {truncateAddress(address)}
            <Image src={Copy || "/placeholder.svg"} className="w-4 h-4 opacity-60" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
