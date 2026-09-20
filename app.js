'use strict';

/* ==========================================================================
   CONSULTATION THEME LAMP INTRO ANIMATION (PULL-CORD LAMP CONTROLLER)
   ========================================================================== */
function initConsultationSplash() {
    const splash = document.getElementById('consultationSplash');
    if (!splash) return;

    const lampCord = document.getElementById('lampCord');
    const lampCordLine = document.getElementById('lampCordLine');
    const lampCordBead = document.getElementById('lampCordBead');
    const lampHint = document.getElementById('lampHint');
    const cordPullTag = document.getElementById('cordPullTag');
    const stepHint = document.getElementById('splashStepHint');
    const enterBtn = document.getElementById('btnSplashSkip');
    const themeCards = splash.querySelectorAll('.splash-theme-card');

    // Prevent body scroll during splash
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    let isLit = false;
    let exited = false;
    let autoCycleTimer = null;
    let activeCardIndex = 0;

    // Start with subtle idle tug to show cord is interactive
    if (lampCord) {
        lampCord.classList.add('idle-tug');
    }

    // Web Audio mechanical switch click sound
    function playLampClick() {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (!AudioCtx) return;
            const ctx = new AudioCtx();
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(540, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.055);
            gain.gain.setValueAtTime(0.35, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.055);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.06);
        } catch (err) {
            // silent fallback
        }
    }

    // Perform the Spring Recoil Pull Animation and Toggle Lamp
    function triggerPull(recoilDistance = 35) {
        if (exited) return;

        if (lampCord) {
            lampCord.classList.remove('idle-tug');
            lampCord.classList.remove('pulling');
            lampCord.classList.remove('recoil');
            void lampCord.offsetWidth; // force reflow

            lampCord.style.setProperty('--recoil-y', `${recoilDistance}px`);
            lampCord.classList.add('recoil');

            setTimeout(() => {
                if (lampCord) {
                    lampCord.classList.remove('recoil');
                    lampCord.style.transform = '';
                }
                if (lampCordLine) lampCordLine.style.height = '';
            }, 560);
        }

        playLampClick();
        isLit = !isLit;

        if (isLit) {
            splash.classList.add('is-lit');
            if (stepHint) stepHint.textContent = 'Lampu menyala • Ruang konsultasi siap melayani Anda';
            startThemeCycle();
        } else {
            splash.classList.remove('is-lit');
            if (stepHint) stepHint.textContent = 'Tarik tali lampu untuk menyalakan kembali';
            stopThemeCycle();
        }
    }

    // Interactive Drag-and-Drop Physics for Pull Cord
    let isDragging = false;
    let startY = 0;
    let pullDistance = 0;
    let dragStartTime = 0;

    function onPointerDown(e) {
        if (exited) return;
        isDragging = true;
        startY = e.clientY;
        pullDistance = 0;
        dragStartTime = Date.now();

        if (lampCord) {
            lampCord.classList.remove('idle-tug');
            lampCord.classList.remove('recoil');
            lampCord.classList.add('is-dragging');
            try {
                lampCord.setPointerCapture(e.pointerId);
            } catch (err) {}
        }

        window.addEventListener('pointermove', onPointerMove, { passive: false });
        window.addEventListener('pointerup', onPointerUp);
        window.addEventListener('pointercancel', onPointerUp);
    }

    function onPointerMove(e) {
        if (!isDragging) return;
        e.preventDefault();

        const dy = e.clientY - startY;
        pullDistance = Math.max(0, Math.min(55, dy));

        if (lampCord) {
            lampCord.style.transform = `translateY(${pullDistance}px)`;
        }
        if (lampCordLine) {
            lampCordLine.style.height = `${42 + pullDistance * 0.7}px`;
        }
    }

    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;

        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        window.removeEventListener('pointercancel', onPointerUp);

        if (lampCord) {
            lampCord.classList.remove('is-dragging');
            try {
                lampCord.releasePointerCapture(e.pointerId);
            } catch (err) {}
        }

        const dragDuration = Date.now() - dragStartTime;

        // If pulled down sufficiently (>= 14px) or quickly tapped (< 260ms)
        if (pullDistance >= 14 || dragDuration < 260) {
            const recoilY = Math.max(28, pullDistance);
            triggerPull(recoilY);
        } else {
            // Reset smoothly without switching
            if (lampCord) {
                lampCord.style.transition = 'transform 0.2s cubic-bezier(0.2, 1, 0.3, 1)';
                lampCord.style.transform = '';
                setTimeout(() => {
                    if (lampCord) lampCord.style.transition = '';
                }, 200);
            }
            if (lampCordLine) {
                lampCordLine.style.height = '';
            }
        }
    }

    if (lampCord) {
        lampCord.addEventListener('pointerdown', onPointerDown);
        // Keyboard support
        lampCord.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerPull(36);
            }
        });
    }

    // Clicking hint pills also triggers pull animation
    if (lampHint) {
        lampHint.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerPull(36);
        });
    }
    if (cordPullTag) {
        cordPullTag.addEventListener('click', (e) => {
            e.stopPropagation();
            triggerPull(36);
        });
    }

    // Theme Highlights Cycle
    function startThemeCycle() {
        stopThemeCycle();
        autoCycleTimer = setInterval(() => {
            if (!isLit || exited) return;
            activeCardIndex = (activeCardIndex + 1) % themeCards.length;
            themeCards.forEach((card, idx) => {
                card.classList.toggle('active', idx === activeCardIndex);
            });
        }, 1600);
    }

    function stopThemeCycle() {
        if (autoCycleTimer) {
            clearInterval(autoCycleTimer);
            autoCycleTimer = null;
        }
    }

    // Dismiss Splash & Open Website
    function dismissSplash() {
        if (exited) return;
        exited = true;
        stopThemeCycle();
        splash.classList.add('splash-exit');
        setTimeout(() => {
            splash.style.display = 'none';
            document.body.style.overflow = originalOverflow || '';
        }, 550);
    }

    // Enter Website Button
    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dismissSplash();
        });
    }

    // Keyboard Shortcuts (Escape to enter)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !exited) {
            dismissSplash();
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