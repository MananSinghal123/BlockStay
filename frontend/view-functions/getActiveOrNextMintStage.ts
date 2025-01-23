import { AccountAddress } from "@aptos-labs/ts-sdk";
import { aptosClient } from "@/utils/aptosClient";
import { MODULE_ADDRESS } from "@/constants";


type GetRegistryArguments = {
  collectionAddress: string;
};

export const getActiveOrNextMintStage = async ({ collectionAddress }: GetRegistryArguments) => {
  const mintStageRes = await aptosClient().view<[{ vec: [string] | [] }]>({
    payload: {
      function: `${AccountAddress.from(MODULE_ADDRESS)}::launchpad::get_active_or_next_mint_stage`,
      functionArguments: [collectionAddress],
    },
  });
  return mintStageRes[0].vec;
};
