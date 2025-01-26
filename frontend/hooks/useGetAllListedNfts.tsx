import {
    getAllListingObjectAddresses,
    getNft,
    getListingObjectAndSeller,
    getListingObjectPrice,
    getUserOwnedNfts,
  } from "@/utils/aptos";
  import { useEffect, useState } from "react";
  import { useGetAllSellers } from "./useGetAllSellers";
  import { NFT } from "@/utils/types";
  // import { ListedAptogotchiWithTraits } from "@/utils/types";
  
  export const useGetAllListedNfts = () => {
    const sellers = useGetAllSellers();
    const [nfts, setNfts] = useState<NFT[]>();
    useEffect(() => {
      if (!sellers) return;
      (async () => {
        const nfts = [];
        for (const seller of sellers) {
          const listingObjectAddresses = await getAllListingObjectAddresses(seller);
          console.log("listingObjectAddresses", listingObjectAddresses);
          for (const listingObjectAddress of listingObjectAddresses) {
            const [nftAddress, sellerAddress] = await getListingObjectAndSeller(listingObjectAddress);
            //   const price = await getListingObjectPrice(listingObjectAddress);
            console.log("nft Address", nftAddress);
            const nft = await getNft(nftAddress);
            console.log("nft", nft);
            //   console.log("Listed NFTs", nft);
            //   nfts.push({});
          }
          // getUserOwnedNfts(ownerAddr).then(async (res) => {
  
          //       const nfts = [];
          //       for (const nft of res) {
          //         // const [_, traits] = await getAptogotchi(aptogotchi.token_data_id);
          //         nfts.push({
          //           name: nft.current_token_data?.current_collection?.collection_name,
          //           address: nft.token_data_id,
          //         });
          //       }
          //       setNfts(nfts);
          //       console.log("nfts", nfts);
          //     }
          // for (const listingObjectAddress of listingObjectAddresses) {
          //   const [nftAddress, sellerAddress] = await getListingObjectAndSeller(listingObjectAddress);
          //   const price = await getListingObjectPrice(listingObjectAddress);
          //   const [name, traits] = await getAptogotchi(nftAddress);
          //   nfts.push({
          //     name,
          //     address: nftAddress,
          //     ...traits,
          //     listing_object_address: listingObjectAddress,
          //     seller_address: sellerAddress,
          //     price,
          //   });
          // }
        }
        setNfts(nfts);
      })();
    }, [sellers]);
    return nfts;
  };