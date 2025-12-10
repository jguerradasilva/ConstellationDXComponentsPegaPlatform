// @ts-nocheck
export {};

if (typeof window !== 'undefined' && !window.nonce) {
  // @ts-ignore: Add nonce to the window object.
  window.nonce = (() => {
    // Generate a nonce
    const nonceElement = document.querySelector('[nonce]');
    const nonce = nonceElement ? nonceElement.nonce || nonceElement.getAttribute('nonce') : null;
    return nonce || undefined;
  })();
}
