import { Box, Text, HStack } from "@chakra-ui/react";
import { BASE_PATH, bodies, ears, faces } from "@/utils/constants";
import { Link } from "react-router-dom";
import { AptogotchiWithTraits, ListedAptogotchiWithTraits } from "@/utils/types";
import { ReactNode } from "react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  children?: ReactNode;
  nft: AptogotchiWithTraits | ListedAptogotchiWithTraits;
};

export const NftCard = ({ nft, children }: Props) => {
  //   const headUrl = BASE_PATH + "head.png";
  //   const bodyUrl = BASE_PATH + bodies[nft.body];
  //   const earUrl = BASE_PATH + ears[nft.ear];
  //   const faceUrl = BASE_PATH + faces[nft.face];

  //   const aptogotchiImage = (
  //     <Box position={"relative"} height="100px" width="100px">
  //       <Box position={"absolute"} top={"0px"} left={"0px"}>
  //         <img src={headUrl} alt="pet head" height="100" width="100" />
  //       </Box>
  //       <Box position={"absolute"} top={"0px"} left={"0px"}>
  //         <img src={bodyUrl} alt="pet body" height="100" width="100" />
  //       </Box>
  //       <Box position={"absolute"} top={"0px"} left={"0px"}>
  //         <img src={earUrl} alt="pet ears" height="100" width="100" />
  //       </Box>
  //       <Box position={"absolute"} top={"0px"} left={"0px"}>
  //         <img src={faceUrl} alt="pet face" height="100" width="100" />
  //       </Box>
  //     </Box>
  //   );

  return (
    // <Card className="w-[350px]">
    //     <CardHeader>
    //         <CardTitle>Name: {nft.name}</CardTitle>
    //         <CardDescription>---------</CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //         <form>
    //             <div className="grid w-full items-center gap-4">
    //                 <div className="flex flex-col space-y-1.5">
    //                     <Label htmlFor="name">Click to visit</Label>
    //                 </div>
    //             </div>
    //             <Link
    //                 to={`https://explorer.aptoslabs.com/object/${nft.address}?network=testnet`}
    //                 rel="noopener noreferrer"
    //                 target="_blank"
    //             >
    //                 <Text fontSize="xs" color="GrayText">
    //                     View NFT on Explorer
    //                 </Text>
    //             </Link>
    //         </form>
    //     </CardContent>
    //     <CardFooter className="flex justify-between">
    //     </CardFooter>
    // </Card>
    <Card>
      <HStack spacing={2} flexDirection="column" marginY={6} marginX={4} width={240}>
        {/* {aptogotchiImage} */}
        <Box display="flex" gap={2}>
          <Text fontSize="xl">Name: </Text>
          <Text fontSize="xl" fontWeight="bold">
            {nft.name}
          </Text>
        </Box>
        {/* <Link
          to={`https://explorer.aptoslabs.com/object/${nft.address}?network=testnet`}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Text fontSize="xs" color="GrayText">
            View NFT on Explorer
          </Text>
        </Link> */}
        <Box marginTop={6}>{children}</Box>
      </HStack>
    </Card>
  );
};
