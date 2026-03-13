// ========================================
// HEADER SECTION JAVASCRIPT
// ========================================

// Get header elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.menu-overlay');
const closeMenu = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');


// auto text animation 

const containerEl = document.getElementById("slogan");

const careers = [
    "Rahat Ullah  ",
  "A  Developer",
  "A  Freelancer",
  "&   ",
  "UX / UI",
  "Designer   "
];

let careerIndex = 0;
let characterIndex = 0;

updateText();

function updateText() {
  characterIndex++;
  containerEl.innerHTML = `<h4>${careers[careerIndex].slice(0, 1) === "I" ? "an" : ""} ${careers[careerIndex].slice(0, characterIndex)} </h4>`;
  if (characterIndex === careers[careerIndex].length) {
    careerIndex++;
    characterIndex = 0;
  }
  if (careerIndex === careers.length) {
    careerIndex = 0;
  }
  setTimeout(updateText, 250);
}



// ========================================
// 1. HEADER SCROLL EFFECT
// ========================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    // Add scrolled class when scrolled down 50px
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide header on scroll down, show on scroll up (optional)
    if (currentScroll > lastScroll && currentScroll > 200) {
        // Scrolling down - hide header
        header.classList.add('header-hidden');
    } else {
        // Scrolling up - show header
        header.classList.remove('header-hidden');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// 2. MOBILE MENU TOGGLE FUNCTION (FIXED)
// ========================================

let scrollPosition = 0;

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

// ========================================
// 3. MOBILE MENU EVENT LISTENERS
// ========================================

// Hamburger click
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Keyboard accessibility for hamburger
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMobileMenu();
        }
    });
}

// Close button click
if (closeMenu) {
    closeMenu.addEventListener('click', toggleMobileMenu);
}

// Overlay click
if (overlay) {
    overlay.addEventListener('click', toggleMobileMenu);
}

// ========================================
// 4. CLOSE MENU ON LINK CLICK
// ========================================
mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {

        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            toggleMobileMenu();

            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';

            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }, 200);

        }
    });
});
// ========================================
// 5. ACTIVE NAVIGATION LINK HIGHLIGHTING
// ========================================
function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset for header
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll and load event listeners for active link
if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', setActiveLink);
    window.addEventListener('load', setActiveLink);
}

// ========================================
// 6. ESCAPE KEY TO CLOSE MENU
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
    }
});

// ========================================
// 7. RESPONSIVE BEHAVIOR
// ========================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Close mobile menu if window is resized to desktop size
        if (window.innerWidth > 991 && mobileMenu && mobileMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});

// ========================================
// 8. TOUCH DEVICE DETECTION
// ========================================
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
}

// ========================================
// 9. INITIAL ACTIVE LINK CHECK
// ========================================
// Check if there's a hash in URL and activate that link
const currentLocation = window.location.hash;
if (currentLocation) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });
}

// ========================================
// 10. SMOOTH SCROLL FOR DESKTOP NAV LINKS
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});