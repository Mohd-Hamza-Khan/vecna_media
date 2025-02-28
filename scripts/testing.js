gsap.registerPlugin(ScrollTrigger);
const img = document.getElementById('myImage');
const images = gsap.utils.toArray(img);

const showDemo = () => {
  document.body.style.overflow = 'auto';
  document.scrollingElement.scrollTo(0, 0);

  gsap.utils.toArray('section').forEach((section, index) => {
    const wrapper = section.querySelector('.wrapper-differ');
    if (wrapper) {
      const [x, xEnd] = (index % 2)
        ? ['100%', (wrapper.scrollWidth - section.offsetWidth) * -1] 
        : [wrapper.scrollWidth * -1, 0];
      gsap.fromTo(wrapper, { x }, {
        x: xEnd,
        scrollTrigger: {
          trigger: section,
          scrub: 0.5,
        },
      });
    }
  });
};

imagesLoaded(images).on('always', showDemo);
