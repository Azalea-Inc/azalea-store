export function barcodeScanner(node, { onScan }) {
  let buffer = "";
  let timeout;

  const handler = (e) => {
    if (timeout) clearTimeout(timeout);

    if (e.key === "Enter") {
      onScan?.(buffer);
      buffer = "";
    } else {
      buffer += e.key;

      timeout = setTimeout(() => {
        buffer = "";
      }, 100);
    }
  };

  window.addEventListener("keydown", handler);

  return {
    destroy() {
      window.removeEventListener("keydown", handler);
    },
  };
}
