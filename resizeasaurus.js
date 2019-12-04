if( "customElements" in window) {
  class ResizeASaurus extends HTMLElement {
    connectedCallback() {
      if(!CSS.supports("resize", "horizontal") || this.getAttribute("disabled") === "") {
        return;
      }

      this.classList.add("resizeasaurus");

      this.size = this.querySelector(".resizeasaurus-size");
      if(!this.size) {
        this.size = document.createElement("div");
        this.size.classList.add("resizeasaurus-size");
        this.size.textContent = "Drag to resize";
        this.appendChild(this.size); 
      }

      if("ResizeObserver" in window) {
        this.resizer = new ResizeObserver(entries => {
          this.size.innerHTML = this.clientWidth + "px";
        });
        this.resizer.observe(this);
      }
    }

    resize() {
      this.size.innerHTML = this.outerWidth;
    }
  }

  customElements.define("resize-asaurus", ResizeASaurus);  
}