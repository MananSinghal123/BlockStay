"use client";

import { Network, NetworkToChainId } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Box, Heading } from "@chakra-ui/react";
import { Portfolio } from "@/components/Portfolio";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { OurStorySection } from "./Mint/components/OurStorySection";
import { OurTeamSection } from "./Mint/components/OurTeamSection";
import { FAQSection } from "./Mint/components/FAQSection";
import { HowToMintSection } from "./Mint/components/HowToMintSection";
export default function Page() {
    return (
        <>
        <div className="bg-[#070B1E]">
            
        <LaunchpadHeader title="Hotel Coin Exchange" />
        <OurStorySection/>
        <HowToMintSection/>
        <FAQSection />
        <OurTeamSection/>
        </div>
        </>
    );
}

function PageContent() {
    const { connected, network, account } = useWallet();

    if (!connected) {
        return (
            <Alert>
                <AlertTitle />
                Connect wallet to see your portfolio.
            </Alert>
        );
    }

    if (network?.chainId != NetworkToChainId[Network.TESTNET].toString()) {
        return (
            <Alert>
                <AlertTitle />
                Please Connect to Testnet.
            </Alert>
        );
    }

    return account && <Portfolio address={account.address} />;
}
