document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const scrollObserverOptions = {
        threshold: 0.2,
        rootMargin: '-150px 0px -50px 0px'
    };

    // Special options for about section
    const aboutObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Adjusted rootMargin for better mobile support
    };

    const animatedSections = document.querySelectorAll('.programs, .testimonials, .contact');
    const aboutSection = document.querySelector('.about');
    const animatedContent = document.querySelectorAll('.about-content, .programs-grid, .testimonials-grid, .contact-content');
    const animatedCards = document.querySelectorAll('.program-card, .testimonial-card');
    const animatedTitles = document.querySelectorAll('h2');

    // Create observers for different elements
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    // Special observer for about section
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, aboutObserverOptions);

    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                contentObserver.unobserve(entry.target);
            }
        });
    }, scrollObserverOptions);

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, { ...scrollObserverOptions, threshold: 0.1 });

    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                titleObserver.unobserve(entry.target);
            }
        });
    }, { ...scrollObserverOptions, threshold: 0.5 });

    // Observe elements
    animatedSections.forEach(section => sectionObserver.observe(section));
    if (aboutSection) {
        aboutObserver.observe(aboutSection);

        // FIX: Force visible if already in viewport on load (especially mobile)
        if (aboutSection.getBoundingClientRect().top < window.innerHeight) {
            aboutSection.classList.add('visible');
        }
    }
    animatedContent.forEach(content => contentObserver.observe(content));
    animatedCards.forEach(card => cardObserver.observe(card));
    animatedTitles.forEach(title => titleObserver.observe(title));

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Screenshot hover effect
    const screenshots = document.querySelectorAll('.screenshot img');
    screenshots.forEach(screenshot => {
        screenshot.addEventListener('mouseenter', () => {
            screenshot.style.transform = 'scale(1.05)';
        });

        screenshot.addEventListener('mouseleave', () => {
            screenshot.style.transform = 'scale(1)';
        });
    });

    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });

    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.remove('open');
            }
        });
    }

    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        });
    }

    // Animate numbers when in view
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Animate statistics when they come into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.getAttribute('data-value');
                animateValue(element, 0, finalValue, 2000);
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        statsObserver.observe(stat);
    });

    // Ensure the toggle menu works for both mobile and PC
    function toggleMenu() {
        console.log("Toggle menu button clicked"); // Debugging log
        const menu = document.getElementById("mobileMenu");
        menu.classList.toggle("open");
    }

    document.addEventListener('click', function (e) {
        const menu = document.getElementById("mobileMenu");
        const button = document.querySelector('.mobile-menu-button');
        if (!menu.contains(e.target) && !button.contains(e.target)) {
            menu.classList.remove('open');
        }
    });

    document.getElementById("next-button").addEventListener("click", function () {
        document.getElementById("step-1").style.display = "none";
        document.getElementById("step-2").style.display = "block";
    });

    document.getElementById("back-button").addEventListener("click", function () {
        document.getElementById("step-2").style.display = "none";
        document.getElementById("step-1").style.display = "block";
    });
    

});

document.addEventListener("DOMContentLoaded", function () {
    window.analyzeQuiz = function () {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const age = parseInt(document.getElementById('age').value);
        const goal = document.querySelector('input[name="goal"]:checked').value;
        const frequency = document.querySelector('input[name="frequency"]:checked').value;
        const type = document.querySelector('input[name="type"]:checked').value;

        let result = "";

        if (goal === "strength") {
            result = "Polecamy nasz program 'Budowanie Masy Mięśniowej', zaprojektowany, aby pomóc Ci zyskać siłę i masę.";
        } else if (goal === "weight-loss") {
            result = "Nasz program 'Utrata Wagi i Modelowanie Sylwetki' jest idealny do zrzucenia tłuszczu i wyrzeźbienia ciała.";
        } else if (goal === "endurance") {
            result = "Program 'Wytrzymałość i Kondycja' pomoże Ci poprawić wydolność sercowo-naczyniową.";
        }

        if (gender === "woman" && age < 30) {
            result += " Jako młoda kobieta możesz również polubić nasz program 'Siła i Modelowanie Sylwetki'.";
        } else if (gender === "man" && age < 30) {
            result += " Jako młody mężczyzna nasz program 'Zaawansowany Przyrost Masy Mięśniowej' może być świetnym wyborem.";
        } else if (age >= 30) {
            result += " Dla osób powyżej 30 roku życia zalecamy skupienie się na zrównoważonej kondycji z naszym programem 'Zdrowy Styl Życia'.";
        }

        const bmi = weight / ((height / 100) ** 2);
        if (bmi > 25) {
            result += " Dodatkowo, włączenie naszego programu 'Kontrola Wagi' może pomóc Ci osiągnąć swoje cele.";
        } else if (bmi < 18.5) {
            result += " Możesz skorzystać z naszego programu 'Zdrowe Przybieranie na Wadze', aby zbudować masę mięśniową i siłę.";
        }

        if (frequency === "3") {
            result += " Przy treningu 1-3 dni w tygodniu nasz program 'Szybkie Treningi' jest idealny dla Twojego harmonogramu.";
        } else if (frequency === "5") {
            result += " Trenujesz 4-5 dni w tygodniu? Wypróbuj nasz program 'Zrównoważona Kondycja' dla optymalnych wyników.";
        } else if (frequency === "7") {
            result += " Przy treningu 6-7 dni w tygodniu nasz program 'Intensywny Trening' jest dla Ciebie idealny.";
        }

        if (type === "weights") {
            result += " Jeśli preferujesz trening siłowy, nasz program 'Siła i Kondycja' będzie doskonałym wyborem.";
        } else if (type === "cardio") {
            result += " Jako entuzjasta cardio nasz program 'Wytrzymałość i Cardio' jest dostosowany do Twoich potrzeb.";
        } else if (type === "mixed") {
            result += " Dla połączenia treningu siłowego i cardio nasz program 'Trening Hybrydowy' oferuje najlepsze z obu światów.";
        }

        document.getElementById('quiz-form').style.display = 'none';
        document.getElementById('quiz-result').innerText = result;
        document.getElementById('quiz-result').style.display = 'block';
    };
});
