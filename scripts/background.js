chrome.runtime.onInstalled.addListener(async () => {
    for (const cs of chrome.runtime.getManifest().content_scripts) {
        for (const tab of await chrome.tabs.query({ url: cs.matches })) {
            console.log(`Injecting ${cs.js.join(', ')} into ${tab.url}`);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: cs.js,
            });
        }
    }
});