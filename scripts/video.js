// Function to handle scroll animation for video
function handleScrollAnimation() {
    window.addEventListener('scroll', function() {
        var scrollPosition = window.scrollY;
        var videoElement = document.getElementById('myVideo');
        var leftVideo = document.getElementById('leftVideo');
        var rightVideo = document.getElementById('rightVideo');

        // Adjust the scaling of the main video based on scroll position
        var scaleValue = 1 - (scrollPosition / 1000);
        scaleValue = Math.max(scaleValue, 0.3); // Prevent the video from shrinking too small

        // Set the transform for shrinking
        videoElement.style.transform = 'translate(-50%, -50%) scale(' + scaleValue + ')';

        // Adjust side video opacity as the main video shrinks
        var opacityValue = (1 - scaleValue) * 2;
        leftVideo.style.opacity = opacityValue;
        rightVideo.style.opacity = opacityValue;

        // Reveal more of the video on the sides (grid effect)
        var gridSize = Math.floor(10 * (1 - scaleValue));
        videoElement.style.clipPath = `inset(0% ${gridSize}% 0% ${gridSize}%)`;

        // Make the video move upwards only after it shrinks to the minimal size
        if (scaleValue <= 0.3) {
            var verticalMove = (scrollPosition - 500) * 0.1;
            videoElement.style.top = (50 - verticalMove) + '%';
            leftVideo.style.top = (50 - verticalMove) + '%';
            rightVideo.style.top = (50 - verticalMove) + '%';
        } else {
            videoElement.style.top = '50%';
            leftVideo.style.top = '50%';
            rightVideo.style.top = '50%';
        }
    });
}

// Intersection Observer to detect when the video is in the viewport
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the scroll animation once the video is in view
            handleScrollAnimation();

            // Disconnect the observer once the animation starts
            observer.disconnect();
        }
    });
}, {
    threshold: 0.1 // Trigger when at least 10% of the video is visible
});

// Start observing the main video element
observer.observe(document.getElementById('myVideo'));
