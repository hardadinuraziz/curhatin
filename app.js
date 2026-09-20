'use strict';

/* ==========================================================================
   PASTEL MINIMALIST OPENING CONTROLLER (SHINE JOURNEY)
   ========================================================================== */
function initConsultationSplash() {
    const splash = document.getElementById('consultationSplash');
    if (!splash) return;

    const btnSkipMain = document.getElementById('btnSplashSkip');
    const btnSkipCorner = document.getElementById('btnSplashSkipCorner');
    const channelItems = splash.querySelectorAll('.pastel-channel-item');

    // Prevent background scrolling while opening screen is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let exited = false;

    function dismissOpening(targetHash) {
        if (exited) return;
        exited = true;

        splash.classList.add('splash-exit');

        setTimeout(() => {
            splash.style.display = 'none';
            document.body.style.overflow = originalOverflow || '';

            if (targetHash) {
                const targetElem = document.querySelector(targetHash);
                if (targetElem) {
                    targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 550);
    }

    // Main "Temukan Layanan Kami" CTA Button
    if (btnSkipMain) {
        btnSkipMain.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOpening('#services');
        });
    }

    // Corner "Lewati" Button
    if (btnSkipCorner) {
        btnSkipCorner.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOpening();
        });
    }

    // Channel Hotspots: Chat, Call, Zoom
    const hotspotChat = document.getElementById('hotspotChat');
    const hotspotCall = document.getElementById('hotspotCall');
    const hotspotZoom = document.getElementById('hotspotZoom');

    if (hotspotChat) {
        hotspotChat.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOpening('#counselors');
        });
    }
    if (hotspotCall) {
        hotspotCall.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOpening('#services');
        });
    }
    if (hotspotZoom) {
        hotspotZoom.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissOpening('#services');
        });
    }

    // Dismiss if clicking background area outside the card
    splash.addEventListener('click', (e) => {
        if (e.target === splash || e.target.classList.contains('pastel-poster-wrapper')) {
            dismissOpening();
        }
    });

    // Keyboard Shortcuts (Escape key to enter immediately)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !exited) {
            dismissOpening();
        }
    }, { once: true });
}

// Run as soon as DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConsultationSplash);
} else {
    initConsultationSplash();
}

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
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

/* ===========================
   NAV REGISTRATION DROPDOWN (Click/Touch support)
=========================== */
const navGformDropdown = document.getElementById('navGformDropdown');
const btnNavGform = document.getElementById('btnNavGform');
if (navGformDropdown && btnNavGform) {
    btnNavGform.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navGformDropdown.classList.toggle('open');
        btnNavGform.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
        if (!navGformDropdown.contains(e.target)) {
            navGformDropdown.classList.remove('open');
            btnNavGform.setAttribute('aria-expanded', 'false');
        }
    });
}

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
observeWithStagger('.assessment-grid .assess-card', 60);
observeWithStagger('.testi-grid .testi-card', 80);
observeWithStagger('.articles-grid .article-card', 80);
observeWithStagger('.steps-wrapper .step-item', 100);

/* ===========================
   ASSESSMENT PRICING TABS
=========================== */
window.switchPricingTab = function(tab) {
    const btnIndividu = document.getElementById('tabBtnIndividu');
    const btnInstansi = document.getElementById('tabBtnInstansi');
    const gridIndividu = document.getElementById('gridIndividu');
    const gridInstansi = document.getElementById('gridInstansi');

    if (!btnIndividu || !btnInstansi || !gridIndividu || !gridInstansi) return;

    if (tab === 'individu') {
        btnIndividu.classList.add('active');
        btnInstansi.classList.remove('active');
        gridIndividu.style.display = 'grid';
        gridInstansi.style.display = 'none';
    } else {
        btnInstansi.classList.add('active');
        btnIndividu.classList.remove('active');
        gridInstansi.style.display = 'grid';
        gridIndividu.style.display = 'none';
    }
};

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