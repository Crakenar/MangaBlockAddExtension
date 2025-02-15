chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: false }, () => {
      console.log("🔄 AsuraScan Add remover Extension installed: Default state is DISABLED.");
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
          chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              files: ["content.js"]
          });
      } else {
          console.error("❌ No valid active tab found!");
      }
  });
  }
});

