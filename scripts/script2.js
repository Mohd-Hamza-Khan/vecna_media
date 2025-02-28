(function () {
    const template = document.createElement("template");
    template.innerHTML = `
    
    <style>
    :host {
    display: inline-block;
    --textColor: initial;
    --shadow: #a2b0ff;
    --secondShadow: var(--shadow);
    --outlineColor: black;
    color: var(--textColor);
  font-size: 10vw;
  font-family: system-ui;
    vertical-align: top;
    }
  
    :host([hide]) {
        opacity: 0;
    }
  
    
    ::slotted(*) {
      display: inline-flex;
      
  
    }
    
    </style>
      
    
    <slot></slot>
    
    `;
  
    class staggerText extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.timing = this.getAttribute("timing");
        this.offset = this.getAttribute("timing-offset");
        //Set Intersection Observer
        this.observerConfig = {
          root: null,
          rootMargin: "-10% 0% -10% 0%",
          threshold: 1
        };
  
        this.observer = new IntersectionObserver(
          this.obCallback.bind(this),
          this.observerConfig
        );
        this.observer.observe(this);
      }
  
      obCallback(entry) {
        if (entry[0].intersectionRatio === 1) {
          console.log("in view");
          this.getAnimationAttribute();
          // this.randomizeHue();
          //this.observer.unobserve(this);
        } else {
          console.log("out of view");
        }
      }
  
      //
      splitTextToSpan() {
        var textContent = this.textContent.trim();
        var wordArray = textContent.split(" ");
        this.textContent = "";
        wordArray.forEach((word) => {
          var div = document.createElement("div");
          div.style.display = "inline-block";
          div.style.position = "relative";
          var letters = word.split("");
          letters.forEach((letter) => {
            div.insertAdjacentHTML(
              "beforeend",
              `<span style="display:inline-block;position:relative;">${letter}</span>`
            );
          });
          this.insertAdjacentElement("beforeend", div);
        });
      }
  
      setStyle() {
        var shadowColor = this.getAttribute("shadowColor");
        var secondShadowColor = this.getAttribute("secondShadowColor");
        var textColor = this.getAttribute("textColor");
        var outlineColor = this.getAttribute("outlineColor");
        var hostStyle = this.style;
        hostStyle.setProperty("--shadow", shadowColor);
        hostStyle.setProperty("--secondShadow", secondShadowColor);
        hostStyle.setProperty("--textColor", textColor);
        hostStyle.setProperty("--outlineColor", outlineColor);
      }
  
      hideParentElement() {
        this.style.opacity = 0;
      }
  
      showParentElement() {
        this.style.opacity = 1;
      }
      slideDown() {
        var spans = this.querySelectorAll("span");
        this.style.overflow = "hidden";
        this.showParentElement();
        spans.forEach((span, index) => {
          span.style.overflow = "hidden";
          span.animate(
            {
              transform: ["translateY(-100%)", "translateY(0%)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "both",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      slideUp() {
        var spans = this.querySelectorAll("span");
        this.style.overflow = "hidden";
        this.showParentElement();
        spans.forEach((span, index) => {
          //span.style.transform = "translateY(100%)";
          span.animate(
            {
              transform: ["translateY(100%)", "translateY(0%)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "both",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      fadeIn() {
        var spans = this.querySelectorAll("span");
        console.log(spans);
        this.showParentElement();
        spans.forEach((span, index) => {
          span.style.opacity = "0";
          span.animate(
            {
              opacity: ["0", "1"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      scaleIn() {
        var spans = this.querySelectorAll("span");
        console.log(spans);
        spans.forEach((span, index) => {
          span.style.transform = "scale(0)";
          span.animate(
            {
              transform: ["scale(0)", "scale(1)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      rotateLeft() {
        var spans = this.querySelectorAll("span");
        this.showParentElement();
        spans.forEach((span, index) => {
          span.style.transform = "rotateY(-90deg)";
          span.style.transformOrigin = "left center";
          span.animate(
            {
              transform: ["rotateY(-90deg)", "rotateY(0deg)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      rotateTop() {
        var spans = this.querySelectorAll("span");
        this.showParentElement();
        spans.forEach((span, index) => {
          span.style.transform = "rotateX(90deg)";
          span.style.transformOrigin = "top";
          span.animate(
            {
              transform: ["rotateX(90deg)", "rotateX(0deg)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      rotateBottom() {
        var spans = this.querySelectorAll("span");
        this.showParentElement();
        spans.forEach((span, index) => {
          span.style.transform = "rotateX(90deg)";
          span.style.transformOrigin = "bottom";
          span.animate(
            {
              transform: ["rotateX(90deg)", "rotateX(0deg)"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      initialStroke() {
        var spans = this.querySelectorAll("span");
        spans.forEach((span, index) => {
          span.style.color = "transparent";
          span.style.webkitTextStroke = "1px black";
        });
      }
  
      addTextStroke() {
        var spans = this.querySelectorAll("span");
        console.log(spans);
        spans.forEach((span, index) => {
          span.style.color = "transparent";
          span.style.webkitTextStroke = "1px black";
          span.animate(
            {
              color: ["transparent", "inherit"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "both",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      changeTextShadow() {
        var spans = this.querySelectorAll("span");
        console.log(spans);
        spans.forEach((span, index) => {
          span.animate(
            {
              textShadow: ["0px 0px transparent", "4px 4px hotpink"]
            },
            {
              duration: parseInt(this.timing, 10),
              delay: (index + 1) * parseInt(this.offset, 10),
              fill: "both",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      randomizeHue() {
        var spans = this.querySelectorAll("span");
        spans.forEach((span, index) => {
          span.style.color = "transparent";
          span.animate(
            {
              color: [
                `hsla(${280 + Math.floor(Math.random() * 30) + 1},100%,50%,1)`,
                "black"
              ]
            },
            {
              duration: 200,
              delay: (index + 1) * 60,
              fill: "forwards",
              easing: "ease-in-out"
            }
          );
        });
      }
  
      getAnimationAttribute() {
        switch (this.getAttribute("animation")) {
          case "text-stroke":
            return this.addTextStroke();
          case "slide-up":
            return this.slideUp();
          case "slide-down":
            this.slideDown();
            this.fadeIn();
            break;
          case "fade-in":
            return this.fadeIn();
          case "text-shadow":
            return this.changeTextShadow();
          case "rotate-bottom":
            return this.rotateBottom();
          case "rotate-top":
            return this.rotateTop();
          case "rotate-left":
            return this.rotateLeft();
          case "text-shadow":
            return this.changeTextShadow();
        }
      }
  
      getInitialState() {
        switch (this.getAttribute("animation")) {
          case "text-stroke":
            return this.initialStroke();
          case "slide-up":
          case "slide-down":
          case "fade-in":
          case "rotate-left":
          case "rotate-top":
          case "rotate-bottom":
            return this.hideParentElement();
        }
      }
  
      connectedCallback() {
        this.splitTextToSpan();
        this.setStyle();
        this.getInitialState();
      }
    }
  
    customElements.define("stagger-text", staggerText);
  })();
  