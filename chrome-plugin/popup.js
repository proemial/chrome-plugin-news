const maxUrlLength = 2048;

document.getElementById("forwardButton").addEventListener("click", () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		const currentUrl = tabs[0].url;
		console.log("currentUrl", currentUrl);
		const encodedUrl = encodeURIComponent(currentUrl);

		const newUrl = `https://proem.ai/news/${encodedUrl}?utm_medium=plugin&utm_campaign=news&utm_source=chrome`;
		chrome.tabs.create({ url: newUrl });
	});
});
