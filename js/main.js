/**
 * Beijing Maoying Technology Co., Ltd.
 * Corporate Website JavaScript
 * Interactive Features and Animations
 */

(function() {
    'use strict';

    // ============================================
    // Global State
    // ============================================
    const state = {
        isLoading: true,
        scrollPosition: 0,
        isMenuOpen: false,
        animatedElements: []
    };

    // ============================================
    // DOM Ready
    // ============================================
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initLoader();
        initNavigation();
        initScrollAnimations();
        initBackToTop();
        initParticles();
        initCounters();
        initFormHandling();
        initSmoothScroll();
        initParallax();
        initHoverEffects();
        initMobileMenu();
        initPageTransitions();
    }

    // ============================================
    // Loading Screen
    // ============================================
    function initLoader() {
        const loader = document.querySelector('.loader');
        
        if (!loader) {
            state.isLoading = false;
            return;
        }

        // Hide loader after page load
        window.addEventListener('load', function() {
            setTimeout(function() {
                loader.classList.add('hidden');
                state.isLoading = false;
                document.body.style.overflow = 'auto';
                
                // Trigger initial animations
                triggerInitialAnimations();
            }, 1500);
        });

        // Fallback: hide loader after 3 seconds
        setTimeout(function() {
            if (state.isLoading) {
                loader.classList.add('hidden');
                state.isLoading = false;
                document.body.style.overflow = 'auto';
                triggerInitialAnimations();
            }
        }, 3000);
    }

    function triggerInitialAnimations() {
        // Add visible class to hero elements
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animationPlayState = 'running';
            }, index * 200);
        });
    }

    // ============================================
    // Navigation
    // ============================================
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        
        if (!navbar) return;

        // Scroll effect
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
            state.scrollPosition = currentScroll;
        });

        // Active link highlighting
        highlightActiveLink();
        
        // Add scroll event for section detection
        window.addEventListener('scroll', debounce(highlightActiveLink, 100));
    }

    function highlightActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        if (sections.length === 0 || navLinks.length === 0) return;

        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // Mobile Menu
    // ============================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!menuToggle || !navMenu) return;

        // Toggle menu
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            state.isMenuOpen = !state.isMenuOpen;
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = state.isMenuOpen ? 'hidden' : 'auto';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                state.isMenuOpen = false;
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                state.isMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && state.isMenuOpen) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                state.isMenuOpen = false;
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ============================================
    // Scroll Animations
    // ============================================
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right, .animate-scale');
        
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add staggered animation to children
                    const children = entry.target.querySelectorAll('[class*="stagger-"]');
                    children.forEach(child => {
                        child.classList.add('visible');
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
            state.animatedElements.push(el);
        });

        // Also observe individual cards in grids
        const cards = document.querySelectorAll('.card, .news-card, .service-card');
        cards.forEach((card, index) => {
            card.classList.add('animate-on-scroll');
            card.classList.add(`stagger-${(index % 6) + 1}`);
            observer.observe(card);
        });
    }

    // ============================================
    // Back to Top Button
    // ============================================
    function initBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        
        if (!backToTop) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', debounce(function() {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, 100));

        // Scroll to top on click
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover animation
        backToTop.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        backToTop.addEventListener('mouseleave', function() {
            if (window.pageYOffset <= 500) {
                this.style.transform = 'translateY(0)';
            }
        });
    }

    // ============================================
    // Hero Particles
    // ============================================
    function initParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        
        if (!particlesContainer) return;

        // Create particles
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer, i);
        }
    }

    function createParticle(container, index) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        // Random opacity
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        container.appendChild(particle);
    }

    // ============================================
    // Counter Animation
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count')) || parseInt(element.textContent);
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const steps = 60;
        const stepDuration = duration / steps;
        let current = 0;
        
        const timer = setInterval(() => {
            current += target / steps;
            
            if (current >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, stepDuration);
    }

    // ============================================
    // Form Handling
    // ============================================
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
            
            // Add input animations
            const inputs = form.querySelectorAll('.form-input, .form-textarea, .form-select');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.parentElement.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        this.parentElement.classList.remove('focused');
                    }
                });
            });
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            submitBtn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> Sent Successfully!';
            
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 3000);
        }, 1500);
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Parallax Effect
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', debounce(function() {
            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(window.pageYOffset * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
        }, 10));
    }

    // ============================================
    // Hover Effects
    // ============================================
    function initHoverEffects() {
        // Card tilt effect
        const cards = document.querySelectorAll('.card, .news-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Button ripple effect
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // ============================================
    // Page Transitions
    // ============================================
    function initPageTransitions() {
        const links = document.querySelectorAll('a[href$=".html"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Don't prevent default for external links
                if (this.hostname && this.hostname !== window.location.hostname) {
                    return;
                }
                
                e.preventDefault();
                
                const href = this.getAttribute('href');
                
                // Add fade out animation
                document.body.style.opacity = '0';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });

        // Fade in on page load
        document.body.style.opacity = '0';
        window.addEventListener('load', function() {
            document.body.style.opacity = '1';
        });
    }

    // ============================================
    // Utility Functions
    // ============================================
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

    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // Expose to Global Scope
    // ============================================
    window.MaoyingApp = {
        state: state,
        debounce: debounce,
        throttle: throttle
    };

})();

// ============================================
// Additional Animation Effects
// ============================================

// Magnetic button effect
document.addEventListener('mousemove', function(e) {
    const magneticBtns = document.querySelectorAll('.btn-primary');
    
    magneticBtns.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
});

// Text reveal animation
function revealText() {
    const textElements = document.querySelectorAll('.reveal-text');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.display = 'inline-block';
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            span.style.transition = `all 0.3s ease ${index * 0.05}s`;
            
            element.appendChild(span);
        });
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const spans = element.querySelectorAll('span');
                    spans.forEach(span => {
                        span.style.opacity = '1';
                        span.style.transform = 'translateY(0)';
                    });
                }
            });
        });
        
        observer.observe(element);
    });
}

revealText();

// GSAP-like custom animations (lightweight version)
const animations = {
    fadeIn: (element, duration = 1) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}s ease`;
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    },
    
    slideIn: (element, direction = 'left', duration = 1) => {
        const transforms = {
            left: 'translateX(-100px)',
            right: 'translateX(100px)',
            up: 'translateY(100px)',
            down: 'translateY(-100px)'
        };
        
        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `all ${duration}s ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        }, 50);
    },
    
    scale: (element, duration = 1) => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        element.style.transition = `all ${duration}s ease`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, 50);
    }
};

// Export animations
window.MaoyingAnimations = animations;