import { useGetCollectionData } from "@/hooks/useGetCollectionData";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";
import { IS_DEV } from "@/constants";
import { buttonVariants } from "@/components/ui/button";
import { config } from "@/config";
import image from "../assets/placeholders/welcome-1.png"
export function Header() {
  const { data } = useGetCollectionData();

  // const title = useMemo(() => {
  //   return data?.collection.collection_name ?? config.defaultCollection?.name ?? "NFT Collection Launchpad";
  // }, [data?.collection]);

  return (
    <div className="flex bg-transparent items-center gap-[13vw] px-4 py-2 min-w-full mx-auto w-full flex-wrap ">

      <h1 className="display ">
        <Link className="text-white" to="/">
          Hotel Coin Exchange
        </Link>
      </h1>
    <div className="flex flex-col bg-red-50 items-center gap-0">
      <div className="bg-white text-black rounded-b-full ">
      <div className="flex gap-2 rounded-b-full items-center flex-wrap">
        {IS_DEV && (
          <>
            <Link className={`${buttonVariants({ variant: "link" })} text-black`} to={"/"}>
              Book Page
            </Link>
            <Link className={`${buttonVariants({ variant: "link" })} text-black`} to={"/my-collections"}>
              My Hotels
            </Link>
            <Link className={`${buttonVariants({ variant: "link" })} text-black`} to={"/create-collection"}>
              List Hotel
            </Link>
            <Link className={buttonVariants({ variant: "link", className: "text-black" })} to={"/portfolio"}>
              Listings
            </Link>
          </>
        )}
      </div>
      </div>
      </div>

      <WalletSelector />
    </div>
  );
}
