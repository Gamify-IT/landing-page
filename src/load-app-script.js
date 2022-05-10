window.microServices = {
  services: [],
  loadService(url) {
    if (!this.services.includes(url)) {
      var iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.style.position = "fixed";
      iframe.style.top = "0";
      iframe.style.left = "0";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      document.getElementById("micro-service-wrapper").appendChild(iframe);
      this.services.push(url);
    }
  },
};
