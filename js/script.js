/* =========================================================
   Dark & Gold Restaurant / Cafe Menu Template
   Behavior layer — no per-client content lives here.
   Change CONFIG below per client instead of editing the logic.
   ========================================================= */

const CONFIG = {
    // localStorage key for the cookie-consent banner.
    // Give each client site its own key so consent isn't shared across templates.
    cookieConsentKey: 'template_cookie_consent',
    // Auto-open the allergy notice modal on first page load (ms delay). Set to null to disable.
    autoOpenAllergyModalDelayMs: 400
};

// Smooth scroll for any element with [data-scroll="#target-id"]
document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = document.querySelector(btn.getAttribute('data-scroll'));
        if (!target) return;
        window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        if (btn.parentElement.classList.contains('category-nav')) {
            document.querySelectorAll('.category-nav button').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
});

// Accordion: only one menu category open at a time
document.querySelectorAll('.menu-header').forEach(header => {
    header.addEventListener('click', () => {
        const group = header.parentElement;
        const isActive = group.classList.contains('active');
        document.querySelectorAll('.menu-group').forEach(g => g.classList.remove('active'));
        if (!isActive) group.classList.add('active');
    });
});
const firstMenuGroup = document.querySelector('.menu-group');
if (firstMenuGroup) firstMenuGroup.classList.add('active');

// Scroll-reveal animation for menu categories
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.menu-group').forEach(g => revealObserver.observe(g));

// Allergy / dietary-info modal
const allergyModal = document.getElementById('allergyModal');
const allergyBtn = document.querySelector('.allergy-btn');
const allergyClose = document.querySelector('.modal .close');
const allergyUnderstand = document.getElementById('allergyUnderstand');
const allergyAsk = document.getElementById('allergyAsk');

function openAllergy() {
    if (!allergyModal) return;
    allergyModal.style.display = 'flex';
    allergyModal.setAttribute('aria-hidden', 'false');
}
function closeAllergy() {
    if (!allergyModal) return;
    allergyModal.style.display = 'none';
    allergyModal.setAttribute('aria-hidden', 'true');
}

if (allergyModal) {
    allergyBtn?.addEventListener('click', openAllergy);
    allergyClose?.addEventListener('click', closeAllergy);
    allergyUnderstand?.addEventListener('click', closeAllergy);
    allergyAsk?.addEventListener('click', closeAllergy);
    allergyModal.addEventListener('click', e => { if (e.target === allergyModal) closeAllergy(); });

    if (CONFIG.autoOpenAllergyModalDelayMs !== null) {
        window.addEventListener('load', () => {
            setTimeout(openAllergy, CONFIG.autoOpenAllergyModalDelayMs);
        });
    }
}

// Cookie consent banner
const cookieBanner = document.getElementById('cookieBanner');
if (cookieBanner) {
    const consent = localStorage.getItem(CONFIG.cookieConsentKey);
    if (!consent) { cookieBanner.style.display = 'flex'; }

    document.getElementById('acceptCookies')?.addEventListener('click', () => {
        localStorage.setItem(CONFIG.cookieConsentKey, 'accepted');
        cookieBanner.style.display = 'none';
    });
    document.getElementById('declineCookies')?.addEventListener('click', () => {
        localStorage.setItem(CONFIG.cookieConsentKey, 'declined');
        cookieBanner.style.display = 'none';
    });
}

// Small tactile "bounce" feedback when tapping a product card
document.querySelectorAll('.product').forEach(item => {
    item.addEventListener('click', () => {
        item.style.transform = 'scale(0.94)';
        setTimeout(() => { item.style.transform = 'scale(1)'; }, 150);
    });
});
