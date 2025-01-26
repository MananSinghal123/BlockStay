import React, { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Link, useNavigate } from "react-router-dom";

// Internal components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { CREATOR_ADDRESS, IS_PROD } from "@/constants";
import { WarningAlert } from "@/components/ui/warning-alert";
import { UploadSpinner } from "@/components/UploadSpinner";
import { LabeledInput } from "@/components/ui/labeled-input";
import { ConfirmButton } from "@/components/ui/confirm-button";

// Entry functions (assume this is where the smart contract interaction happens)
import { listWithFixedPrice } from "@/entry-functions/list_with_fixed_price_internal";
import { aptosClient } from "@/utils/aptosClient";
import { useGetListings } from "@/hooks/useGetListings";
import { useGetNftsByOwner } from "@/hooks/useGetNftsByOwner";

export function CreateListing() {
  // Wallet Adapter provider
  const aptosWallet = useWallet();
  const { account, wallet, signAndSubmitTransaction } = useWallet();
  const listing = useGetNftsByOwner(account?.address || "");
  console.log(listing);

  // Redirect to home if in production
  const navigate = useNavigate();
  if (IS_PROD) navigate("/", { replace: true });

  // Listing data state
  const [listingPrice, setListingPrice] = useState<number>();
  const [selectedObject, setSelectedObject] = useState<object>();
  const [isUploading, setIsUploading] = useState(false);

  // On create listing button clicked
  const onCreateListing = async () => {
    try {
      // Validation checks
      if (!account) throw new Error("Please connect your wallet");
      if (!selectedObject) throw new Error("Please select an object to list");
      if (!listingPrice) throw new Error("Please specify a listing price");
      if (account.address !== CREATOR_ADDRESS) throw new Error("Wrong account");
      if (isUploading) throw new Error("Transaction in progress");

      // Set uploading state
      setIsUploading(true);

      // Submit listing transaction
      const response = await signAndSubmitTransaction(
        listWithFixedPrice({
          seller: account,
          object: selectedObject,
          price: listingPrice,
        }),
      );

      // Wait for transaction confirmation
      const committedTransactionResponse = await aptosClient().waitForTransaction({
        transactionHash: response.hash,
      });

      // Navigate on successful transaction
      if (committedTransactionResponse.success) {
        navigate(`/my-listings`, { replace: true });
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full h-full bg-black overflow-hidden">
      <LaunchpadHeader title="Create New Listing" />
      <div className="flex flex-wrap flex-col md:flex-row items-center justify-center px-4 py-2 gap-4 sm:w-[22.1rem] h-[38.5rem] bg-black mx-auto">
        <div className="w-full md:w-2/3 flex flex-col gap-y-4">
          {(!account || account.address !== CREATOR_ADDRESS) && (
            <WarningAlert title={account ? "Wrong account connected" : "No account connected"}>
              Connect with the correct wallet to create a listing
            </WarningAlert>
          )}

          <UploadSpinner on={isUploading} />

          <Card className="bg-black">
            <CardHeader>
              <CardDescription>Select Object to List</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Placeholder for object selection logic */}
              <Input
                type="text"
                placeholder="Select Object"
                onChange={(e) => {
                  // Add object selection logic here
                  // setSelectedObject(...)
                }}
              />
            </CardContent>
          </Card>

          <LabeledInput
            id="listing-price"
            label="Listing Price (APT)"
            tooltip="Price for listing the object"
            disabled={isUploading || !account}
            onChange={(e) => {
              setListingPrice(Number(e.target.value));
            }}
          />

          <ConfirmButton
            title="List Object"
            className="self-start"
            onSubmit={onCreateListing}
            disabled={!account || !selectedObject || !listingPrice || isUploading}
            confirmMessage="Are you sure you want to list this object?"
          />
        </div>
      </div>
    </div>
  );
}
