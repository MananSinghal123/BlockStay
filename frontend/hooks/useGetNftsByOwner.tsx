import { getAptogotchi, getUserOwnedAptogotchis, getUserOwnedNfts } from "@/utils/aptos";
import { AptogotchiWithTraits, NFT } from "@/utils/types";
import { useEffect, useState } from "react";

// export const useGetNftsByOwner = (ownerAddr: string) => {
//   const [nfts, setNfts] = useState<AptogotchiWithTraits[]>();
//   useEffect(() => {
//     getUserOwnedAptogotchis(ownerAddr).then(async (res) => {
//       const aptogotchiWithTraits = [];
//       for (const aptogotchi of res) {
//         const [_, traits] = await getAptogotchi(aptogotchi.token_data_id);
//         aptogotchiWithTraits.push({
//           name: aptogotchi.current_token_data?.token_name || "no name",
//           address: aptogotchi.token_data_id,
//           ...traits,
//         });
//       }
//       setNfts(aptogotchiWithTraits);
//     });
//   }, [ownerAddr]);
//   return nfts;
// };

export const useGetNftsByOwner = (ownerAddr: string) => {
  const [nfts, setNfts] = useState<NFT[]>();
  useEffect(() => {
    getUserOwnedNfts(ownerAddr).then(async (res) => {
      const nfts = [];
      for (const nft of res) {
        // const [_, traits] = await getAptogotchi(aptogotchi.token_data_id);
        nfts.push({
          name: nft.current_token_data?.current_collection?.collection_name,
          address: nft.token_data_id,
        });
      }
      setNfts(nfts);
      console.log("nfts", nfts);
    });
  }, [ownerAddr]);
  return nfts;
};