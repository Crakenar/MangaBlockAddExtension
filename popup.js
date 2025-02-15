document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("toggle");
  const enabledStatus = document.querySelector(".enabled");
  const disabledStatus = document.querySelector(".disabled");

  // Load the current state when popup opens
  chrome.storage.local.get(["enabled"], (result) => {
      toggleButton.checked = result.enabled || false;

      // Show the appropriate status
      if (result.enabled) {
          enabledStatus.style.display = 'inline';
          disabledStatus.style.display = 'none';
      } else {
          enabledStatus.style.display = 'none';
          disabledStatus.style.display = 'inline';
      }
  });

  toggleButton.addEventListener("change", () => {
      let newState = toggleButton.checked;

      // Save the new state
      chrome.storage.local.set({ enabled: newState }, () => {
          console.log("🟢 Add Remover is now", newState ? "ENABLED" : "DISABLED");

          // Update the status messages
          if (newState) {
              enabledStatus.style.display = 'inline';
              disabledStatus.style.display = 'none';
          } else {
              enabledStatus.style.display = 'none';
              disabledStatus.style.display = 'inline';
          }
      });

      // Refresh the current tab when toggling
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
              chrome.tabs.reload(tabs[0].id); // Reloads the page
          }
      });
  });
});
