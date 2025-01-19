#[test_only]
module marketplace_addr::test_marketplace {
    use std::option;
    use std::string;
    use std::signer;
    use aptos_framework::account;
    use aptos_framework::aptos_coin;
    use aptos_framework::coin;
    use aptos_framework::object;
    use aptos_framework::timestamp;
    use aptos_token_objects::token;
    use aptos_token_objects::collection;
    use marketplace_addr::marketplace;
    use launchpad_addr::launchpad;
    use marketplace_addr::test_utils;

    // Test setup function to create a test collection with marketplace enabled
    fun setup_test_collection(
        creator: &signer,
        name: string::String,
        max_supply: u64,
        marketplace_enabled: bool
    ): object::Object<collection::Collection> {
        timestamp::set_time_has_started_for_testing(@aptos_framework);

        // Create collection with marketplace enabled
        launchpad::create_collection(
            creator,
            string::utf8(b"Test Collection Description"),
            name,
            string::utf8(b"https://test.uri/collection.json"),
            max_supply,
            option::some(5), // 5% royalty
            option::none(), // no pre-mint
            option::some(vector[@0x123]), // allowlist
            option::some(1000), // allowlist start time
            option::some(2000), // allowlist end time
            option::some(2), // allowlist mint limit
            option::some(100), // allowlist mint fee
            option::some(2001), // public start time
            option::some(3000), // public end time
            option::some(5), // public mint limit
            option::some(200), // public mint fee
            marketplace_enabled
        );

        let registry = launchpad::get_registry();
        *vector::borrow(&registry, vector::length(&registry) - 1)
    }

    // Test basic fixed price listing and purchase flow with marketplace enabled collection
    #[test(aptos_framework = @0x1, marketplace = @marketplace_addr, creator = @0x123, seller = @0x456, buyer = @0x789)]
    fun test_marketplace_enabled_listing(
        aptos_framework: &signer,
        marketplace: &signer,
        creator: &signer,
        seller: &signer,
        buyer: &signer,
    ) {
        // Setup accounts
        let (marketplace_addr, seller_addr, buyer_addr) = test_utils::setup(aptos_framework, marketplace, seller, buyer);
        account::create_account_for_test(@0x123);
        
        // Setup collection with marketplace enabled
        let collection = setup_test_collection(
            creator,
            string::utf8(b"Test Collection"),
            100,
            true // marketplace enabled
        );

        // Mint an NFT to seller
        timestamp::fast_forward_seconds(2002); // Move to public mint
        launchpad::mint_nft(seller, collection, 1);

        // Get the NFT from seller's account
        let tokens = token::get_token_ids(seller_addr);
        let token = object::address_to_object<token::Token>(*vector::borrow(&tokens, 0));

        // List NFT
        let listing = marketplace::list_with_fixed_price<aptos_coin::AptosCoin>(
            seller,
            object::convert(token),
            500
        );

        // Verify listing
        let (listed_token, listed_seller) = marketplace::listing(listing);
        assert!(listed_token == object::convert(token), 0);
        assert!(listed_seller == seller_addr, 1);
        assert!(marketplace::price<aptos_coin::AptosCoin>(listing) == option::some(500), 2);

        // Purchase NFT
        marketplace::purchase<aptos_coin::AptosCoin>(buyer, object::convert(listing));

        // Verify transfer and payment
        assert!(token::owner(token) == buyer_addr, 3);
        assert!(coin::balance<aptos_coin::AptosCoin>(seller_addr) == 10500, 4);
        assert!(coin::balance<aptos_coin::AptosCoin>(buyer_addr) == 9500, 5);
    }

    // Test listing fails when marketplace is disabled for collection
    #[test(aptos_framework = @0x1, marketplace = @marketplace_addr, creator = @0x123, seller = @0x456, buyer = @0x789)]
    #[expected_failure(abort_code = 0x50003)] // EMARKETPLACE_LISTING_DISABLED
    fun test_marketplace_disabled_listing(
        aptos_framework: &signer,
        marketplace: &signer,
        creator: &signer,
        seller: &signer,
        buyer: &signer,
    ) {
        // Setup accounts
        test_utils::setup(aptos_framework, marketplace, seller, buyer);
        account::create_account_for_test(@0x123);
        
        // Setup collection with marketplace disabled
        let collection = setup_test_collection(
            creator,
            string::utf8(b"Test Collection 2"),
            100,
            false // marketplace disabled
        );

        // Mint an NFT to seller
        timestamp::fast_forward_seconds(2002); // Move to public mint
        launchpad::mint_nft(seller, collection, 1);

        // Get the NFT from seller's account
        let tokens = token::get_token_ids(signer::address_of(seller));
        let token = object::address_to_object<token::Token>(*vector::borrow(&tokens, 0));

        // Try to list NFT - should fail
        marketplace::list_with_fixed_price<aptos_coin::AptosCoin>(
            seller,
            object::convert(token),
            500
        );
    }

    // Test toggling marketplace enabled/disabled
    #[test(aptos_framework = @0x1, marketplace = @marketplace_addr, creator = @0x123)]
    fun test_toggle_marketplace_listing(
        aptos_framework: &signer,
        marketplace: &signer,
        creator: &signer,
    ) {
        // Setup
        test_utils::setup(aptos_framework, marketplace, creator, creator);
        account::create_account_for_test(@0x123);
        
        // Create collection with marketplace initially enabled
        let collection = setup_test_collection(
            creator,
            string::utf8(b"Test Collection 3"),
            100,
            true
        );

        // Verify initially enabled
        assert!(launchpad::is_marketplace_enabled(collection) == true, 0);

        // Disable marketplace
        launchpad::toggle_marketplace_listing(creator, collection, false);
        assert!(launchpad::is_marketplace_enabled(collection) == false, 1);

        // Re-enable marketplace
        launchpad::toggle_marketplace_listing(creator, collection, true);
        assert!(launchpad::is_marketplace_enabled(collection) == true, 2);
    }

    // Test purchasing with insufficient funds
    #[test(aptos_framework = @0x1, marketplace = @marketplace_addr, creator = @0x123, seller = @0x456, buyer = @0x789)]
    #[expected_failure(abort_code = 0x10006)] // Insufficient funds
    fun test_insufficient_funds_purchase(
        aptos_framework: &signer,
        marketplace: &signer,
        creator: &signer,
        seller: &signer,
        buyer: &signer,
    ) {
        // Setup accounts
        test_utils::setup(aptos_framework, marketplace, seller, buyer);
        account::create_account_for_test(@0x123);
        
        // Setup collection
        let collection = setup_test_collection(
            creator,
            string::utf8(b"Test Collection 4"),
            100,
            true
        );

        // Mint and list NFT at very high price
        timestamp::fast_forward_seconds(2002);
        launchpad::mint_nft(seller, collection, 1);
        let tokens = token::get_token_ids(signer::address_of(seller));
        let token = object::address_to_object<token::Token>(*vector::borrow(&tokens, 0));

        let listing = marketplace::list_with_fixed_price<aptos_coin::AptosCoin>(
            seller,
            object::convert(token),
            1000000 // Price higher than buyer's balance
        );

        // Try to purchase - should fail
        marketplace::purchase<aptos_coin::AptosCoin>(buyer, object::convert(listing));
    }
}