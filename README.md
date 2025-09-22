# X.com EVM Address Scraper

An automated browser console script that extracts Ethereum (EVM) addresses from X.com (formerly Twitter) by scrolling through the entire page content.

## 🚀 Features

- **Automated Scrolling**: Programmatically scrolls through the entire X.com page
- **Smart Content Loading**: Waits for content to load between scrolls
- **Duplicate Prevention**: Uses Set to ensure only unique addresses are collected
- **Progress Tracking**: Real-time console output showing extraction progress
- **Safety Limits**: Built-in safeguards to prevent infinite loops
- **Configurable Settings**: Adjustable scroll delay, increment, and safety limits

## 📋 How to Use

### Prerequisites
- A web browser (Chrome, Firefox, Safari, Edge)
- Access to X.com (Twitter)

### Steps

1. **Navigate to X.com**
   - Go to the profile or page you want to scrape
   - Scroll to the bottom to start from the most recent posts

2. **Open Browser Console**
   - Press `F12` or right-click → "Inspect"
   - Go to the "Console" tab

3. **Run the Script**
   - Copy the entire contents of `evm-address-scraper.js`
   - Paste it into the console
   - Press `Enter` to start

4. **Monitor Progress**
   - Watch the console for real-time progress updates
   - The script will show scroll progress and found addresses

5. **Access Results**
   - All unique addresses are saved to `window.extractedAddresses`
   - Final results are displayed in the console
   - Comma-separated list is provided for easy copying

## ⚙️ Configuration

You can modify these settings at the top of the script:

```javascript
const SCROLL_DELAY = 2000;        // Wait time between scrolls (ms)
const SCROLL_INCREMENT = 500;     // Pixels to scroll each time
const MAX_SCROLLS = 100;          // Safety limit to prevent infinite loops
```

### Recommended Settings

- **Slow Connection**: Increase `SCROLL_DELAY` to 3000-5000ms
- **Fast Scrolling**: Decrease `SCROLL_DELAY` to 1000ms
- **Large Screens**: Increase `SCROLL_INCREMENT` to 800-1000px
- **Small Screens**: Decrease `SCROLL_INCREMENT` to 300px

## 📊 Example Output

```
🚀 Starting automated Ethereum address extraction...
📋 Configuration: 2000ms delay, 500px increments
📍 Starting from current position...
📄 Batch 1: Found 3 new addresses
⬆️ Scroll 1: Position 4500px, Total addresses: 3
📄 Batch 2: Found 2 new addresses
⬆️ Scroll 2: Position 4000px, Total addresses: 5
...
🏁 Reached the top of the page

🎉 === EXTRACTION COMPLETE ===
📊 Total scrolls: 15
🔍 Total unique Ethereum addresses found: 12

📝 All addresses:
1. 0x1234567890123456789012345678901234567890
2. 0xabcdefabcdefabcdefabcdefabcdefabcdefabcd
...
```

## 🔧 How It Works

1. **Initial Scan**: Extracts addresses from currently visible content
2. **Scroll Loop**: Scrolls up in increments, waiting for content to load
3. **Content Extraction**: Finds all `<article>` elements and searches for Ethereum addresses
4. **Address Detection**: Uses regex pattern `/0x[a-fA-F0-9]{40}/g` to find valid addresses
5. **Deduplication**: Stores addresses in a Set to prevent duplicates
6. **Termination**: Stops when reaching the top of the page or hitting safety limits

## ⚠️ Important Notes

- **Rate Limiting**: The script includes delays to avoid overwhelming the server
- **Content Loading**: X.com dynamically loads content, so the script waits between scrolls
- **Browser Compatibility**: Works in all modern browsers with console support
- **Legal Considerations**: Ensure you have permission to scrape the content you're targeting

## 🛡️ Safety Features

- **Maximum Scroll Limit**: Prevents infinite loops with `MAX_SCROLLS`
- **Position Detection**: Stops when no more scrolling is possible
- **Content Loading Wait**: Ensures content loads before proceeding
- **Error Handling**: Graceful handling of edge cases

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## ⚠️ Disclaimer

This tool is for educational and research purposes. Please respect X.com's Terms of Service and use responsibly. The authors are not responsible for any misuse of this tool.
