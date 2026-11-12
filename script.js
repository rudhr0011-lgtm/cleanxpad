/* ============================================
   Clean-X Pad — Interactive JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback: hide preloader after 3 seconds max
    setTimeout(() => {
        preloader.classList.add('hidden');
    }, 3000);

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    function handleNavbarScroll() {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    handleNavbarScroll();

    // --- Mobile Navigation ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // --- Animated Counters ---
    const counters = document.querySelectorAll('.counter');
    const heroStatNumbers = document.querySelectorAll('.hero-stat-number[data-target]');

    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const startTime = performance.now();
        const isFloat = String(target).includes('.');
        const decimalPlaces = isFloat ? String(target).split('.')[1].length : 0;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = start + (target - start) * eased;

            if (isFloat) {
                element.textContent = current.toFixed(decimalPlaces);
            } else {
                element.textContent = Math.round(current).toLocaleString();
            }

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Observe counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.dataset.target);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
    heroStatNumbers.forEach(stat => counterObserver.observe(stat));

    // --- Particle Generation ---
    const particleContainer = document.getElementById('heroParticles');
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
            particleContainer.appendChild(particle);
        }
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Animate button
            submitBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="spin-icon">
                    <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="40 20" stroke-linecap="round"/>
                </svg>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;

            // Simulate submission
            setTimeout(() => {
                submitBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>Message Sent!</span>
                `;
                submitBtn.style.background = 'linear-gradient(135deg, #00C853, #43a047)';

                // Reset after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = `
                        <span>Send Message</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10h12m-4-4 4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    `;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active-link');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active-link');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

    // --- Add CSS for active link and spinner ---
    const dynamicStyles = document.createElement('style');
    dynamicStyles.textContent = `
        .active-link {
            color: var(--green-700) !important;
            background: var(--green-50) !important;
        }
        .spin-icon {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(dynamicStyles);

    // --- Parallax-like effect on hero ---
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        if (window.scrollY < window.innerHeight) {
            const progress = window.scrollY / window.innerHeight;
            heroContent.style.opacity = 1 - progress * 1.2;
            heroContent.style.transform = `translateY(${progress * 60}px)`;
        }
    }, { passive: true });

    // --- Infographic Circle Animations ---
    const infographicCircles = document.querySelectorAll('.infographic-progress');

    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circle = entry.target;
                const circumference = 2 * Math.PI * 45; // radius = 45
                const progress = parseInt(circle.dataset.progress);
                const offset = circumference - (progress / 100) * circumference;

                // Start from full offset (hidden) and animate to target
                circle.style.transition = 'none';
                circle.style.strokeDashoffset = circumference;

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        circle.style.transition = 'stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        circle.style.strokeDashoffset = offset;
                    });
                });

                circleObserver.unobserve(circle);
            }
        });
    }, { threshold: 0.5 });

    infographicCircles.forEach(circle => circleObserver.observe(circle));

    // --- 3D Background Parallax ---
    const bg3d = document.getElementById('global-3d-bg');
    if (bg3d) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10deg to 10deg
            const y = (e.clientY / window.innerHeight - 0.5) * -20;
            bg3d.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
        });
    }

    // --- Scroll Progress Bar ---
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        if (progressBar) {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }
    }, { passive: true });

    // --- Cinematic Background Transformation ---
    const bgPolluted = document.getElementById('bg-polluted');
    const bgClean = document.getElementById('bg-clean');
    const problemSection = document.getElementById('problem');
    const solutionSection = document.getElementById('solution');

    if (bgPolluted && bgClean && problemSection && solutionSection) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            // Activate backgrounds only when scrolling past hero
            const heroHeight = window.innerHeight * 0.8;
            if (scrollY < heroHeight) {
                bgPolluted.style.opacity = 0;
                bgClean.style.opacity = 0;
                return;
            }

            // Calculate progress between problem and solution
            const startScroll = problemSection.offsetTop - window.innerHeight / 2;
            const endScroll = solutionSection.offsetTop - window.innerHeight / 2;
            
            let progress = (scrollY - startScroll) / (endScroll - startScroll);
            progress = Math.max(0, Math.min(1, progress));

            // Polluted starts fully visible, fades out
            bgPolluted.style.opacity = Math.min(0.6, 1 - progress); // Cap opacity so it's not too dark
            // Clean starts invisible, fades in
            bgClean.style.opacity = Math.min(0.8, progress); // Cap opacity so it's not too bright
        }, { passive: true });
    }

    // --- Custom Mouse Cursor ---
    const cursor = document.getElementById('custom-cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (cursor && follower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instant update for the small dot
            cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
        });

        // Smooth follow loop
        function renderCursor() {
            // Easing for the follower
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.transform = `translate(${followerX}px, ${followerY}px) translate(-50%, -50%)`;
            requestAnimationFrame(renderCursor);
        }
        renderCursor();

        // Magnetic Hover & Ripples
        const interactiveElements = document.querySelectorAll('a, button, .problem-card, .feature-card, .team-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });

        window.addEventListener('click', (e) => {
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.left = e.clientX + 'px';
            ripple.style.top = e.clientY + 'px';
            document.body.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
});
