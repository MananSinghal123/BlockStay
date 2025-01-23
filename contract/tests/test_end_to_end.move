#[test_only]
module launchpad_addr::test_end_to_end {
    use std::option;
    use std::signer;
    use std::string;
    use std::vector;

    use aptos_framework::aptos_coin::{Self, AptosCoin};
    use aptos_framework::coin;
    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::object::{Self, Object};

    use aptos_token_objects::collection;
    use aptos_token_objects::token;

    use launchpad_addr::launchpad;

    /// Category for allowlist mint stage
    const ALLOWLIST_MINT_STAGE_CATEGORY: vector<u8> = b"Allowlist mint stage";
    /// Category for public mint stage
    const PUBLIC_MINT_MINT_STAGE_CATEGORY: vector<u8> = b"Public mint stage";

  // Error constants to match the smart contract
    const ENO_LISTING: u64 = 1;
    const ENO_SELLER: u64 = 2;


      // Helper function to setup test environment
// fun setup_test(
//     aptos_framework: &signer,
//     marketplace: &signer,
//     seller: &signer,
//     purchaser: &signer,
// ): (address, address, address) {
//     let marketplace_addr = signer::address_of(marketplace);
//     let seller_addr = signer::address_of(seller);
//     let purchaser_addr = signer::address_of(purchaser);

//     account::create_account_for_test(marketplace_addr);
//     account::create_account_for_test(seller_addr);
//     account::create_account_for_test(purchaser_addr);

//     // Register coins only
//     coin::register<AptosCoin>(seller);
//     coin::register<AptosCoin>(purchaser);
    
//     // Give initial balances
//     aptos_coin::mint(aptos_framework, seller_addr, 10000);
//     aptos_coin::mint(aptos_framework, purchaser_addr, 10000);

//     (marketplace_addr, seller_addr, purchaser_addr)
// }


    // Test that a fixed price listing can be created and purchased.
    // #[test(aptos_framework = @0x1, marketplace = @launchpad_addr, seller = @0x222, purchaser = @0x333)]
    // fun test_fixed_price(
    //     aptos_framework: &signer,
    //     marketplace: &signer,
    //     seller: &signer,
    //     purchaser: &signer,
    // ) {
       
    // }

    //  inline fun fixed_price_listing(
    //     seller: &signer,
    //     price: u64
    // ): (object::Object<token::Token>, object::Object<launchpad::Listing>) {
    //     let token = launchpad::mint_nft(seller, collection_1, 1);
    //     fixed_price_listing_with_token(seller, token, price)
    // }

    inline fun fixed_price_listing_with_token(
        seller: &signer,
        token: object::Object<token::Token>,
        price: u64
    ): (object::Object<token::Token>, object::Object<launchpad::Listing>) {
        
        let listing = launchpad::list_with_fixed_price_internal<aptos_coin::AptosCoin>(
            seller,
            object::convert(token), // Object<Token> -> Object<ObjectCore>
            price,
        );
        (token, listing)
    }

    // Helper function to mint a test token
    // fun mint_test_token(account: &signer): Object<token::Token> {
    //     let constructor_ref = object::create_object(signer::address_of(account));
    //     token::create_from_account(
    //         account, 
    //         string::utf8(b"Test Collection"),
    //         string::utf8(b"Test Token"),
    //         string::utf8(b"Test Token Description"),
    //         option::none(),
    //         string::utf8(b"https://test.uri")
    //     )
    // }



//     // Test that the purchase fails if the purchaser does not have enough coin.
//     #[test(aptos_framework = @0x1, marketplace = @0x111, seller = @0x222, purchaser = @0x333)]
//     #[expected_failure(abort_code = 0x10006, location = aptos_framework::coin)]
//     fun test_not_enough_coin_fixed_price(
//         aptos_framework: &signer,
//         marketplace: &signer,
//         seller: &signer,
//         purchaser: &signer,
//     ) {
//         setup_test(aptos_framework, marketplace, seller, purchaser);
//         let (_token, listing) = fixed_price_listing(seller, 100000); // price: 100000
//         launchpad::purchase<aptos_coin::AptosCoin>(purchaser, object::convert(listing));
//     }




    // Test that the purchase fails if the listing object does not exist.
    #[test(aptos_framework = @0x1, marketplace = @0x111, seller = @0x222, purchaser = @0x333)]
    #[expected_failure(abort_code = 0x60001, location = launchpad)]
    fun test_no_listing(
        aptos_framework: &signer,
        marketplace: &signer,
        seller: &signer,
        purchaser: &signer,
    ) {
        let (_, seller_addr, _) = launchpad::setup(aptos_framework, marketplace, seller, purchaser);

        let dummy_constructor_ref = object::create_object(seller_addr);
        let dummy_object = object::object_from_constructor_ref<object::ObjectCore>(&dummy_constructor_ref);

        launchpad::purchase<aptos_coin::AptosCoin>(purchaser, object::convert(dummy_object));
    }

 

   #[test(aptos_framework = @0x1, sender = @launchpad_addr, user1 = @0x200, user2 = @0x201, marketplace = @launchpad_addr, seller = @0x222, purchaser = @0x333)]
fun test_happy_path(
    aptos_framework: &signer,
    sender: &signer,
    user1: &signer,
    user2: &signer,
    marketplace: &signer,
    seller: &signer,
    purchaser: &signer,
) {
    // 1. First set up the basic test environment
    timestamp::set_time_has_started_for_testing(aptos_framework);
    let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);
    
    // 2. Create and set up accounts
    let user1_addr = signer::address_of(user1);
    let user2_addr = signer::address_of(user2);
    account::create_account_for_test(user1_addr);
    account::create_account_for_test(user2_addr);
    coin::register<AptosCoin>(user1);
    coin::register<AptosCoin>(user2);

    // 3. Set up marketplace
    // let (marketplace_addr, seller_addr, purchaser_addr) = setup_test(aptos_framework, marketplace, seller, purchaser);
    // launchpad:: initialize_marketplace_signer(marketplace);
    launchpad::init_module_for_test(sender);
    
    // 4. Create collection
    launchpad::create_collection(
        sender,
        string::utf8(b"description"),
        string::utf8(b"name"),
        string::utf8(b"https://gateway.irys.xyz/manifest_id/collection.json"),
        10,
        option::some(10),
        option::some(3),
        option::some(vector[user1_addr]),
        option::some(timestamp::now_seconds()),
        option::some(timestamp::now_seconds() + 100),
        option::some(3),
        option::some(5),
        option::some(timestamp::now_seconds() + 200),
        option::some(timestamp::now_seconds() + 300),
        option::some(2),
        option::some(10),
    );

    let registry = launchpad::get_registry();
    let collection_1 = *vector::borrow(&registry, vector::length(&registry) - 1);
    assert!(collection::count(collection_1) == option::some(3), 1);

    // 5. Mint NFT and create listing
    let token = launchpad::mint_nft_internal(user1_addr, collection_1);
    // object::transfer(user1, token, seller_addr);  // Transfer to seller before listing

    let listing = launchpad::list_with_fixed_price_internal<aptos_coin::AptosCoin>(
        user1,
        object::convert(token),
        500,
    );

    // 6. Verify listing
    let (listing_obj, seller_addr2) = launchpad::listing(listing);
    assert!(listing_obj == object::convert(token), 0);
    assert!(seller_addr2 == user1_addr, 0);

    // 7. Purchase NFT
    let mint_fee = launchpad::get_mint_fee(collection_1, string::utf8(ALLOWLIST_MINT_STAGE_CATEGORY), 1);
    aptos_coin::mint(aptos_framework, user2_addr, 1000);
    launchpad::purchase<aptos_coin::AptosCoin>(user2, object::convert(listing));

    // 8. Verify purchase results
    assert!(object::owner(token) == user2_addr, 0);
    // assert!(coin::balance<aptos_coin::AptosCoin>(user1_addr) == 10500, 0);
    // assert!(coin::balance<aptos_coin::AptosCoin>(user2_addr) == 9500, 0);

    // 9. Test mint stages
    let active_or_next_stage = launchpad::get_active_or_next_mint_stage(collection_1);
    assert!(active_or_next_stage == option::some(string::utf8(ALLOWLIST_MINT_STAGE_CATEGORY)), 3);
    
    // Test stage times...
    let (start_time, end_time) = launchpad::get_mint_stage_start_and_end_time(
        collection_1,
        string::utf8(ALLOWLIST_MINT_STAGE_CATEGORY)
    );
    assert!(start_time == 0, 4);
    assert!(end_time == 100, 5);

    // Test stage transitions
    timestamp::update_global_time_for_test_secs(150);
    // ... rest of your time-based tests ...

    coin::destroy_burn_cap(burn_cap);
    coin::destroy_mint_cap(mint_cap);
}


    #[test(aptos_framework = @0x1, sender = @launchpad_addr, user1 = @0x200)]
    #[expected_failure(abort_code = 12, location = launchpad)]
    fun test_mint_disabled(
        aptos_framework: &signer,
        sender: &signer,
        user1: &signer,
    ) {
        let (burn_cap, mint_cap) = aptos_coin::initialize_for_test(aptos_framework);

        let user1_addr = signer::address_of(user1);

        // current timestamp is 0 after initialization
        timestamp::set_time_has_started_for_testing(aptos_framework);
        account::create_account_for_test(user1_addr);
        coin::register<AptosCoin>(user1);

        launchpad::init_module_for_test(sender);

        launchpad::create_collection(
            sender,
            string::utf8(b"description"),
            string::utf8(b"name"),
            string::utf8(b"https://gateway.irys.xyz/manifest_id/collection.json"),
            10,
            option::some(10),
            option::some(3),
            option::some(vector[user1_addr]),
            option::some(timestamp::now_seconds()),
            option::some(timestamp::now_seconds() + 100),
            option::some(3),
            option::some(5),
            option::some(timestamp::now_seconds() + 200),
            option::some(timestamp::now_seconds() + 300),
            option::some(2),
            option::some(10),
        );
        let registry = launchpad::get_registry();
        let collection_1 = *vector::borrow(&registry, vector::length(&registry) - 1);

        assert!(launchpad::is_mint_enabled(collection_1), 1);

        let mint_fee = launchpad::get_mint_fee(collection_1, string::utf8(ALLOWLIST_MINT_STAGE_CATEGORY), 1);
        aptos_coin::mint(aptos_framework, user1_addr, mint_fee);

        launchpad::mint_nft(user1, collection_1, 1);
        // launchpad::list_with_fixed_price(
        //      seller,
        //     object::convert(token), // Object<Token> -> Object<ObjectCore>
        //     price);
        // launchpad::purchase<aptos_coin::AptosCoin>(user2, object::convert(token));


        launchpad::update_mint_enabled(sender, collection_1, false);
        assert!(!launchpad::is_mint_enabled(collection_1), 2);

        launchpad::mint_nft(user1, collection_1, 1);

        coin::destroy_burn_cap(burn_cap);
        coin::destroy_mint_cap(mint_cap);
    }
}
