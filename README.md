Hotel Booking NFT Marketplace
A decentralized marketplace built on Aptos blockchain that allows users to tokenize hotel bookings as NFTs. These NFTs represent hotel room reservations and can be traded on the marketplace. The NFTs automatically expire after the checkout time of the booking.
Features

Tokenized Hotel Bookings: Convert hotel reservations into tradeable NFTs
Time-bound NFTs: NFTs automatically expire after the booking checkout time
Secondary Market: Users can list and trade their booking NFTs
Fixed Price Listings: Sellers can list their booking NFTs at a fixed price
Automated Expiry: Smart contract handles the expiration of booking NFTs
On-chain Verification: All booking details are stored and verified on-chain

Usage

For Hotels

Create a collection for your hotel
Configure booking parameters
Set royalty fees for secondary sales


For Guests

Browse available hotel rooms
Purchase room bookings as NFTs
Manage your bookings


For Traders

List booking NFTs for sale
Purchase booking NFTs from others
Trade within the valid booking period

Installation:

Clone the repository:

git clone https://github.com/MananSinghal123/BlockStay.git .

Install dependencies:

npm i


npm run dev

.env file Format

PROJECT_NAME=my-aptos-dapp
VITE_APP_NETWORK=testnet
VITE_APTOS_API_KEY=""
VITE_MODULE_PUBLISHER_ACCOUNT_ADDRESS=""
#This is the module publisher account's private key. Be cautious about who you share it with, and ensure it is not exposed when deploying your dApp.
VITE_MODULE_PUBLISHER_ACCOUNT_PRIVATE_KEY=""
VITE_COLLECTION_CREATOR_ADDRESS=""
#To fill after you create a collection, will be used for the minting page
VITE_COLLECTION_ADDRESS=""
VITE_MODULE_ADDRESS="0x214b532d9d6cbe60a57ab9b4bc0d7217ca6c90028ac808030171e35670c785f"

