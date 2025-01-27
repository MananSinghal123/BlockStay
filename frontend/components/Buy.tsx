import { ABI } from "@/utils/abi";
import { APT, aptos } from "@/utils/aptos";
import { Listing } from "@/utils/types";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

type Props = {
  listing: Listing;
};

export const Buy = ({ listing }: Props) => {
  const { account, signAndSubmitTransaction } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  console.log("Listing", listing);
  const onSubmit = async () => {
    if (!account) {
      throw new Error("Wallet not connected");
    }

    setIsLoading(true);
    try {
      const response = await signAndSubmitTransaction({
        sender: account.address,
        data: {
          function: `${import.meta.env.VITE_MODULE_ADDRESS}::launchpad::purchase`,
          typeArguments: [APT],
          functionArguments: [listing.listing_object_address],
        },
      });
      await aptos
        .waitForTransaction({
          transactionHash: response.hash,
        })
        .then(() => {
          alert("Bought");
        });

      console.log("Bought");
    } catch (error) {
      console.error("Transaction failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-gray-800 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-md">
        <span className="text-gray-300">Price:</span>
        <span className="text-white font-bold">{listing.price} APT</span>
      </div>

      <Button
        onClick={onSubmit}
        disabled={isLoading || !account}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition-colors"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Processing...</span>
          </div>
        ) : (
          "Buy Now"
        )}
      </Button>

      <Link
        href={`https://explorer.aptoslabs.com/account/${listing.seller_address}?network=testnet`}
        rel="noopener noreferrer"
        target="_blank"
        className="text-sm text-gray-400 hover:text-gray-300 transition-colors underline-offset-2 hover:underline"
      >
        View seller on explorer
      </Link>

      {!account && <p className="text-sm text-gray-400">Connect your wallet to make a purchase</p>}
    </div>
  );
};

export default Buy;
