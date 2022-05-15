window.microServices = {
  services: {},
  loadService(url) {
    if (Object.keys(this.services).includes(url)) {
      this.services[url].style.display = "block";
      return;
    }
    this.hideAllServices();

    var iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.position = "fixed";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    document.getElementById("micro-service-wrapper").appendChild(iframe);
    this.services[url] = iframe;
    return iframe;
  },
  hideAllServices() {
    Object.keys(this.services).forEach((service) => this.hideService(service));
  },
  hideService(url) {
    if (!Object.keys(this.services).includes(url)) {
      return console.warn(
        `Attempt to hide service '${url}' that doesn't exist.`
      );
    }
    this.service[url].style.display = "none;";
  },
};
