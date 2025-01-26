import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Image } from "@/components/ui/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"


interface HotelCardProps {
  collection: any
  onCollectionClick: (collectionId: string) => void
}

export function HotelCard({ collection, onCollectionClick }: HotelCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const availabilityPercentage = ((collection.max_supply - collection.total_minted_v2) / collection.max_supply) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden bg-black/40 border-gray-800 backdrop-blur-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={collection?.cdn_asset_uris?.cdn_image_uri ?? "/placeholder.svg"}
            alt={collection?.collection_name}
            className="object-cover w-full h-full transition-transform duration-300"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-900">
              Featured Hotel
            </Badge>
          </div>

          <motion.button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
          </motion.button>

          {/* Availability indicator */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-white">
                <span>Availability</span>
                <span>{Math.round(availabilityPercentage)}%</span>
              </div>
              <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${availabilityPercentage}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        <CardContent className="p-4">
          <Link to="/book" onClick={() => onCollectionClick(collection?.collection_id)} className="block space-y-3">
            <h3 className="text-xl font-semibold text-white truncate">{collection?.collection_name}</h3>
            <div className="flex items-center gap-2 text-gray-400">
              <span className="text-sm truncate">{collection?.collection_id}</span>
            </div>
          </Link>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-sm text-gray-400">Rooms Booked</span>
              <p className="font-semibold">{collection?.total_minted_v2}</p>
            </div>
            <div className="text-white">
              <span className="text-sm text-gray-400">Available</span>
              <p className="font-semibold">{collection?.max_supply}</p>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
          >
            View Details
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

