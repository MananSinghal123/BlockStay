import { Link, useNavigate } from "react-router-dom";
import { GetCollectionDataResponse } from "@aptos-labs/ts-sdk";
// Internal components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Image } from "@/components/ui/image";
// Internal hooks
import { useGetCollections } from "@/hooks/useGetCollections";
// Internal constants
import { IS_PROD, NETWORK } from "@/constants";

import { useCollection } from "@/Contexts/CollectionContext";

export function MyCollections() {
  const collections: Array<GetCollectionDataResponse> = useGetCollections();
  const navigate = useNavigate();
  const { setCollectionAddress } = useCollection();
  if (IS_PROD) navigate("/", { replace: true });
  const handleCollectionClick = (collectionId: string) => {
    setCollectionAddress(collectionId);
  };

  return (
    <>
      <div
        className="w-full h-full bg-black
    "
      >
        <LaunchpadHeader title="My Collections" />
        <Table className="max-w-screen-xl text-white bg-black mx-auto">
          {!collections.length && (
            <TableCaption className="bg-black text-white">
              A list of the collections created under the current contract.
            </TableCaption>
          )}
          <TableHeader>
            <TableRow className="text-white">
              <TableHead className="text-white">Hotel</TableHead>
              <TableHead className="text-white">Hotel Address</TableHead>
              <TableHead className="text-white">Rooms Booked</TableHead>
              <TableHead className="text-white">Rooms Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.length > 0 &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              collections.map((collection: any) => {
                return (
                  <TableRow key={collection?.collection_id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Image
                          src={collection?.cdn_asset_uris?.cdn_image_uri ?? ""}
                          rounded
                          className="w-10 h-10 bg-gray-100 shrink-0"
                        />
                        <span>{collection?.collection_name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`https://explorer.aptoslabs.com/object/${collection?.collection_id}?network=${NETWORK}`}
                        target="_blank"
                        style={{ textDecoration: "underline" }}
                        onClick={() => handleCollectionClick(collection?.collection_id)}
                      >
                        {collection?.collection_id}
                      </Link>
                    </TableCell>
                    <TableCell>{collection?.total_minted_v2}</TableCell>
                    <TableCell>{collection?.max_supply}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
