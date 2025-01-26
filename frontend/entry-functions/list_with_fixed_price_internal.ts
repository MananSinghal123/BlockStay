import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import { AccountAddressInput, ObjectAddress } from "@aptos-labs/ts-sdk";
import { MODULE_ADDRESS } from "@/constants";
import { convertAmountFromHumanReadableToOnChain, APT_DECIMALS } from "@/utils/helpers";

export type ListWithFixedPriceArgs = {
  seller: AccountAddressInput;
  objectAddress: ObjectAddress;
  price: number;
};

export const listWithFixedPrice = (args: ListWithFixedPriceArgs): InputTransactionData => {
  const { seller, objectAddress, price } = args;

  return {
    data: {
      function: `${MODULE_ADDRESS}::launchpad::list_with_fixed_price`,
      typeArguments: ["0x1::aptos_coin::AptosCoin"],
      functionArguments: [seller, objectAddress, convertAmountFromHumanReadableToOnChain(price, APT_DECIMALS)],
    },
  };
};
