"use client"

import { Link, useNavigate } from "react-router-dom"
import type { GetCollectionDataResponse } from "@aptos-labs/ts-sdk"
import { Heart } from "lucide-react"
import { LaunchpadHeader } from "@/components/LaunchpadHeader"
import { Image } from "@/components/ui/image"
import { useGetCollections } from "@/hooks/useGetCollections"
import { IS_PROD, NETWORK } from "@/constants"
import { useCollection } from "@/Contexts/CollectionContext"
import { cn } from "@/lib/utils"

export function MyCollections() {
  const collections: Array<GetCollectionDataResponse> = useGetCollections()
  const navigate = useNavigate()
  const { setCollectionAddress } = useCollection()

  if (IS_PROD) navigate("/", { replace: true })

  const handleCollectionClick = (collectionId: string) => {
    setCollectionAddress(collectionId)
  }

  // Function to chunk the collections array into groups of 4
  const chunkedCollections = collections.reduce((resultArray: any[][], item, index) => {
    const chunkIndex = Math.floor(index / 4)
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [] // Create a new chunk
    }
    resultArray[chunkIndex].push(item)
    return resultArray
  }, [])

  return (
    <div className="min-h-screen bg-black">
      <LaunchpadHeader title="My Hotels" />
      <div className="max-w-screen-xl w-[63rem] mx-auto px-4 py-8">
        {!collections.length ? (
          <p className="text-white text-center">A list of the collections created under the current contract.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {chunkedCollections.map((row, rowIndex) => (
              <div key={rowIndex} className="flex w-[60rem] gap-6">
                {row.map((collection: any) => (
                  <Link
                    key={collection?.collection_id}
                    to="/book"
                    onClick={() => handleCollectionClick(collection?.collection_id)}
                    className="group relative rounded-xl overflow-hidden bg-white transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  >
                    {/* Main Image */}
                    <div className="aspect-square relative">
                      <Image
                        src={collection?.cdn_asset_uris?.cdn_image_uri ?? ""}
                        alt={collection?.collection_name}
                        className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                      {/* Favorite Button */}
                      <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-300 ease-in-out transform hover:scale-110">
                        <Heart className="w-5 h-5 text-gray-600 transition-colors duration-300 ease-in-out group-hover:text-red-500" />
                      </button>
                      {/* Image Carousel Dots */}
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all duration-300 ease-in-out",
                              i === 0 ? "bg-white scale-125" : "bg-white/50 group-hover:bg-white/80",
                            )}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg transition-colors duration-300 ease-in-out group-hover:text-blue-600">
                            {collection?.collection_name}
                          </h3>
                        
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm transition-colors duration-300 ease-in-out group-hover:text-yellow-500">
                            ★
                          </span>
                          <span className="text-sm">
                            {((collection?.total_minted_v2 / collection?.max_supply) * 5).toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-1">
                        <p className="text-gray-600 transition-opacity duration-300 ease-in-out group-hover:opacity-80">
                          {collection?.total_minted_v2} rooms booked out of {collection?.max_supply}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

