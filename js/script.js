/* ========================================
   RAHAT ULLAH — PORTFOLIO JAVASCRIPT
   Version: 2.0 (Production-Ready)
   Sections:
     1. Page Loader
     2. Scroll Progress Bar
     3. Header Scroll Effect
     4. Mobile Menu
     5. Active Nav Link Highlighting
     6. Smooth Scroll
     7. Scroll-to-Top Button
     8. Typed Text Animation
     9. EmailJS Contact Form
   ======================================== */

'use strict';

/* ========================================
   0. EMAILJS CONFIGURATION
   Replace the three placeholder values below
   with your actual EmailJS credentials.
   Sign up free at: https://www.emailjs.com/
   ======================================== */
const EMAILJS_PUBLIC_KEY = 'sSbtAskJlw5QeAuYo';   // Public Key
const EMAILJS_SERVICE_ID = 'service_mey4u6n';      // Service ID
const EMAILJS_TEMPLATE_ID = 'template_qbhyykt';     // Template ID

// Initialise EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

/* ========================================
   1. PAGE LOADER
   Hides loader smoothly after all resources
   (images, fonts, scripts) have loaded.
   ======================================== */
const pageLoader = document.getElementById('page-loader');

function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add('loader-hidden');
    // Remove from DOM after transition ends (650 ms)
    setTimeout(() => {
        pageLoader.style.display = 'none';
    }, 660);
}

// Wait until everything is fully loaded
if (document.readyState === 'complete') {
    // Already loaded (e.g. cached page)
    setTimeout(hideLoader, 400);
} else {
    window.addEventListener('load', () => {
        // Minimum display time: 800 ms so the loader is always visible briefly
        setTimeout(hideLoader, 800);
    });
}

/* ========================================
   2. SCROLL PROGRESS BAR
   Updates the width of the top progress bar
   as the user scrolls down the page.
   ======================================== */
const scrollProgressBar = document.getElementById('scrollProgress');

function updateScrollProgress() {
    if (!scrollProgressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgressBar.style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

/* ========================================
   3. HEADER SCROLL EFFECT
   Adds/removes the 'scrolled' class to apply
   the compact header style on scroll.
   ======================================== */
const header = document.querySelector('header');

function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 60);
}

window.addEventListener('scroll', handleHeaderScroll, { passive: true });
// Run once on load in case page is already scrolled (e.g. refresh mid-page)
handleHeaderScroll();

/* ========================================
   4. MOBILE MENU
   Controls the hamburger open/close toggle,
   overlay backdrop, and keyboard accessibility.
   ======================================== */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const overlay = document.querySelector('.menu-overlay');
const closeBtn = document.querySelector('.close-menu');
const mobileLinks = document.querySelectorAll('.mobile-nav-link');

let menuOpen = false;

function openMenu() {
    menuOpen = true;
    hamburger?.classList.add('active');
    mobileMenu?.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeMenu() {
    menuOpen = false;
    hamburger?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    menuOpen ? closeMenu() : openMenu();
}

// Hamburger click
hamburger?.addEventListener('click', toggleMenu);

// Keyboard: Enter / Space on hamburger
hamburger?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
});

// Close button
closeBtn?.addEventListener('click', closeMenu);

// Backdrop overlay click
overlay?.addEventListener('click', closeMenu);

// Escape key closes menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
});

// Close when a mobile link is clicked and scroll to target
mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        closeMenu();

        // Wait for menu slide-out before scrolling
        setTimeout(() => {
            targetSection?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    });
});

// Close menu if window resizes to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 991 && menuOpen) closeMenu();
});

/* ========================================
   5. ACTIVE NAVIGATION LINK HIGHLIGHTING
   Watches which section is in view and
   updates the active nav link accordingly.
   ======================================== */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function setActiveNavLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120; // header offset

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${currentId}`;
        link.classList.toggle('active', isActive);
    });
}

if (sections.length && navLinks.length) {
    window.addEventListener('scroll', setActiveNavLink, { passive: true });
    setActiveNavLink(); // run on load
}

/* ========================================
   6. SMOOTH SCROLL — ALL ANCHOR LINKS
   Overrides default anchor jump with a
   smooth animated scroll.
   ======================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    // Mobile links handled separately to sync with menu close
    if (link.classList.contains('mobile-nav-link')) return;

    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#' || !href) return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Also handle the initial URL hash on load
const hashOnLoad = window.location.hash;
if (hashOnLoad) {
    setTimeout(() => {
        const target = document.querySelector(hashOnLoad);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 900); // wait for loader to hide
}

/* ========================================
   7. SCROLL-TO-TOP BUTTON
   Appears after scrolling 120 px and
   smoothly returns the user to the top.
   ======================================== */
const scrollTopBtn = document.getElementById('scroll-top');

function toggleScrollTopBtn() {
    if (!scrollTopBtn) return;
    scrollTopBtn.classList.toggle('active', window.scrollY > 120);
}

scrollTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', toggleScrollTopBtn, { passive: true });
toggleScrollTopBtn(); // initial check

/* ========================================
   8. TYPED TEXT ANIMATION
   Cycles through roles/titles in the hero
   section with a realistic typing effect.
   ======================================== */
const typedContainer = document.getElementById('slogan');

const roles = [
    'Rahat Ullah',
    'A Front-End',
    'Developer',
    'Freelancer',
    'UI/UX',
    'Designer',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout = null;

const TYPE_SPEED = 90;  // ms per character typed
const DELETE_SPEED = 50;  // ms per character deleted
const PAUSE_AFTER = 1800; // ms to pause before deleting

function typeText() {
    if (!typedContainer) return;

    const currentRole = roles[roleIndex];

    if (!isDeleting) {
        // Typing forward
        charIndex++;
        typedContainer.textContent = currentRole.slice(0, charIndex);

        if (charIndex === currentRole.length) {
            // Finished typing — pause then delete
            isDeleting = true;
            typeTimeout = setTimeout(typeText, PAUSE_AFTER);
            return;
        }
        typeTimeout = setTimeout(typeText, TYPE_SPEED);
    } else {
        // Deleting
        charIndex--;
        typedContainer.textContent = currentRole.slice(0, charIndex);

        if (charIndex === 0) {
            // Finished deleting — move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeTimeout = setTimeout(typeText, 400);
            return;
        }
        typeTimeout = setTimeout(typeText, DELETE_SPEED);
    }
}

// Start the typed animation
typeText();

/* ========================================
   9. EMAILJS CONTACT FORM
   Sends the contact form via EmailJS and
   shows user-friendly success/error feedback.
   ======================================== */
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('contact-submit');
const btnText = document.getElementById('btn-text');
const btnLoading = document.getElementById('btn-loading');
const formMessageBox = document.getElementById('form-message');

/**
 * Show a feedback message below the form.
 * @param {string} message - Text to display.
 * @param {'success'|'error'} type - Visual style.
 * @param {number} [autoDismissMs=6000] - Auto-hide after N ms (0 = never).
 */
function showFormMessage(message, type, autoDismissMs = 6000) {
    if (!formMessageBox) return;

    formMessageBox.textContent = message;
    formMessageBox.className = `form-message ${type}`;

    if (autoDismissMs > 0) {
        setTimeout(() => {
            formMessageBox.className = 'form-message';
            formMessageBox.textContent = '';
        }, autoDismissMs);
    }
}

/** Switch the submit button into loading state */
function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    btnText.style.display = loading ? 'none' : 'inline-flex';
    btnLoading.style.display = loading ? 'inline-flex' : 'none';
}

/* ========================================
   10. PROFESSIONAL CUSTOM CURSOR
   Dot follows mouse exactly; ring follows
   with a smooth lag. Hover & click states
   are applied via body class toggles.
   Does nothing on touch / mobile screens.
   ======================================== */
(function initCustomCursor() {
    // Skip on touch-only devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    if (!dot || !ring) return;

    let mouseX = -100, mouseY = -100;  // off-screen until first move
    let ringX = -100, ringY = -100;

    // Move the dot instantly, ring via CSS transition (left/top)
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot: positioned via transform — frame-synced
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';

        // Ring: CSS transition handles the lag automatically
        ring.style.left = mouseX + 'px';
        ring.style.top = mouseY + 'px';
    }, { passive: true });

    // Hover state — expand ring over interactive elements
    const interactiveSelector =
        'a, button, input, textarea, select, label, [role="button"], .skill-item, .service-card, .project-card, .nav-link, .hamburger';

    document.querySelectorAll(interactiveSelector).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Also handle dynamically — use delegation
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
            document.body.classList.add('cursor-hover');
        } else {
            document.body.classList.remove('cursor-hover');
        }
    }, { passive: true });

    // Click feedback
    document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
    document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));

    // Hide cursor when it leaves the window
    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
    });
}());

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Guard: EmailJS not initialised yet
    if (typeof emailjs === 'undefined') {
        showFormMessage('Email service is not loaded. Please refresh and try again.', 'error');
        return;
    }

    setLoading(true);

    try {
        // Collect form data into an object with multiple naming conventions 
        // to ensure compatibility with various EmailJS template variables.
        const templateParams = {
            from_name: document.getElementById('contact-name').value,
            from_email: document.getElementById('contact-email').value,
            reply_to: document.getElementById('contact-email').value,
            user_name: document.getElementById('contact-name').value,
            user_email: document.getElementById('contact-email').value,
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            subject: document.getElementById('contact-subject').value,
            message: document.getElementById('contact-message').value
        };

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

        showFormMessage(
            '✅ Message sent successfully! I\'ll get back to you as soon as possible.',
            'success'
        );
        contactForm.reset();
    } catch (err) {
        console.error('EmailJS error:', err);
        showFormMessage(
            '❌ Oops! Something went wrong. Please try again or email me directly at rahatullah.dev@gmail.com.',
            'error'
        );
    } finally {
        setLoading(false);
    }
});
/* ========================================
   11. AUTOMATIC TESTIMONIAL CAROUSEL
   Implements an infinite loop, auto-sliding 
   carousel with hover-pause functionality.
   ======================================== */
(function initTestimonialCarousel() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    if (!track || !dotsContainer) return;

    const slides = Array.from(track.children);
    const totalRealSlides = slides.length - 2; // Subtracting the 2 clones
    let currentIndex = 1; // Start at the first real slide (after the first clone)
    let autoPlayTimer = null;
    const INTERVAL_TIME = 5000;

    /** 1. Initialise Dots */
    for (let i = 0; i < totalRealSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(i + 1);
            startAutoPlay();
        });
        dotsContainer.appendChild(dot);
    }
    const dots = Array.from(dotsContainer.children);

    /** 2. Core Navigation Logic */
    function updateDots(activeIdx) {
        // Handle boundary indexing for clones
        let dotIdx = activeIdx - 1;
        if (activeIdx === 0) dotIdx = totalRealSlides - 1;
        if (activeIdx === totalRealSlides + 1) dotIdx = 0;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === dotIdx);
        });
    }

    function goToSlide(index, hasAnimation = true) {
        track.style.transition = hasAnimation ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots(currentIndex);
    }

    /** 3. Handle Endless Wrap-Around */
    track.addEventListener('transitionend', () => {
        if (currentIndex === 0) {
            // Reached left clone -> jump to last real slide
            goToSlide(totalRealSlides, false);
        } else if (currentIndex === totalRealSlides + 1) {
            // Reached right clone -> jump to first real slide
            goToSlide(1, false);
        }
    });

    /** 4. Auto-Play Controls */
    function startAutoPlay() {
        if (autoPlayTimer) return;
        autoPlayTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, INTERVAL_TIME);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    // Initial positioning
    goToSlide(currentIndex, false);
    startAutoPlay();

    // Hover interactions
    track.parentElement.addEventListener('mouseenter', stopAutoPlay);
    track.parentElement.addEventListener('mouseleave', startAutoPlay);

    // Accessibility: handle focus
    track.addEventListener('focusin', stopAutoPlay);
    track.addEventListener('focusout', startAutoPlay);
}());

/* ========================================
   12. PRICING AUTO-FILL FOR CONTACT FORM
   When a user clicks "Get Custom Quote" on a pricing card, 
   pre-fill the contact form's subject field.
   ======================================== */
document.addEventListener('DOMContentLoaded', () => {
    const pricingButtons = document.querySelectorAll('.pricing-btn');
    const subjectField = document.getElementById('contact-subject');

    if (pricingButtons.length > 0 && subjectField) {
        pricingButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const packageName = btn.getAttribute('data-package');
                if (packageName) {
                    subjectField.value = `Inquiry: ${packageName} Investment Package`;
                    
                    // Optional: Highlight the field briefly so user sees the change
                    subjectField.style.borderColor = '#2563eb';
                    setTimeout(() => {
                        subjectField.style.borderColor = '';
                    }, 1500);
                }
            });
        });
    }
});

