import { useGetAllListedNfts } from "@/hooks/useGetAllListedNfts";
import { SimpleGrid } from "@chakra-ui/react";
import { NftCard } from "./NftCard";
import { Buy } from "./Buy";

export const ListedNfts = () => {
  const listedNfts = useGetAllListedNfts();
  // console.log("ListedNfts", listedNfts);
  return listedNfts ? (
    <SimpleGrid spacing={10} columns={3}>
      {listedNfts.map((nft) => {
        return (
          <NftCard key={nft.address} nft={nft}>
            <Buy listing={nft} />
          </NftCard>
        );
      })}
    </SimpleGrid>
  ) : (
    <></>
  );
};
