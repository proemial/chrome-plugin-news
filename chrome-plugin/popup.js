// Get the checkbox element
const backgroundCheckbox = document.getElementById("openTabInBackground");

// Load saved preference when popup opens
chrome.storage.sync.get(["openInBackground"], (result) => {
	backgroundCheckbox.checked = result.openInBackground ?? true; // Default to true if not set
});
// Save preference whenever checkbox is toggled
backgroundCheckbox.addEventListener("change", () => {
	chrome.storage.sync.set({ openInBackground: backgroundCheckbox.checked });
});

document.getElementById("forwardButton").addEventListener("click", (e) => {
	e.preventDefault();
	// Query for the active tab in current window
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		// Get current tab's URL and encode it for use in new URL
		const currentUrl = tabs[0].url;
		const encodedUrl = encodeURIComponent(currentUrl);

		// Construct new URL with UTM parameters for analytics
		const newUrl = `https://proem.ai/news/${encodedUrl}?utm_medium=plugin&utm_campaign=news&utm_source=chrome`;

		// // Create new tab with constructed URL
		// // active: false means open in background if checkbox is checked
		chrome.tabs.create({
			url: newUrl,
			active: !backgroundCheckbox.checked,
		});
	});
});
