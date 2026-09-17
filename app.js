'use strict';

/* ===========================
   MOBILE HAMBURGER MENU
=========================== */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
    });
});

/* ===========================
   SMOOTH SCROLL
=========================== */
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const headerH = document.getElementById('header').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
    window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const hash = this.getAttribute('href');
        if (hash === '#') return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        const headerH = document.getElementById('header').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

/* ===========================
   HEADER SCROLL EFFECT
=========================== */
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    header.classList.toggle('scrolled', scrolled);
    backToTop.classList.toggle('visible', window.scrollY > 500);
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   COUNTER ANIMATION
=========================== */
let countersDone = false;

function formatNumber(n) {
    if (n >= 1000) return n.toLocaleString('id-ID');
    return n;
}

function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(Math.round(increment * step), target);
            el.textContent = formatNumber(current);
            if (current >= target) clearInterval(timer);
        }, duration / steps);
    });
}

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !countersDone) {
            countersDone = true;
            animateCounters();
        }
    }, { threshold: 0.4 });
    observer.observe(statsSection);
}

/* ===========================
   FILTER TABS — PSYCHOLOGISTS
=========================== */
document.getElementById('filterTabs').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.psych-card').forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
        if (show) {
            card.style.animation = 'none';
            requestAnimationFrame(() => {
                card.style.animation = 'revealCard 0.4s ease forwards';
            });
        }
    });
});

/* ===========================
   SCROLL REVEAL ANIMATION
=========================== */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Stagger children for grids
function observeWithStagger(selector, delayPerItem = 80) {
    document.querySelectorAll(selector).forEach((el, i) => {
        el.style.transitionDelay = `${i * delayPerItem}ms`;
        revealObserver.observe(el);
    });
}

observeWithStagger('.services-grid .service-card', 80);
observeWithStagger('.psych-grid .psych-card', 80);
observeWithStagger('.testi-grid .testi-card', 80);
observeWithStagger('.articles-grid .article-card', 80);
observeWithStagger('.steps-wrapper .step-item', 100);

/* ===========================
   SEARCH BAR
=========================== */
document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    if (!query) {
        document.getElementById('searchInput').focus();
        return;
    }
    smoothScroll('services');
});

document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('searchBtn').click();
});

/* ===========================
   INJECT CSS ANIMATIONS
=========================== */
const style = document.createElement('style');
style.textContent = `
@keyframes revealCard {
    from { opacity:0.3; transform:translateY(12px); }
    to   { opacity:1;   transform:translateY(0); }
}
`;
document.head.appendChild(style);