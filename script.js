// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = 60; // Account for fixed navbar height
            const targetPosition = target.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation - DISABLED to fix scroll issues
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        // Remove initial transform to prevent scroll speed differences
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
        // observer.observe(el); // Disabled intersection observer
    });
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Multilingual Greeting System
const greetings = [
    { text: "Hello, I'm Kurea", lang: "en" },
    { text: "こんにちは、クレアです", lang: "ja" },
    { text: "반갑습니다, 쿠레아 입니다", lang: "ko" }
];

let currentGreetingIndex = 0;
let isAnimating = false;

function changeGreeting() {
    if (isAnimating) return;
    
    isAnimating = true;
    const greetingElement = document.getElementById('greeting');
    
    // Fade out
    greetingElement.classList.add('greeting-fade');
    
    setTimeout(() => {
        // Change text
        currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
        greetingElement.textContent = greetings[currentGreetingIndex].text;
        
        // Fade in
        greetingElement.classList.remove('greeting-fade');
        greetingElement.classList.add('greeting-fade-in');
        
        setTimeout(() => {
            greetingElement.classList.remove('greeting-fade-in');
            isAnimating = false;
        }, 400);
    }, 400);
}

// Auto-cycle through greetings every 3 seconds
let greetingInterval;

function startGreetingCycle() {
    greetingInterval = setInterval(changeGreeting, 3000);
}

function stopGreetingCycle() {
    if (greetingInterval) {
        clearInterval(greetingInterval);
    }
}

// Initialize greeting system when page loads
window.addEventListener('load', () => {
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        // Add click event for manual cycling
        greetingElement.addEventListener('click', changeGreeting);
        
        // Start auto-cycling after initial delay
        setTimeout(startGreetingCycle, 2000);
        
        // Pause cycling when user hovers over greeting
        greetingElement.addEventListener('mouseenter', stopGreetingCycle);
        greetingElement.addEventListener('mouseleave', startGreetingCycle);
    }
});

// See More Projects Functionality
document.addEventListener('DOMContentLoaded', function() {
    const seeMoreBtn = document.getElementById('seeMoreBtn');
    const additionalProjects = document.querySelectorAll('.additional-project');
    let isExpanded = false;

    if (seeMoreBtn && additionalProjects.length > 0) {
        seeMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Show additional projects
                additionalProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, index * 100); // Staggered animation
                });
                seeMoreBtn.textContent = 'Show Less';
                isExpanded = true;
            } else {
                // Hide additional projects
                additionalProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.remove('show');
                    }, index * 50); // Faster hide animation
                });
                seeMoreBtn.textContent = 'See More Projects';
                isExpanded = false;
            }
        });
    }
});

// Removed parallax effect to prevent scroll speed differences



// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Contact form handling (if you add a form later)
function handleContactForm(event) {
    event.preventDefault();
    // Add form handling logic here
    console.log('Contact form submitted');
}

// Add click tracking for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const projectName = e.target.closest('.project-card').querySelector('h3').textContent;
        console.log(`Clicked on project: ${projectName}`);
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add focus management for accessibility
document.querySelectorAll('.nav-link, .btn, .project-link').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #0070f3';
        element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);
