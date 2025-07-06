chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ enabled: false }, () => {
      console.debug("🔄 AsuraScan Add remover Extension installed: Default state is DISABLED.");
  });
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes.enabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].id) {
          const tab = tabs[0];
          
          // Check if the tab URL is a valid web page (not chrome:// or other internal pages)
          if (tab.url && (tab.url.startsWith('http://') || tab.url.startsWith('https://'))) {
              // Check if chrome.scripting is available
              if (chrome.scripting && chrome.scripting.executeScript) {
                  chrome.scripting.executeScript({
                      target: { tabId: tab.id },
                      files: ["content.js"]
                  }).catch(error => {
                      console.error("❌ Error executing script:", error);
                  });
              } else {
                  // Fallback for older Chrome versions
                  chrome.tabs.executeScript(tab.id, {
                      file: "content.js"
                  }, (result) => {
                      if (chrome.runtime.lastError) {
                          console.error("❌ Error executing script:", chrome.runtime.lastError);
                      }
                  });
              }
          } else {
              console.debug("⚠️ Cannot execute script on this page:", tab.url);
          }
      } else {
          console.error("❌ No valid active tab found!");
      }
  });
  }
});