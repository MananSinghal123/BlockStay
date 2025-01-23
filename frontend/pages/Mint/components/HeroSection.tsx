import { FC, FormEvent, useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useQueryClient } from "@tanstack/react-query";
// Internal assets
import Copy from "@/assets/icons/copy.svg";
// import ExternalLink from "@/assets/icons/external-link.svg";
// import Placeholder1 from "@/assets/placeholders/bear-1.png";
// Internal utils
import { truncateAddress } from "@/utils/truncateAddress";
import { clampNumber } from "@/utils/clampNumber";
import { formatDate } from "@/utils/formatDate";
import { aptosClient } from "@/utils/aptosClient";
// Internal hooks
import { useGetCollectionData } from "@/hooks/useGetCollectionData";
// Internal components
import { Image } from "@/components/ui/image";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { Socials } from "@/pages/Mint/components/Socials";
// Internal constants
// import { NETWORK } from "@/constants";
// Internal config
// import { config } from "@/config";
// Internal enrty functions
import { mintNFT } from "@/entry-functions/mint_nft";
import image from "../../../assets/icons/Gemini_Generated_Image_x2oto6x2oto6x2ot.jpeg";

interface HeroSectionProps {}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { data } = useGetCollectionData();
  const queryClient = useQueryClient();
  const { account, signAndSubmitTransaction } = useWallet();
  const [nftCount, setNftCount] = useState(1);

  const { userMintBalance = 0, collection, totalMinted = 0, maxSupply = 1 } = data ?? {};
  const mintUpTo = Math.min(userMintBalance, maxSupply - totalMinted);

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
    <section className="hero-container bg-black flex flex-col md:flex-row gap-6 px-4 max-w-screen-xl mx-auto w-full">
      <Image
        src={image}
        // collection?.cdn_asset_uris.cdn_image_uri ?? collection?.cdn_asset_uris.cdn_animation_uri ?? Placeholder1
        rounded
        className="w-[20%] md:basis-2/5 aspect-square object-cover self-center mt-[1rem]"
      />

      <div className="basis-3/5 flex flex-col gap-4">
        <h1 className="title-md text-white mt-[2rem]">Welcome to Exchange</h1>
        {/* {collection?.collection_name ?? config.defaultCollection?.name} this was written on top*/}
        {/* <Socials /> */}
        <p className="body-sm text-white">
          Imagine a world where canceling a hotel room doesn't mean losing money. 🤯 With blockchain-powered NFT
          bookings, you can list your reservation on a decentralized exchange and recoup your costs. It's a win-win for
          travelers!
        </p>
        {/* {collection?.description ?? config.defaultCollection?.description} */}
        <Card>
          <CardContent
            fullPadding
            className="flex flex-col md:flex-row gap-4 md:justify-between items-start md:items-center bg-[#a0522d] flex-wrap"
          >
            <form onSubmit={mintNft} className="flex flex-col md:flex-row gap-4 w-full md:basis-1/4">
              <Input
                type="number"
                disabled={!data?.isMintActive}
                value={nftCount}
                onChange={(e) => setNftCount(parseInt(e.currentTarget.value, 10))}
              />
              <Button className="h-16 md:h-auto text-white" type="submit" disabled={!data?.isMintActive}>
                Room
              </Button>
            </form>
            <div className="flex flex-col gap-2 w-full md:basis-1/3">
              <p className="label-sm text-white">You can Book up to</p>
              <p className="body-md">{mintUpTo > 1 ? `${mintUpTo} Rooms` : `${mintUpTo} Rooms`}</p>
            </div>
            <div className="flex flex-col gap-2 w-full md:basis-1/3">
              <p className="label-sm text-secondary-text text-white">
                {clampNumber(totalMinted)} / {clampNumber(maxSupply)} Booked
              </p>
              <Progress value={(totalMinted / maxSupply) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-x-2 items-center flex-wrap justify-between">
          <p className="whitespace-nowrap body-sm-semibold text-white">Hotel Address</p>

          <div className="flex gap-x-2 ">
            <AddressButton address={collection?.collection_id ?? ""} />
            {/* <a
              className={buttonVariants({ variant: "link" })}
              target="_blank"
              href={`https://explorer.aptoslabs.com/account/${collection?.collection_id}?network=${NETWORK}`}
            >
              View on Explorer <Image src={ExternalLink} />
            </a> */}
          </div>
        </div>

        <div>
          {data?.startDate && new Date() < data.startDate && (
            <div className="flex gap-x-2 justify-between flex-wrap">
              <p className="body-sm-semibold">Booking starts</p>
              <p className="body-sm">{formatDate(data.startDate)}</p>
            </div>
          )}

          {data?.endDate && new Date() < data.endDate && !data.isMintInfinite && (
            <div className="flex gap-x-2 justify-between flex-wrap">
              <p className="body-sm-semibold text-white">Booking ends</p>
              <p className="body-sm text-white">{formatDate(data.endDate)}</p>
            </div>
          )}

          {data?.endDate && new Date() > data.endDate && <p className="body-sm-semibold">Booking has ended</p>}
        </div>
      </div>
    </section>
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
    <Button onClick={onCopy} className="whitespace-nowrap flex bg-black gap-1 px-0 py-0" variant="link">
      {copied ? (
        "Copied!"
      ) : (
        <>
          {truncateAddress(address)}
          <Image src={Copy} className="bg-white rounded-sm" />
        </>
      )}
    </Button>
  );
};
