// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animate Elements on Scroll
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

// Observe all cards and timeline items - but NOT on homepage expertise section
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .publication-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Homepage expertise cards stay visible and fixed (no animation, no scroll effects)
    const expertiseCards = document.querySelectorAll('.expertise .expertise-card');
    expertiseCards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'none'; // Disable any transitions
    });
});

// Contact Form Handler
function handleSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formMessage = document.getElementById('formMessage');
    const formData = new FormData(form);
    
    // Show loading state
    formMessage.style.display = 'block';
    formMessage.style.background = '#d1ecf1';
    formMessage.style.color = '#0c5460';
    formMessage.style.border = '1px solid #bee5eb';
    formMessage.innerHTML = '⏳ Sending message...';
    
    // Submit to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            formMessage.style.background = '#d4edda';
            formMessage.style.color = '#155724';
            formMessage.style.border = '1px solid #c3e6cb';
            formMessage.innerHTML = currentLanguage === 'fr' 
                ? '✓ Merci pour votre message ! Je vous répondrai bientôt.'
                : '✓ Thank you for your message! I will get back to you soon.';
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        formMessage.style.background = '#f8d7da';
        formMessage.style.color = '#721c24';
        formMessage.style.border = '1px solid #f5c6cb';
        formMessage.innerHTML = currentLanguage === 'fr'
            ? '✗ Erreur lors de l\'envoi. Veuillez réessayer.'
            : '✗ Error sending message. Please try again.';
    });
    
    return false;
}

// Page Load Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add subtle parallax effect to hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
    });
}

// Language switching functionality
let currentLanguage = 'en';

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en][data-fr]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });
    
    // Update page title
    updatePageTitle(lang);
    
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Load saved language preference
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    switchLanguage(savedLang);
    
    // Also update page title based on current page
    updatePageTitle(savedLang);
});

// Update page title based on language and current page
function updatePageTitle(lang) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const titles = {
        'index.html': {
            'en': 'Alain Fénéon - Honorary Counsel, Arbitrator & Mediator',
            'fr': 'Alain Fénéon - Conseil Honoraire, Arbitre & Médiateur'
        },
        'career.html': {
            'en': 'Career - Alain Fénéon',
            'fr': 'Carrière - Alain Fénéon'
        },
        'publications.html': {
            'en': 'Publications - Alain Fénéon',
            'fr': 'Publications - Alain Fénéon'
        },
        'contact.html': {
            'en': 'Contact - Alain Fénéon',
            'fr': 'Contact - Alain Fénéon'
        }
    };
    
    if (titles[currentPage] && titles[currentPage][lang]) {
        document.title = titles[currentPage][lang];
    }
}

// Print current year in footer
const updateFooterYear = () => {
    const footer = document.querySelector('.footer p');
    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.innerHTML = footer.innerHTML.replace('2025', currentYear);
    }
};
updateFooterYear();

// Accordion functionality
function toggleAccordion(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (accordion) {
        accordion.classList.toggle('active');
    }
}

// Open an accordion by id and scroll to it
function openAccordionAndScroll(accordionId) {
    const accordion = document.getElementById(accordionId);
    if (!accordion) return;

    // Ensure it is active/open
    if (!accordion.classList.contains('active')) {
        accordion.classList.add('active');
    }

    // Smooth scroll into view
    accordion.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
