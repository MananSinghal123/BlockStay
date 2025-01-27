"use client";

import { Network, NetworkToChainId } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Box, Heading } from "@chakra-ui/react";
import { Portfolio } from "@/components/Portfolio";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function Page() {
  return (
    <>
      <div className="bg-[#070B1E]">
        <LaunchpadHeader title="Portfolio" />
        <Box className="bg-[#070B1E]">
          <Heading margin={4} textAlign="center"></Heading>
          <PageContent />
        </Box>
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
