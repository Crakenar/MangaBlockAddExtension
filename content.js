function removeTargetDivs() {
  // Add more class names here
  const targetClasses = [
      "jsx-5e69ac27470f8f66",
      "jsx-5216ba0cbfcf980",
      "jsx-24ab88eb6d30d7ed",
      "relative z-50 overflow-hidden"
  ];

  targetClasses.forEach(className => {
      const elements = document.querySelectorAll(`div.${className}`);
      if (elements.length > 0) {
          elements.forEach(div => div.remove());
          console.log(`✅ Removed div(s) with class '${className}'`);
      }
  });
}

function removeHeader() {
    const closeButton = document.querySelector('button[aria-label="Close promotion"]');
    if (closeButton) {
        closeButton.click();
    }
}

// Check if the extension is enabled
chrome.storage.local.get(["enabled"], (result) => {
  if (result.enabled) {
      console.debug("🚀 Add Remover is ACTIVE on AsuraComic!");
      removeTargetDivs();
      removeHeader();

      // Observe new elements being added
      const observer = new MutationObserver(() => removeTargetDivs());
      observer.observe(document.body, { childList: true, subtree: true });
  } else {
      console.debug("❌ Add Remover is DISABLED.");
  }
});
