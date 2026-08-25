(function() {
    'use strict';

    // ── Theme Toggle ──
    var html = document.documentElement;
    var stored = localStorage.getItem('theme');
    if (stored) {
        html.setAttribute('data-theme', stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        html.setAttribute('data-theme', 'light');
    }

    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            var current = html.getAttribute('data-theme');
            var next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    // ── Scroll Progress ──
    var progressBar = document.querySelector('.scroll-progress');
    function updateProgress() {
        if (!progressBar) return;
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            progressBar.style.width = (scrollTop / docHeight * 100) + '%';
        }
    }

    // ── Nav Scroll Effect ──
    var header = document.querySelector('.site-header');
    function updateNav() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 40);
    }

    // ── Active Nav Link (index page only) ──
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');
    function updateActiveLink() {
        if (!sections.length || !navLinks.length) return;
        var scrollY = window.scrollY + window.innerHeight / 3;
        sections.forEach(function(section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(function(link) {
                    var href = link.getAttribute('href');
                    link.classList.toggle('active', href === '#' + id || href === '/#' + id);
                });
            }
        });
    }

    // Throttled scroll handler
    var ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateProgress();
                updateNav();
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    updateProgress();
    updateNav();

    // ── Scroll Reveal ──
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function(el) {
        observer.observe(el);
    });

    // ── Mobile Menu ──
    var menuBtn = document.querySelector('.nav-menu-btn');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (menuBtn && mobileMenu) {
        var menuLinks = mobileMenu.querySelectorAll('a');

        menuBtn.addEventListener('click', function() {
            var isOpen = !mobileMenu.classList.contains('active');
            mobileMenu.classList.toggle('active');
            mobileMenu.hidden = !isOpen;
            menuBtn.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        menuLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenu.hidden = true;
                menuBtn.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Smooth Scroll for same-page anchors ──
    // preventDefault() stops the browser doing its own anchor navigation, which
    // is what normally MOVES FOCUS to the target. Without restoring that, the
    // skip link scrolls but strands focus on itself: it stays pinned on screen
    // over the logo, and the next Tab drops the visitor back into the nav —
    // exactly the trap a skip link exists to avoid.
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Headings and <main> aren't focusable on their own; -1 makes them
            // programmatically focusable without adding them to the tab order.
            if (!target.hasAttribute('tabindex')) {
                target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
            if (history.replaceState) history.replaceState(null, '', href);
        });
    });
})();
