"use client"

import { List } from "@/components/List"
import { useGetListedNftsBySeller } from "@/hooks/useGetListedNftsBySeller"
import { useGetNftsByOwner } from "@/hooks/useGetNftsByOwner"
import { useGetAllListedNfts } from "@/hooks/useGetAllListedNfts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { NftCard } from "./NftCard"

type Props = {
  address: string
}

export const Portfolio = ({ address }: Props) => {
  const nftsInWallet = useGetNftsByOwner(address)
  const nftsListed = useGetAllListedNfts()
  console.log("Listed", nftsListed)

  return (
    <div className="container w-[30rem] mx-auto bg-[#070B1E] px-4 py-8">
      <Card className="mb-8">
        <CardContent className="pt-6 text-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">My NFTs</h2>
          {nftsInWallet && nftsInWallet.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftsInWallet.map((nft) => (
                <NftCard key={nft.address} nft={nft}>
                  <List nftTokenObjectAddr={nft.address} />
                </NftCard>
              ))}
            </div>
          ) : (
            <p className="text-center text-white text-muted-foreground">Nothing to display</p>
          )}
        </CardContent>
      </Card>

      <Separator className="my-8" />

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-2xl font-bold text-white text-center mb-6">My Listed NFTs</h2>
          {nftsListed && nftsListed.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nftsListed.map((nft) => (
                <NftCard key={nft.address} nft={nft} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No NFT listed</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

