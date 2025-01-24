import { Link } from "react-router-dom";
import { FC } from "react";

import { WalletSelector } from "@/components/WalletSelector";
import { buttonVariants } from "@/components/ui/button";

interface LaunchpadHeaderProps {
  title: string;
}

export const LaunchpadHeader: FC<LaunchpadHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between py-2 px-4 mx-auto bg-black w-full max-w-screen-xl flex-wrap">
      <h2 className="display text-white">{title}</h2>

      <div className="flex flex-wrap gap-2 items-center ">
        <Link className={buttonVariants({ variant: "link", className: "text-white" })} to={"/"}>
          Book Page
        </Link>
        <Link className={buttonVariants({ variant: "link", className: "text-white" })} to={"/my-collections"}>
          All Hotels
        </Link>
        <Link className={buttonVariants({ variant: "link", className: "text-white" })} to={"/create-collection"}>
          List Hotel
        </Link>
        <Link className={buttonVariants({ variant: "link", className: "text-white" })} to={"/portfolio"}>
          Listings
        </Link>

        <WalletSelector />
      </div>
    </div>
  );
};
