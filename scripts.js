//Updated JavaScript (scripts.js)

//javascript
document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    const themeText = document.querySelector('.theme-text');
    
    // Check for saved theme preference or use preferred color scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        themeText.textContent = 'Light Mode';
    }
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeText.textContent = 'Light Mode';
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            themeText.textContent = 'Dark Mode';
            localStorage.setItem('theme', 'light');
        }
    });

    // Terminal Typing Effect
    const terminalTexts = [
        "whoami",
        "ls -la ~/projects",
        "cat about.txt",
        "ping -c 3 google.com",
        "nmap -sV localhost"
    ];
    const typingElement = document.querySelector('.typing-text');
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentText = terminalTexts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            isEnd = false;
            textIndex = (textIndex + 1) % terminalTexts.length;
        }

        const speed = isDeleting ? 50 : isEnd ? 2000 : 100;
        setTimeout(type, speed);
    }

    // Start typing effect after a delay
    setTimeout(type, 1000);

    // Smooth Scroll for Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update URL without page reload
            history.pushState(null, null, targetId);
        });
    });

    // Animate stats counting
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                stat.textContent = Math.floor(current);
                
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                }
            }, 16);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.stats-container, .project-card, .ctf-event').forEach(el => {
        observer.observe(el);
    });

    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    const charCount = document.getElementById('charCount');
    const messageInput = document.getElementById('message');
    
    // Character count for message
    messageInput.addEventListener('input', function() {
        charCount.textContent = this.value.length;
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formResponse = document.getElementById('formResponse');
        
        // Honeypot validation
        if (document.getElementById('website').value !== '') {
            formResponse.textContent = 'Invalid submission detected';
            formResponse.classList.add('error');
            formResponse.style.display = 'block';
            return;
        }
        
        // Simulate form submission
        formResponse.textContent = 'Thank you for your message! I will get back to you soon.';
        formResponse.classList.add('success');
        formResponse.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        charCount.textContent = '0';
        
        // Hide response after 5 seconds
        setTimeout(() => {
            formResponse.style.display = 'none';
            formResponse.classList.remove('success');
        }, 5000);
    });

    // Add current year to footer
    document.querySelector('.footer-copyright p').textContent = 
        `© ${new Date().getFullYear()} ROHIT RAJPUT. All rights reserved.`;
});