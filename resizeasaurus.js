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
        this.appendChild(this.size); 
      }

      this.resizer = new ResizeObserver(entries => {
        this.size.innerHTML = this.clientWidth + "px";
      });
      this.resizer.observe(this);

      this.cacheWidth();
    }

    cacheWidth(counter = 0) {
      requestAnimationFrame(() => {
        if(this.clientWidth) {
          this.lastKnownWidth = this.clientWidth;
        } else if(counter < 20) {
          this.cacheWidth(++counter);
        } else {
          // back it off to every 100ms
          setTimeout(() => {
            this.cacheWidth(++counter);
          }, 100);
        }
      });
    }

    resize() {
      this.size.innerHTML = this.outerWidth;
    }
  }

  customElements.define("resize-asaurus", ResizeASaurus);  
}