gsap.registerPlugin(ScrollTrigger);

// Select all elements with the class `reveal-type`
const splitTypes = document.querySelectorAll('.reveal-type');

splitTypes.forEach((char, i) => {
    const bg = char.dataset.bgColor;
    const fg = char.dataset.fgColor;

    // Split the text into individual characters using SplitType
    const text = new SplitType(char, { types: 'chars' });

    // Apply animation to the individual characters
    gsap.fromTo(text.chars, 
        {
            color: bg,
        },
        {
            color: fg,
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
                markers: false,
                toggleActions: 'play play reverse reverse'
            }
        }
    );
});

// Initialize Lenis for smooth scrolling
const lenis = new Lenis();

lenis.on('scroll', (e) => {
    console.log(e);
});

// Request animation frame to update the Lenis smooth scrolling
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
