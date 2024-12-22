// Optimized content.js
console.log("No Scroll Extension activated!");

// Function to prevent user-initiated scrolling
const preventScrolling = () => {
  const blockEvents = ["scroll", "wheel", "touchmove", "keydown"];
  blockEvents.forEach((event) => {
    window.addEventListener(
      event,
      (e) => {
        const target = e.target;
        const isTextInput =
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable;

        if (!isTextInput) {
          if (event === "keydown") {
            const blockedKeys = [
              "ArrowUp",
              "ArrowDown",
              "Space",
              "PageUp",
              "PageDown",
              "Home",
              "End",
            ];
            if (blockedKeys.includes(e.code)) {
              e.preventDefault();
              e.stopPropagation(); // Prevent event propagation
            }
          } else if (event === "wheel" && !e.ctrlKey) {
            e.preventDefault();
          } else if (event === "touchmove" && e.touches.length === 1) {
            e.preventDefault();
          } else {
            e.preventDefault();
          }
        }
      },
      { passive: false, capture: true }
    );
  });
};

// Remove up/down buttons on YouTube Shorts
const hideShortsNavigationButtons = () => {
  const styleId = "no-scroll-shorts-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      #navigation-button-down, 
      #navigation-button-up {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Function to prevent programmatic scrolling
const disableProgrammaticScrolling = () => {
  const noop = () => {};
  Object.defineProperty(window, "scrollTo", { value: noop, writable: false });
  Object.defineProperty(window, "scrollBy", { value: noop, writable: false });
};

// Forcefully hide scrollbars using CSS
const hideScrollbars = () => {
  const styleId = "no-scroll-style";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      html, body {
        overflow: hidden !important;
      }
      * {
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      *::-webkit-scrollbar {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
  }
};

// Monitor DOM changes for dynamic content
const monitorDOMChanges = () => {
  const observer = new MutationObserver(() => {
    hideScrollbars();
    hideShortsNavigationButtons();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Disconnect observer after the initial load to reduce overhead
  setTimeout(() => observer.disconnect(), 5000);
};

// Initialize the no-scroll functionality
const initializeNoScroll = () => {
  preventScrolling();
  disableProgrammaticScrolling();
  hideScrollbars();
  hideShortsNavigationButtons();
  monitorDOMChanges();
};

initializeNoScroll();
console.log("No Scroll Extension initialized with optimized performance.");
