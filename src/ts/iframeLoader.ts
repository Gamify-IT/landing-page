import router from '@/router';

export function loadIframe(url: string, focus = true) {
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
      const iframeToClose = document.querySelector('#iframe-wrapper>iframe');
      if (iframeToClose != null) {
        iframeToClose.remove();
        router.push({ name: 'Start' });
      }
    } else if (event.data === 'FOCUS ME') {
      const iframe: HTMLIFrameElement | null = document.querySelector('#iframe-wrapper>iframe');
      if (iframe != null) {
        iframe.contentWindow?.focus();
      }
    }
  });

  const iframeWrapper = document.getElementById('iframe-wrapper');
  if (iframeWrapper != null) {
    iframeWrapper.appendChild(iframe);
  } else {
    throw new Error('iframe wrapper not found!');
  }
  if (focus) {
    iframe.contentWindow?.focus();
  }
}
