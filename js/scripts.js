/* Mobile Menu Toggle */
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenu) {
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Set current year in footer
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        // Remove active class from all links
        link.classList.remove('active');
        // Add active class if current page matches the link
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Run on page load
setActiveNavLink();

// Track external link clicks
document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (link && link.hostname !== window.location.hostname && link.href.startsWith('http')) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                'event_category': 'Outbound Link',
                'event_label': link.href,
                'transport_type': 'beacon'
            });
        }
    }
});

// Track PDF downloads
document.addEventListener('click', function(e) {
    const link = e.target.closest('a[href*=".pdf"]');
    if (link) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'file_download', {
                'event_category': 'PDF',
                'event_label': link.getAttribute('href'),
                'transport_type': 'beacon'
            });
        }
    }
});

// Track scroll depth (if user scrolls more than 75% down the page)
let scrollTracked = false;
window.addEventListener('scroll', function() {
    if (!scrollTracked && typeof gtag !== 'undefined') {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent >= 75) {
            scrollTracked = true;
            gtag('event', 'scroll', {
                'event_category': 'Engagement',
                'event_label': 'Page Scroll 75%',
                'value': scrollPercent
            });
        }
    }
});

