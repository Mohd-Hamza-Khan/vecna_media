class Example {
    constructor(options) {
        this.root = options.root;
        this.init();
        setTimeout(this.showImages.bind(this), 1000);
    }

    init() {
        this.scroll = new LocomotiveScroll({
            el: this.root,
            direction: 'horizontal',
            smooth: true,
            lerp: 0.05,
            tablet: {
                smooth: true
            },
            smartphone: {
                smooth: true
            }
        });

        this.images = this.root.querySelectorAll('.neerail-image');

        this.images.forEach((image) => {
            image.addEventListener('click', () => {
                image.classList.add('neerail-clicked');
                this.hideImages();
            });
        });
    }

    showImages() {
        this.images.forEach((image) => {
            image.classList.remove('neerail-clicked');
            image.classList.add('neerail-active');
        });
    }

    hideImages() {
        this.images.forEach((image) => {
            image.classList.remove('neerail-active');
        });

        setTimeout(this.showImages.bind(this), 2000);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const example = new Example({
        root: document.querySelector('.neerail-scroll-animations-example')
    });
});
