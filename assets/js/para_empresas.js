document.addEventListener('DOMContentLoaded', () => {
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Animations
    gsap.from(".gsap-hero", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });

    // General Section Fade Ups
    gsap.utils.toArray(".gsap-section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Cards Stagger
    gsap.from(".gsap-card", {
        scrollTrigger: {
            trigger: ".gsap-card",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Steps Stagger
    gsap.from(".gsap-step", {
        scrollTrigger: {
            trigger: ".gsap-step",
            start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // Diferenciais Stagger
    gsap.from(".gsap-dif", {
        scrollTrigger: {
            trigger: ".gsap-dif",
            start: "top 80%",
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });
    
    // Trilhas Animation
    gsap.from(".gsap-trilha", {
        scrollTrigger: {
            trigger: "#trilhas-container",
            start: "top 80%",
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Trilhas Horizontal Scroll Buttons
    const container = document.getElementById('trilhas-container');
    const btnLeft = document.getElementById('scroll-left');
    const btnRight = document.getElementById('scroll-right');

    if (btnRight && container) {
        btnRight.addEventListener('click', () => {
            container.scrollBy({ left: 350, behavior: 'smooth' });
        });
    }
    if (btnLeft && container) {
        btnLeft.addEventListener('click', () => {
            container.scrollBy({ left: -350, behavior: 'smooth' });
        });
    }
});
