export function removeElementsById(targetIds) {
  targetIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.remove();
    }
  });
}

export function removeElementsByClass (targetClasses) {
  targetClasses.forEach(className => {
      const elements = document.querySelectorAll(`div.${className}`);
      if (elements.length > 0) {
          elements.forEach(div => div.remove());
      }
  });
}