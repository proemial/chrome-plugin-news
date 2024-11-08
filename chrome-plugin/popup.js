const maxUrlLength = 2048;

document.getElementById("forwardButton").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentUrl = tabs[0].url;
		console.log("currentUrl", currentUrl);

		let newUrl = `https://proem.ai/news/${encodedUrl}?utm_medium=plugin&utm_campaign=news&utm_source=chrome`;

		// Maximum length for HTTP URLs
		if (newUrl.length > maxUrlLength) {
			// Strip the least important part first
			newUrl = newUrl.substring(0, maxUrlLength);
		}
		// // chrome.tabs.update(tabs[0].id, { url: newUrl });
		chrome.tabs.create({ url: newUrl });
	});
});
