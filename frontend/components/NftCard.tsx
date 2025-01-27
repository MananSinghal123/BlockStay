import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Props = {
  children?: ReactNode;
  nft: AptogotchiWithTraits | ListedAptogotchiWithTraits;
};

export const NftCard = ({ nft, children }: Props) => {
  const [metadata, setMetadata] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchMetadata = async () => {
      try {
        if (!nft?.data?.uri) {
          throw new Error("No URI provided");
        }

        if (typeof nft.data.uri === "object" && nft.data.uri.image) {
          setMetadata(nft.data.uri);
          return;
        }

        const response = await fetch(nft.data.uri);
        const data = await response?.json();
        setMetadata(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching NFT metadata:", err);
      }
    };

    fetchMetadata();
  }, [nft]);

  if (error) {
    return <></>;
    // return (
    //   <Card className="bg-red-50 p-4">
    //     <Text textColor="red.500">Error loading NFT: {error}</Text>
    //   </Card>
    // );
  }

  if (!metadata) {
    return (
      <Card className="p-4">
        <Text textColor="gray.500">Loading NFT data...</Text>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <CardHeader className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Text className="text-2xl font-bold text-white">Hotel: {metadata?.name}</Text>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6">
          {/* Image Section */}
          <div className="flex justify-center">
            <img
              src={metadata?.image}
              alt={metadata?.name || "Hotel NFT"}
              className="rounded-lg max-h-96 object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <Text className="text-gray-300 mb-2">Description</Text>
              <Text className="text-white">{metadata?.description}</Text>
            </div>

            {/* Attributes Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <Text className="text-gray-300 mb-1">Bed</Text>
                <Text className="text-white text-lg">{metadata?.attributes[0].Bed}</Text>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <Text className="text-gray-300 mb-1">Bathroom</Text>
                <Text className="text-white text-lg">{metadata?.attributes[0].Bathroom}</Text>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <Text className="text-gray-300 mb-1">Floor</Text>
                <Text className="text-white text-lg">{metadata?.attributes[0].Floor}</Text>
              </div>

              <div className="bg-gray-700 p-4 rounded-lg">
                <Text className="text-gray-300 mb-1">Room</Text>
                <Text className="text-white text-lg">{metadata?.attributes[0].Room}</Text>
              </div>
            </div>
          </div>

          {/* Children (Additional Content) */}
          {children && <div className="mt-6 flex justify-center">{children}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default NftCard;
