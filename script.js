var cursor = document.querySelector('.cursor'),
    cursorScale = document.querySelectorAll('.cursor-scale'),
    mouseX = 0,
    mouseY = 0

gsap.to({}, 0.016, {
    repeat: -1,

    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY
            }
        })
    }
});

window.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY
});

cursorScale.forEach(link => {
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('grow');
        cursor.classList.remove('grow-small');
    });
    link.addEventListener('mousemove', () => {
        cursor.classList.add('grow');
        if (link.classList.contains('small')) {
            cursor.classList.remove('grow');
            cursor.classList.add('grow-small');
        }
    });
});



gsap.registerPlugin(ScrollTrigger);

// Reference elements
const content = document.querySelector('.content');
const innerDivs = document.querySelectorAll('.inner-div');

// Sticky behavior for the heading
ScrollTrigger.create({
    trigger: content,
    start: "top top", // When the content hits the top of the viewport
    pin: ".sticky-heading", // Pin the heading
    pinSpacing: true,
    end: () => "+=" + content.scrollHeight, // End after the content is fully scrolled
    scrub: true // Smoothly animate the pinning
});

// Animate inner divs on scroll
innerDivs.forEach((div) => {
    gsap.fromTo(div, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0,
        scrollTrigger: {
            trigger: div,
            start: "top 80%", // Start when the div is near the viewport
            toggleActions: "play none none reverse" // Play on enter, reverse on leave
        }
    });
});






let scrollAnimation;
let isScrollingDown = true;

function startScrollAnimation() {
    scrollAnimation = requestAnimationFrame(animate);
}

function animate() {
    const track = document.querySelector('.slide-track');
    const currentTransform = getComputedStyle(track).transform;
    const translateX = currentTransform.match(/matrix.*\((.+)\)/)[1].split(', ')[4];

    if (isScrollingDown) {
        track.style.transform = `translateX(${parseFloat(translateX) - 1}px)`;
    } else {
        track.style.transform = `translateX(${parseFloat(translateX) + 1}px)`;
    }

    requestAnimationFrame(animate);
}

window.addEventListener('scroll', () => {
    isScrollingDown = window.scrollY > (lastScrollY || 0);
    lastScrollY = window.scrollY;
});

startScrollAnimation();

// scripting for button animation

const button = document.querySelector(".button");
const circle = document.querySelector(".circle2");

let buttonRect = button.getBoundingClientRect(); // Get initial button dimensions

// Recalculate button dimensions on window resize
window.addEventListener("resize", () => {
  buttonRect = button.getBoundingClientRect();
});

// Track mouse movement over the button and update the circle position
button.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX - buttonRect.x; // X position relative to the button
  const mouseY = event.clientY - buttonRect.y; // Y position relative to the button

  circle.style.top = `${mouseY}px`;
  circle.style.left = `${mouseX}px`;
});


// Testimonial section - Title
gsap.set(".testimonial-section .title", {
    y: -200,
    opacity: 0
  });
  gsap.to(".testimonial-section .title", {
    duration: 1.6,
    y: 0,
    opacity: 1,
    ease: "power2.inOut",
    yoyo: true,
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top center",
      end: "center",
      markers: false
    }
  });
  
  // Testimonial section - Left Content
  gsap.set(".left-row", {
    opacity: 0,
    xPercent: -100
  });
  gsap.to(".left-row", {
    duration: 1.6,
    opacity: 1,
    xPercent: 0,
    ease: "power2.inOut",
    yoyo: true,
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top center",
      end: "center",
      markers: false
    }
  });
  
  // Testimonial section - Right Content
  gsap.set(".right-row", {
    opacity: 0,
    xPercent: 100
  });
  gsap.to(".right-row", {
    duration: 1.6,
    opacity: 1,
    xPercent: 0,
    ease: "power2.inOut",
    yoyo: true,
    scrollTrigger: {
      trigger: ".testimonial-section",
      start: "top center",
      end: "center",
      markers: false
    }
  });
  
  