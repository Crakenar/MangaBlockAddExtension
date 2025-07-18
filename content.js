function removeTargetDivs() {
  // Add more class names here
  const targetClasses = [
      "jsx-5e69ac27470f8f66",
      "jsx-5216ba0cbfcf980",
      "jsx-24ab88eb6d30d7ed",
      "relative z-50 overflow-hidden",
      "backdrop-blur-md"
  ];

  targetClasses.forEach(className => {
      const elements = document.querySelectorAll(`div.${className}`);
      if (elements.length > 0) {
          elements.forEach(div => div.remove());
      }
  });
}

function removeHeader() {
    const targetAriaLabel = [
      "Close promotion",
      "Close banner",
    ];
    targetAriaLabel.forEach(labelName => {
        const closeButton = document.querySelector(`button[aria-label="${labelName}"]`);
        if (closeButton) {
            // Remove the parent div
            const parentDiv = closeButton.parentElement;
            if (parentDiv) {
                parentDiv.remove();
            }
        }
    });
}

function removeHeaderAds() {
    const headerAds = document.getElementById('header-ads');
    if (headerAds) {
        const firstDiv = headerAds.querySelector('div:first-child');
        if (firstDiv) {
            firstDiv.remove();
        }
    }
}

function setLocalStorage() {
    const currentTimestamp = Date.now().toString();
    localStorage.setItem("asuraPremiumPromoClosed", currentTimestamp)
    localStorage.setItem("asuraPremiumTrialClosedG", currentTimestamp)
    localStorage.setItem("showPrompt", false)
}

// Check if the extension is enabled
chrome.storage.local.get(["enabled"], (result) => {
  if (result.enabled) {
      console.debug("🚀 Add Remover is ACTIVE on AsuraComic!");
      
      // Run removal functions immediately
      removeTargetDivs();
      removeHeader();
      removeHeaderAds();
      setLocalStorage();

      // Run again after delays to catch late-loading ads
      setTimeout(() => {
          removeTargetDivs();
          removeHeader();
          removeHeaderAds();
          console.log("2s")
      }, 2000);

      // Observe new elements being added
      const observer = new MutationObserver(() => {
          removeTargetDivs();
          removeHeaderAds();
      });
      observer.observe(document.body, { childList: true, subtree: true });

  } else {
      console.debug("❌ Add Remover is DISABLED.");
  }
});