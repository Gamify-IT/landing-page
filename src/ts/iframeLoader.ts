export function loadIframe(url: string) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  window.addEventListener('message', (event) => {
    // FIXME: validate event origin
    if (event.data === 'CLOSE ME') {
      iframe.remove();
    }
  });

  const iframeWrapper = document.getElementById('iframe-wrapper');
  if (iframeWrapper != null) {
    iframeWrapper.appendChild(iframe);
  } else {
    throw new Error('iframe wrapper not found!');
  }
}
