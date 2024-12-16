const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
let isPaused = false;
let intervalId;
let startX = 0;
let deltaX = 0;
let isSwiping = false;
let isTransitioning = false;
let swipeThreshold = 50; // Reduced threshold for smoother swipe

function updateSlider() {
    if (isTransitioning) return; // Prevent overlapping animations
    isTransitioning = true;

    slides.forEach((slide, index) => {
        const slideIndex = (index - currentIndex + slides.length) % slides.length;
        slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease';

        if (slideIndex === 0) {
            slide.style.transform = 'translate3d(-300px, 0, -200px) scale(0.9)';
            slide.style.opacity = '0.5';
            slide.classList.remove("ac");
        } else if (slideIndex === 1) {
            slide.style.transform = 'translate3d(0, 0, 0) scale(1)';
            slide.style.opacity = '1';
            slide.classList.add("ac");
        } else if (slideIndex === 2) {
            slide.style.transform = 'translate3d(300px, 0, -200px) scale(0.9)';
            slide.style.opacity = '0.5';
            slide.classList.remove("ac");
        }
    });

    // Update dot indicators
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');

    // Allow further interactions after the transition
    setTimeout(() => {
        isTransitioning = false;
    }, 300); // Match transition duration
}

function moveSlider() {
    if (!isPaused && !isTransitioning) {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }
}

function startSlider() {
    intervalId = setInterval(moveSlider, 4000); // Auto-slide every 4 seconds
}

function pauseSlider() {
    isPaused = true;
    clearInterval(intervalId);
    setTimeout(() => {
        isPaused = false;
        startSlider();
    }, 10000); // Resume after 10 seconds
}

// Swipe functionality
function handleTouchStart(event) {
    if (isTransitioning) return; // Block interaction during transitions
    startX = event.touches[0].clientX;
    deltaX = 0;
    isSwiping = true;
    slides.forEach(slide => slide.style.transition = 'none'); // Disable transitions for smoother swipe
}

function handleTouchMove(event) {
    if (!isSwiping) return;

    deltaX = event.touches[0].clientX - startX;

    slides.forEach((slide, index) => {
        const offset = (index - currentIndex) * 300 + deltaX * 0.7; // Reduce swipe movement speed
        slide.style.transform = `translate3d(${offset}px, 0, ${Math.abs(offset) < 1 ? 0 : -200}px) scale(${Math.abs(deltaX) < 1 ? 1 : 0.9})`;
    });
}

function handleTouchEnd() {
    if (!isSwiping) return;
    isSwiping = false;

    // Detect swipe direction based on threshold
    if (deltaX < -swipeThreshold) {
        currentIndex = (currentIndex + 1) % slides.length; // Swipe left
    } else if (deltaX > swipeThreshold) {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length; // Swipe right
    }

    updateSlider();

    // Reapply smooth transitions after swipe
    slides.forEach(slide => slide.style.transition = 'transform 0.3s ease, opacity 0.3s ease');
}

slides.forEach(slide => {
    slide.addEventListener('click', pauseSlider);
    slide.addEventListener('touchstart', handleTouchStart);
    slide.addEventListener('touchmove', handleTouchMove);
    slide.addEventListener('touchend', handleTouchEnd);
});

startSlider();
updateSlider();

// WhatsApp Plan Selection Functions
function imgclick() {
    let selectedItem = "I choose Mech Basic plan which contains Engine oil change, Oil Filter Replacement, Tire Pressure Check, Air filter check, electrical checkup, bush cleaning, washing.";
    var message = encodeURIComponent("Hi, I am interested in " + selectedItem + ". Can you give more details?");
    var whatsappURL = "https://api.whatsapp.com/send?phone=9270199836&text=" + message;
    window.open(whatsappURL, '_blank');
}

function imgclick1() {
    let selectedItem = "I choose Mech Lite plan which contains Engine oil change, Oil Filter Replacement, Tire Pressure Check, Air filter check, electrical checkup.";
    var message = encodeURIComponent("Hi, I am interested in " + selectedItem + ". Can you give more details?");
    var whatsappURL = "https://api.whatsapp.com/send?phone=9270199836&text=" + message;
    window.open(whatsappURL, '_blank');
}

function imgclick2() {
    let selectedItem = "I choose Mech Pro plan which contains Engine oil change, Oil Filter Replacement, Tire Pressure Check, Air filter check, electrical checkup, and detailed cleaning.";
    var message = encodeURIComponent("Hi, I am interested in " + selectedItem + ". Can you give more details?");
    var whatsappURL = "https://api.whatsapp.com/send?phone=9270199836&text=" + message;
    window.open(whatsappURL, '_blank');
}

// Referral Link on Hamburger Menu Click
let ham = document.querySelector(".ham");
ham.addEventListener("click", () => {
    const referralLink = "https://www.mechhelp.in/"; // Link to the website
    window.open(referralLink);
});
