export function loadIframe(url: string) {
  const iframe = document.createElement('iframe');
  iframe.src = url;
  iframe.style.position = 'fixed';
  iframe.style.top = '0';
  iframe.style.left = '0';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  const iframeWrapper = document.getElementById('iframe-wrapper');
  if (iframeWrapper != null) {
    iframeWrapper.appendChild(iframe);
  } else {
    throw new Error('iframe wrapper not found!');
  }
}