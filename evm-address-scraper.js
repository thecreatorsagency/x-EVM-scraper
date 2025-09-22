(function() {
    // Configuration
    const SCROLL_DELAY = 500; // Wait 2 seconds between scrolls to let content load
    const SCROLL_INCREMENT = 1000; // Pixels to scroll each time
    const MAX_SCROLLS = 1000; // Safety limit to prevent infinite loops
    
    // Regex pattern for Ethereum addresses (0x followed by 40 hex characters)
    const ethAddressPattern = /0x[a-fA-F0-9]{40}/g;
    
    // Set to store unique addresses
    const foundAddresses = new Set();
    let scrollCount = 0;
    let lastScrollPosition = 0;
    
    console.log('🚀 Starting automated Ethereum address extraction...');
    console.log(`📋 Configuration: ${SCROLL_DELAY}ms delay, ${SCROLL_INCREMENT}px increments`);
    
    // Function to extract addresses from currently visible content
    function extractAddressesFromVisibleContent() {
        const articles = document.querySelectorAll('article');
        const currentBatch = new Set();
        
        articles.forEach((article, index) => {
            const articleText = article.textContent || article.innerText;
            const matches = articleText.match(ethAddressPattern);
            
            if (matches) {
                matches.forEach(address => {
                    const normalizedAddress = address.toLowerCase();
                    currentBatch.add(normalizedAddress);
                    foundAddresses.add(normalizedAddress);
                });
            }
        });
        
        if (currentBatch.size > 0) {
            console.log(`📄 Batch ${scrollCount + 1}: Found ${currentBatch.size} new addresses`);
            console.log('   New addresses:', Array.from(currentBatch));
        }
        
        return currentBatch.size;
    }
    
    // Function to scroll and extract
    async function scrollAndExtract() {
        return new Promise((resolve) => {
            // Extract addresses from current view
            const newAddressesFound = extractAddressesFromVisibleContent();
            
            // Check if we've reached the top (no more scrolling possible)
            if (window.scrollY <= 0 && scrollCount > 0) {
                console.log('🏁 Reached the top of the page');
                resolve(false);
                return;
            }
            
            // Check if we've hit the safety limit
            if (scrollCount >= MAX_SCROLLS) {
                console.log('⚠️ Hit maximum scroll limit for safety');
                resolve(false);
                return;
            }
            
            // Check if we're stuck (same scroll position)
            if (Math.abs(window.scrollY - lastScrollPosition) < 10 && scrollCount > 0) {
                console.log('🏁 No more content to scroll (likely reached the top)');
                resolve(false);
                return;
            }
            
            lastScrollPosition = window.scrollY;
            
            // Scroll up
            window.scrollBy(0, -SCROLL_INCREMENT);
            scrollCount++;
            
            console.log(`⬆️ Scroll ${scrollCount}: Position ${window.scrollY}px, Total addresses: ${foundAddresses.size}`);
            
            // Wait for content to load, then continue
            setTimeout(() => {
                resolve(true);
            }, SCROLL_DELAY);
        });
    }
    
    // Main extraction loop
    async function startExtraction() {
        console.log('📍 Starting from current position...');
        
        // Extract initial batch
        extractAddressesFromVisibleContent();
        
        // Continue scrolling and extracting
        let shouldContinue = true;
        while (shouldContinue) {
            shouldContinue = await scrollAndExtract();
        }
        
        // Final results
        const addressList = Array.from(foundAddresses);
        
        console.log('\n🎉 === EXTRACTION COMPLETE ===');
        console.log(`📊 Total scrolls: ${scrollCount}`);
        console.log(`🔍 Total unique Ethereum addresses found: ${addressList.length}`);
        
        if (addressList.length > 0) {
            console.log('\n📝 All addresses:');
            addressList.forEach((address, index) => {
                console.log(`${index + 1}. ${address}`);
            });
            
            console.log('\n📋 Comma-separated list:');
            console.log(addressList.join(','));
            
            // Save to window variable for easy access
            window.extractedAddresses = addressList;
            console.log('\n💾 Addresses saved to window.extractedAddresses variable');
        } else {
            console.log('❌ No Ethereum addresses found');
        }
        
        return addressList;
    }
    
    // Start the extraction process
    return startExtraction();
})();
