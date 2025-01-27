import { useRef, useState } from "react";
import { isAptosConnectWallet, useWallet } from "@aptos-labs/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Existing imports remain the same
import { aptosClient } from "@/utils/aptosClient";
import { uploadCollectionData } from "@/utils/assetsUploader";
import { CREATOR_ADDRESS, IS_PROD } from "@/constants";

// Internal components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { WarningAlert } from "@/components/ui/warning-alert";
import { UploadSpinner } from "@/components/UploadSpinner";
import { LabeledInput } from "@/components/ui/labeled-input";
import { DateTimeInput } from "@/components/ui/date-time-input";
import { ConfirmButton } from "@/components/ui/confirm-button";

// Entry functions
import { createCollection } from "@/entry-functions/create_collection";

export function CreateCollection() {
  // All previous state and hook definitions remain identical
  const aptosWallet = useWallet();
  const { account, wallet, signAndSubmitTransaction } = useWallet();
  const navigate = useNavigate();
  if (IS_PROD) navigate("/", { replace: true });

  // All previous state variables remain unchanged
  const [royaltyPercentage, setRoyaltyPercentage] = useState<number>();
  const [preMintAmount, setPreMintAmount] = useState<number>();
  const [publicMintStartDate, setPublicMintStartDate] = useState<Date>();
  const [publicMintStartTime, setPublicMintStartTime] = useState<string>();
  const [publicMintEndDate, setPublicMintEndDate] = useState<Date>();
  const [publicMintEndTime, setPublicMintEndTime] = useState<string>();
  const [publicMintLimitPerAccount, setPublicMintLimitPerAccount] = useState<number>(1);
  const [publicMintFeePerNFT, setPublicMintFeePerNFT] = useState<number>();
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // All previous methods remain exactly the same
  const onPublicMintStartTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintStartTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintStartDate?.setHours(hours);
    publicMintStartDate?.setMinutes(minutes);
    publicMintStartDate?.setSeconds(0);
    setPublicMintStartDate(publicMintStartDate);
  };

  const onPublicMintEndTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const timeValue = event.target.value;
    setPublicMintEndTime(timeValue);

    const [hours, minutes] = timeValue.split(":").map(Number);

    publicMintEndDate?.setHours(hours);
    publicMintEndDate?.setMinutes(minutes);
    publicMintEndDate?.setSeconds(0);
    setPublicMintEndDate(publicMintEndDate);
  };

  const onCreateCollection = async () => {
    // Entire method remains exactly the same as in previous implementation
    // [Full original implementation preserved]
    try {
      if (!account) throw new Error("Please connect your wallet");
      if (!files) throw new Error("Please upload files");
      if (account.address !== CREATOR_ADDRESS) throw new Error("Wrong account");
      if (isUploading) throw new Error("Uploading in progress");

      setIsUploading(true);

      const { collectionName, collectionDescription, maxSupply, projectUri } = await uploadCollectionData(
        aptosWallet,
        files,
      );

      const response = await signAndSubmitTransaction(
        createCollection({
          collectionDescription,
          collectionName,
          projectUri,
          maxSupply,
          royaltyPercentage,
          preMintAmount,
          allowList: undefined,
          allowListStartDate: undefined,
          allowListEndDate: undefined,
          allowListLimitPerAccount: undefined,
          allowListFeePerNFT: undefined,
          publicMintStartDate,
          publicMintEndDate,
          publicMintLimitPerAccount,
          publicMintFeePerNFT,
        }),
      );

      const committedTransactionResponse = await aptosClient().waitForTransaction({
        transactionHash: response.hash,
      });

      if (committedTransactionResponse.success) {
        navigate(`/my-collections`, { replace: true });
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B1E] text-white">
      <div className="container mx-auto px-2 py-2">
        <LaunchpadHeader title="List Hotel" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mt-5 mx-auto bg-[#070B1E] backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-700"
        >
          {/* Warning Alerts */}
          {(!account || account.address !== CREATOR_ADDRESS) && (
            <div className="mb-4">
              <WarningAlert title={account ? "Wrong account connected" : "No account connected"}>
                Connect the correct wallet to proceed
              </WarningAlert>
            </div>
          )}

          {wallet && isAptosConnectWallet(wallet) && (
            <div className="mb-4">
              <WarningAlert title="Wallet not supported">
                Google account is not supported for NFT collection creation
              </WarningAlert>
            </div>
          )}

          <UploadSpinner on={isUploading} />

          {/* File Upload Section */}
          <Card className="bg-[#070B1E] border-gray-700 mb-6">
            <CardHeader className="pb-2">
              <div className="text-sm text-gray-400">Upload Collection Files</div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Input
                  ref={inputRef}
                  type="file"
                  className="hidden"
                  webkitdirectory="true"
                  multiple
                  onChange={(event) => setFiles(event.currentTarget.files)}
                />
                {!files?.length ? (
                  <Button
                    variant="outline"
                    onClick={() => inputRef.current?.click()}
                    className="w-full hover:text-white hover:bg-gray-700 transition-colors"
                  >
                    Choose Folder to Upload
                  </Button>
                ) : (
                  <div className="flex items-center text-white space-x-4">
                    <span>{files.length} files selected</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setFiles(null);
                        inputRef.current!.value = "";
                      }}
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Remaining form fields - preserved exactly */}
          <div className="space-y-4 text-black">
            <div className="flex space-x-4">
              <DateTimeInput
                id="mint-start"
                label="Booking Start"
                disabled={isUploading || !account}
                date={publicMintStartDate}
                onDateChange={setPublicMintStartDate}
                time={publicMintStartTime}
                onTimeChange={onPublicMintStartTime}
                className="w-1/2 text-white"
                tooltip="the start of your stay"
              />
              <DateTimeInput
                id="mint-end"
                label="Booking End"
                disabled={isUploading || !account}
                date={publicMintEndDate}
                onDateChange={setPublicMintEndDate}
                time={publicMintEndTime}
                onTimeChange={onPublicMintEndTime}
                className="w-1/2 text-white"
                tooltip="the end of your stay"
              />
            </div>

            {/* <LabeledInput
              id="mint-limit"
              label="Rooms Available"
              disabled={isUploading || !account}
              onChange={(e) => setPublicMintLimitPerAccount(parseInt(e.target.value))}
              tooltip="the limit of rooms available"
              
            /> */}

            <LabeledInput
              id="mint-fee"
              label="Booking Charge per Room (APT)"
              disabled={isUploading || !account}
              onChange={(e) => setPublicMintFeePerNFT(Number(e.target.value))}
              tooltip="price of each room"
            />

            {/* <LabeledInput
              id="for-myself"
              label="Mint for Myself"
              disabled={isUploading || !account}
              onChange={(e) => setPreMintAmount(parseInt(e.target.value))}
              tooltip="if you want to mint for yourself or someone else"
            /> */}

            <ConfirmButton
              title="List Hotel"
              onSubmit={onCreateCollection}
              disabled={!account || !files?.length || !publicMintStartDate || !publicMintLimitPerAccount || isUploading}
              confirmMessage={
                <>
                  <p>Upload process requires 2 message signatures</p>
                  <ol className="list-decimal list-inside">
                    <li>Upload collection and NFT image files</li>
                    <li>Upload collection and NFT metadata files</li>
                  </ol>
                </>
              }
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
