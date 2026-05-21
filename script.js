/* House of Style — Main Script */

// --- Sticky Nav shadow on scroll ---
const navbar = document.getElementById('navbar');

function updateNav() {
    navbar.style.boxShadow = window.scrollY > 10
        ? '0 2px 16px rgba(0,0,0,0.08)'
        : 'none';
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// --- Mobile Menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
});

// --- Scroll Reveal ---
const revealTargets = document.querySelectorAll(
    '.section-header, .store-card, .about-inner, .about-text, ' +
    '.coming-soon-inner, .gallery-item, .collection-content, .footer-top'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Stagger siblings slightly
            const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.in-view)');
            siblings.forEach((sibling, idx) => {
                setTimeout(() => sibling.classList.add('in-view'), idx * 80);
            });
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

// --- Smooth anchor scroll (older browser fallback) ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
            .getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// --- Current hours highlight ---
(function highlightCurrentDay() {
    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const today = days[new Date().getDay()];

    document.querySelectorAll('.hours-row').forEach(row => {
        const dayCell = row.querySelector('span:first-child');
        if (dayCell && dayCell.textContent.trim() === today) {
            row.style.color = 'var(--red)';
            row.style.fontWeight = '600';
            dayCell.style.color = 'var(--red)';
        }
    });
})();

// --- Pause marquee on hover ---
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
    const strip = marqueeTrack.parentElement;
    strip.addEventListener('mouseenter', () => {
        marqueeTrack.style.animationPlayState = 'paused';
    });
    strip.addEventListener('mouseleave', () => {
        marqueeTrack.style.animationPlayState = 'running';
    });
}
