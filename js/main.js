// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Preloader animation
    const loader = document.querySelector('.loader');
    const loaderTimeline = gsap.timeline();
    
    loaderTimeline
        .to('.loader-progress', {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut'
        })
        .to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                // Start animations after loader is hidden
                initAnimations();
            }
        });
    
    // Initialize all animations
    function initAnimations() {
        // Header scroll effect
        const header = document.querySelector('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Mobile navigation toggle
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                gsap.to(bars[0], { rotate: 45, y: 9, duration: 0.3 });
                gsap.to(bars[1], { opacity: 0, duration: 0.3 });
                gsap.to(bars[2], { rotate: -45, y: -9, duration: 0.3 });
            } else {
                gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
                gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                    
                    // Reset hamburger animation
                    const bars = navToggle.querySelectorAll('.bar');
                    gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
                    gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                    gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
                }
            });
        });
        
        // Hero section animations
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .from('.hero h1', {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            })
            .from('.subtitle, .date', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.countdown-item', {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-buttons .btn', {
                y: 20,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-image img', {
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power3.out'
            }, '-=0.8')
            .from('.scroll-indicator', {
                y: -20,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.4');
        
        // Countdown timer
        const countdownDate = new Date('October 15, 2023 00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            // If the countdown is over
            if (distance < 0) {
                document.getElementById('days').innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
            document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
        }
        
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        // Scroll animations for sections
        // About section
        gsap.from('.about-text', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.about-image', {
            scrollTrigger: {
                trigger: '.about',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: 100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
        
        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.stats',
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Challenges section
        gsap.from('.challenge-card', {
            scrollTrigger: {
                trigger: '.challenges',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // Timeline section
        gsap.from('.timeline-item', {
            scrollTrigger: {
                trigger: '.schedule',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Sponsors section
        gsap.from('.sponsor-tier', {
            scrollTrigger: {
                trigger: '.sponsors',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.sponsor-logo', {
            scrollTrigger: {
                trigger: '.sponsors-grid',
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        });
        
        // FAQ section
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
        
        // Register section
        gsap.from('.register-text', {
            scrollTrigger: {
                trigger: '.register',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        gsap.from('.register-form', {
            scrollTrigger: {
                trigger: '.register',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
        
        // Parallax effect for stars background
        gsap.to('#stars', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: -200,
            ease: 'none'
        });
        
        gsap.to('#stars2', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: -400,
            ease: 'none'
        });
        
        gsap.to('#stars3', {
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1
            },
            y: -600,
            ease: 'none'
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('.faq-toggle').classList.remove('active');
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            toggle.classList.toggle('active');
            
            // Change icon
            if (toggle.classList.contains('active')) {
                toggle.innerHTML = '<i class="fas fa-minus"></i>';
            } else {
                toggle.innerHTML = '<i class="fas fa-plus"></i>';
            }
        });
    });
    
    // Form submission
    const registrationForm = document.getElementById('registration-form');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const submitButton = registrationForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // Simulate API call with timeout
            setTimeout(() => {
                // Create success message
                const formContainer = registrationForm.parentElement;
                formContainer.innerHTML = `
                    <div class="success-message">
                        <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--secondary-color); margin-bottom: 20px;"></i>
                        <h3>Registration Successful!</h3>
                        <p>Thank you for registering for the SpaceTech Hackathon. We've sent a confirmation email with further details.</p>
                    </div>
                `;
                
                // Animate success message
                gsap.from('.success-message', {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                });
            }, 2000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let currentSection = '';
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize cursor effects
    function initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
            
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        // Cursor effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .challenge-card, .faq-question, .social-link');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
                cursorDot.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
                cursorDot.classList.remove('active');
            });
        });
    }
    
    // Only initialize cursor effects on non-touch devices
    if (!('ontouchstart' in window)) {
        initCursorEffects();
    }

    // Initialize countdown timer with smooth updates
    function updateCountdown() {
        const eventDate = new Date('August 13, 2025 10:00:00').getTime();
        
        function update() {
            const now = new Date().getTime();
            const distance = eventDate - now;
            
            // If the countdown is finished
            if (distance < 0) {
                clearInterval(countdownTimer);
                document.querySelector('.countdown').innerHTML = '<div class="event-started">The event has started!</div>';
                return;
            }
            
            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Get DOM elements once
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            
            // Only update if the value has changed
            if (daysEl && daysEl.textContent !== days.toString().padStart(2, '0')) {
                daysEl.textContent = days.toString().padStart(2, '0');
            }
            if (hoursEl && hoursEl.textContent !== hours.toString().padStart(2, '0')) {
                hoursEl.textContent = hours.toString().padStart(2, '0');
            }
            if (minutesEl && minutesEl.textContent !== minutes.toString().padStart(2, '0')) {
                minutesEl.textContent = minutes.toString().padStart(2, '0');
            }
            if (secondsEl) {
                secondsEl.textContent = seconds.toString().padStart(2, '0');
            }
            
            // Schedule next update with requestAnimationFrame for smoother animation
            requestAnimationFrame(update);
        }
        
        // Start the update loop
        update();
    }
    
    // Start the countdown
    let countdownTimer = setInterval(updateCountdown, 1000);
    
    // Initial call to display the countdown immediately
    updateCountdown();
});