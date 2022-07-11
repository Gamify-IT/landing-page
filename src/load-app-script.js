window.microServices = {
  services: {},
  loadService(url) {
    if (Object.keys(window.microServices.services).includes(url)) {
      window.microServices.services[url].style.display = 'block';
      return;
    }
    window.microServices.hideAllServices();

    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    document.getElementById('micro-service-wrapper').appendChild(iframe);
    window.microServices.services[url] = iframe;
    return iframe;
  },
  hideAllServices() {
    Object.keys(window.microServices.services).forEach((service) => window.microServices.hideService(service));
  },
  hideService(url) {
    if (!Object.keys(window.microServices.services).includes(url)) {
      return console.warn(`Attempt to hide service '${url}' that doesn't exist.`);
    }
    window.microServices.service[url].style.display = 'none;';
  },
};
