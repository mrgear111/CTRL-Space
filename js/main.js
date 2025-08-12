// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP and ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize loading screen first
    initLoadingScreen();
    
    // Initialize all other animations
    initAnimations();
    
    // Loading Screen Animation
    function initLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingBar = document.getElementById('loadingBar');
        const loadingPercentage = document.getElementById('loadingPercentage');
        const loadingChars = document.querySelectorAll('.loading-text-char');
        const loadingSubtitle = document.querySelector('.loading-subtitle');
        const loadingLogos = document.querySelectorAll('.loading-logo');
        const loadingConnector = document.querySelector('.loading-connector');
        
        // Initial setup
        gsap.set(loadingChars, { 
            opacity: 0, 
            y: 50, 
            rotationY: 90,
            scale: 0.5
        });
        gsap.set(loadingSubtitle, { opacity: 0, y: 20 });
        gsap.set(loadingPercentage, { opacity: 0 });
        gsap.set(loadingBar, { width: '0%' });
        gsap.set(loadingLogos, { scale: 0, rotation: 180 });
        gsap.set(loadingConnector, { scale: 0, opacity: 0 });
        
        // Loading timeline
        const loadingTl = gsap.timeline();
        
        // Logos entrance with stagger
        loadingTl.to(loadingLogos, {
            duration: 1,
            scale: 1,
            rotation: 0,
            stagger: 0.3,
            ease: "back.out(1.7)"
        })
        
        // Connector appears
        .to(loadingConnector, {
            duration: 0.5,
            scale: 1,
            opacity: 1,
            ease: "back.out(1.2)"
        }, "-=0.3")
        
        // Animate characters with stagger
        .to(loadingChars, {
            duration: 0.8,
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            stagger: {
                amount: 2,
                from: "start",
                ease: "power2.out"
            },
            ease: "back.out(1.2)"
        }, "-=0.5")
        
        // Subtitle fade in
        .to(loadingSubtitle, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=1")
        
        // Progress bar animation
        .to(loadingPercentage, {
            duration: 0.3,
            opacity: 1
        }, "-=0.5")
        .to(loadingBar, {
            duration: 3,
            width: '100%',
            ease: "power2.inOut"
        })
        
        // Animate percentage counter
        .to({ progress: 0 }, {
            duration: 3,
            progress: 100,
            ease: "power2.inOut",
            onUpdate: function() {
                loadingPercentage.textContent = Math.round(this.targets()[0].progress) + '%';
            }
        }, "-=3")
        
        // Character exit animation
        .to(loadingChars, {
            duration: 0.6,
            opacity: 0,
            y: -30,
            rotationY: -90,
            scale: 1.2,
            stagger: {
                amount: 0.8,
                from: "center",
                ease: "power2.in"
            }
        }, "+=0.5")
        
        // Final exit
        .to([loadingLogos, loadingConnector, loadingSubtitle, loadingPercentage, '.loading-progress'], {
            duration: 0.8,
            opacity: 0,
            y: -50,
            scale: 0.8,
            stagger: 0.1,
            ease: "power2.in"
        }, "-=0.3")
        
        // Screen fade out
        .to(loadingScreen, {
            duration: 1,
            opacity: 0,
            scale: 1.1,
            ease: "power2.inOut",
            onComplete: () => {
                loadingScreen.style.display = 'none';
                // Enable body scroll
                document.body.style.overflow = 'auto';
                
                // Trigger main content animations
                triggerMainContentAnimations();
            }
        });
        
        // Disable body scroll during loading
        document.body.style.overflow = 'hidden';
        
        // Character hover effects during loading
        loadingChars.forEach((char, index) => {
            gsap.to(char, {
                duration: 2 + (index * 0.1),
                y: "+=10",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 3 + (index * 0.1)
            });
        });
    }
    
    // Trigger main content animations after loading
    function triggerMainContentAnimations() {
        // Hero section entrance
        gsap.from('.hero-content > *', {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power2.out"
        });
        
        gsap.from('.hero-image', {
            duration: 1.2,
            x: 100,
            opacity: 0,
            ease: "power2.out",
            delay: 0.3
        });
    }
    
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
        
        if (navToggle && navLinks) {
            navToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                navToggle.classList.toggle('active');
                
                // Animate hamburger to X (works with both .bar and span elements)
                const bars = navToggle.querySelectorAll('.bar, span');
                if (navToggle.classList.contains('active')) {
                    if (bars.length >= 3) {
                        gsap.to(bars[0], { rotate: 45, y: 9, duration: 0.3 });
                        gsap.to(bars[1], { opacity: 0, duration: 0.3 });
                        gsap.to(bars[2], { rotate: -45, y: -9, duration: 0.3 });
                    }
                } else {
                    if (bars.length >= 3) {
                        gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
                        gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                        gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
                    }
                }
            });
            
            // Close mobile menu when clicking on a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggle.classList.remove('active');
                        
                        // Reset hamburger animation
                        const bars = navToggle.querySelectorAll('.bar, span');
                        if (bars.length >= 3) {
                            gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
                            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                            gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
                        }
                    }
                });
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        navToggle.classList.remove('active');
                        
                        // Reset hamburger animation
                        const bars = navToggle.querySelectorAll('.bar, span');
                        if (bars.length >= 3) {
                            gsap.to(bars[0], { rotate: 0, y: 0, duration: 0.3 });
                            gsap.to(bars[1], { opacity: 1, duration: 0.3 });
                            gsap.to(bars[2], { rotate: 0, y: 0, duration: 0.3 });
                        }
                    }
                }
            });
        }
        
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
        
        // Rocket launch animation
        const rocketContainer = document.querySelector('.rocket-3d');
        if (rocketContainer) {
            // Set up initial rocket state
            gsap.set(rocketContainer, { y: 0, scale: 1, opacity: 1 });
            
            // Create scroll-triggered rocket launch
            gsap.to(rocketContainer, {
                scrollTrigger: {
                    trigger: '.schedule',
                    start: 'top 50%',
                    end: 'bottom 20%',
                    scrub: 2,
                    onEnter: () => {
                        rocketContainer.classList.add('rocket-launching');
                        // Add exhaust effect
                        const exhaust = rocketContainer.querySelector('.rocket-exhaust');
                        if (exhaust) {
                            exhaust.style.opacity = '1';
                        }
                    },
                    onLeave: () => {
                        // Reset rocket after it leaves view
                        setTimeout(() => {
                            rocketContainer.classList.remove('rocket-launching');
                            gsap.set(rocketContainer, { y: 0, scale: 1, opacity: 1 });
                            const exhaust = rocketContainer.querySelector('.rocket-exhaust');
                            if (exhaust) {
                                exhaust.style.opacity = '0';
                            }
                        }, 1000);
                    },
                    onEnterBack: () => {
                        rocketContainer.classList.remove('rocket-launching');
                        gsap.set(rocketContainer, { y: 0, scale: 1, opacity: 1 });
                    }
                },
                y: -800,
                scale: 0.3,
                opacity: 0,
                duration: 4,
                ease: 'power2.out'
            });
            
            // Add click-to-launch functionality
            rocketContainer.addEventListener('click', () => {
                if (!rocketContainer.classList.contains('rocket-launching')) {
                    rocketContainer.classList.add('rocket-launching');
                    
                    // Launch animation timeline
                    const launchTl = gsap.timeline({
                        onComplete: () => {
                            // Reset after 2 seconds
                            setTimeout(() => {
                                rocketContainer.classList.remove('rocket-launching');
                                gsap.set(rocketContainer, { y: 0, scale: 1, opacity: 1 });
                                const exhaust = rocketContainer.querySelector('.rocket-exhaust');
                                if (exhaust) {
                                    exhaust.style.opacity = '0';
                                }
                            }, 2000);
                        }
                    });
                    
                    launchTl
                        .to(rocketContainer, {
                            y: -800,
                            scale: 0.3,
                            opacity: 0,
                            duration: 5,
                            ease: 'power2.out'
                        });
                    
                    // Show exhaust
                    const exhaust = rocketContainer.querySelector('.rocket-exhaust');
                    if (exhaust) {
                        exhaust.style.opacity = '1';
                    }
                }
            });
        }
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isActive = answer.classList.contains('active');
            
            // Close all other answers with smooth animation
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    
                    otherAnswer.classList.remove('active');
                    otherToggle.classList.remove('active');
                    otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                    
                    // GSAP animation for closing
                    gsap.to(otherAnswer, {
                        maxHeight: 0,
                        padding: '0 20px',
                        duration: 0.3,
                        ease: 'power2.out'
                    });
                }
            });
            
            // Toggle current answer
            if (!isActive) {
                // Opening animation
                answer.classList.add('active');
                toggle.classList.add('active');
                toggle.innerHTML = '<i class="fas fa-minus"></i>';
                
                gsap.fromTo(answer, 
                    { 
                        maxHeight: 0,
                        padding: '0 20px'
                    },
                    {
                        maxHeight: '300px',
                        padding: '0 20px 20px',
                        duration: 0.4,
                        ease: 'power2.out'
                    }
                );
            } else {
                // Closing animation
                answer.classList.remove('active');
                toggle.classList.remove('active');
                toggle.innerHTML = '<i class="fas fa-plus"></i>';
                
                gsap.to(answer, {
                    maxHeight: 0,
                    padding: '0 20px',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        // Add keyboard support
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
        
        // Make it focusable for accessibility
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        const observer = new MutationObserver(() => {
            const isExpanded = answer.classList.contains('active');
            question.setAttribute('aria-expanded', isExpanded);
        });
        
        observer.observe(answer, { attributes: true, attributeFilter: ['class'] });
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
    
    // Newsletter signup functionality
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    
    if (newsletterForm && newsletterInput && newsletterBtn) {
        newsletterBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = newsletterInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success animation
                newsletterBtn.innerHTML = '<i class="fas fa-check"></i>';
                newsletterBtn.style.background = '#4CAF50';
                newsletterInput.value = '';
                newsletterInput.placeholder = 'Thanks for subscribing!';
                
                // Reset after 3 seconds
                setTimeout(() => {
                    newsletterBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                    newsletterBtn.style.background = '';
                    newsletterInput.placeholder = 'Enter your email';
                }, 3000);
                
                // You can add actual newsletter signup logic here
                console.log('Newsletter signup for:', email);
            } else {
                // Show error animation
                newsletterInput.style.borderColor = '#f44336';
                newsletterInput.placeholder = 'Please enter a valid email';
                
                setTimeout(() => {
                    newsletterInput.style.borderColor = '';
                    newsletterInput.placeholder = 'Enter your email';
                }, 2000);
            }
        });
        
        // Allow Enter key to submit
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                newsletterBtn.click();
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});