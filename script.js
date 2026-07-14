/* ============================================
   NASAL SECURE™ - INTERACTIVE JAVASCRIPT
   ============================================ */

// Smooth scroll to section
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// WhatsApp Order Function
function orderViaWhatsApp() {
    const message = encodeURIComponent(
        "Hi! I'm interested in ordering Nasal Secure™ at the launch price of ₹249. Please provide more details."
    );
    const whatsappUrl = `https://wa.me/919876543210?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards for animation
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.problem-card, .step-card, .feature-card, .use-case-card'
    );
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `slideUp 0.6s ease forwards`;
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Smooth active nav link
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
        }
    });

    // Counter animation for pricing
    animatePriceCounter();

    // Add fade-in animation on scroll
    const fadeElements = document.querySelectorAll('.problem-card, .feature-card, .use-case-card');
    fadeElements.forEach(el => {
        observer.observe(el);
    });
});

// Animate price counter
function animatePriceCounter() {
    const priceElement = document.querySelector('.price-main');
    if (!priceElement) return;

    const targetPrice = 249;
    const duration = 1000; // 1 second
    const startTime = Date.now();

    function updatePrice() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentPrice = Math.floor(targetPrice * easeProgress);

        priceElement.textContent = `₹${currentPrice}`;

        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        } else {
            priceElement.textContent = `₹${targetPrice}`;
        }
    }

    // Start animation when element is visible
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updatePrice();
                priceObserver.unobserve(entry.target);
            }
        });
    });

    priceObserver.observe(priceElement);
}

// Add hover effects for cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll(
        '.problem-card, .step-card, .feature-card, .use-case-card, .pricing-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add ripple effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Add ripple styles dynamically
        if (!document.querySelector('style[data-ripple]')) {
            const style = document.createElement('style');
            style.setAttribute('data-ripple', 'true');
            style.innerHTML = `
                .cta-button {
                    position: relative;
                    overflow: hidden;
                }
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s ease-out;
                    pointer-events: none;
                }
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Particle animation update
function updateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const randomX = Math.random() * 50 - 25;
        const randomY = Math.random() * 50 - 25;
        particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
}

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

// Lazy load images (if any)
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading state to CTA buttons
document.querySelectorAll('.cta-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Optional: Add loading animation
        const originalText = this.textContent;
        this.textContent = 'Loading...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
        }, 1500);
    });
});

// Accessibility: Focus visible for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('click', function() {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for focus states
const style = document.createElement('style');
style.innerHTML = `
    body.keyboard-nav .cta-button:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .nav-links a:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

console.log('Nasal Secure™ - Premium Landing Page Loaded Successfully! 🚀');