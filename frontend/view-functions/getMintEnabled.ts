import { AccountAddress } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";

type GetMintEnabledArguments = {
  collectionAddress : string;
};

export const getMintEnabled = async ({ collectionAddress  }: GetMintEnabledArguments) => {
  const mintEnabled = await aptosClient().view<[boolean]>({
    payload: {
      function: `${AccountAddress.from(MODULE_ADDRESS)}::launchpad::is_mint_enabled`,
      functionArguments: [collectionAddress ],
    },
  });

  return mintEnabled[0];
};
