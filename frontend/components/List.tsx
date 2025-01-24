import { ABI } from '@/utils/abi'
import { APT, APT_UNIT, aptos } from "@/utils/aptos";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    // Button,
    useDisclosure,
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Box,
} from "@chakra-ui/react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import {
    Card,
} from "@/components/ui/card"
import { log } from 'console';
type Props = {
    nftTokenObjectAddr: string;
};

export const List = ({ nftTokenObjectAddr }: Props) => {
    const { account, signAndSubmitTransaction } = useWallet();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [price, setPrice] = useState<string>();

    const onRefresh = () => {
        window.location.reload();
    };

    const onSubmit = async () => {
        alert("Listed");
        if (!account) {
            throw new Error("Wallet not connected");
        }
        if (!price) {
            throw new Error("Price not set");
        }
        console.log("Listing");
        const response = await signAndSubmitTransaction({
            sender: account.address,
            data: {
                function: `${ABI.address}::marketplace::list_with_fixed_price`,
                typeArguments: [APT],
                functionArguments: [nftTokenObjectAddr, parseInt(price) * APT_UNIT],
            },
        });
        await aptos
            .waitForTransaction({
                transactionHash: response.hash,
            })
            .then(() => {
                console.log("Listed");
                onClose();
                onRefresh();
            });
        console.log("Listed");
    };

    return (
        <>
            {/* <Box>
            <Button width={160} onClick={onOpen}>
                List
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>List on Marketplace</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Price in APT</FormLabel>
                            <NumberInput
                                onChange={(e) => {
                                    setPrice(e);
                                }}
                                min={1}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter gap={4}>
                        <Button onClick={onClose}>Close</Button>
                        <Button colorScheme="teal" onClick={onSubmit}>
                            List
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box> */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline">List</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className='py-5 '>Listing the NFT</AlertDialogTitle>
                        <Label>Price in APT</Label>
                        <Input onChange={(e) => {
                                    setPrice(e.target.value);
                                }}></Input>
                        {/* <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription> */}
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <Button onClick={() => onSubmit()}>
                            Continue
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>


    );
};
