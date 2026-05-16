// Initialize Smooth Scrolling
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // GSAP Animations
        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            // Initial setup
            gsap.set('.gsap-reveal', { autoAlpha: 0, y: 40, filter: 'blur(10px)' });
            gsap.set('.gsap-nav-item', { autoAlpha: 0, y: -20 });
            gsap.set('.gsap-video', { scale: 1.2 });

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            // Nav Animation
            tl.to('.gsap-nav-item', {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                stagger: 0.1,
                delay: 0.2
            })
                // Hero Content Stagger
                .to('.hero-stagger', {
                    y: 0,
                    autoAlpha: 1,
                    filter: 'blur(0px)',
                    duration: 1,
                    stagger: 0.15,
                }, "-=0.4")
                // Video Container Fade In
                .to('.gsap-video-container', {
                    opacity: 1,
                    duration: 1.5,
                    ease: 'power2.inOut'
                }, "-=1")
                // Video Subtle Zoom Out
                .to('.gsap-video', {
                    scale: 1,
                    duration: 2.5,
                    ease: 'power2.out'
                }, "-=1.5");

            // Header Scroll Effect
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.getElementById('header');

                if (currentScroll > 50) {
                    header.classList.add('py-2');
                    header.classList.remove('py-4');
                } else {
                    header.classList.add('py-4');
                    header.classList.remove('py-2');
                }
                lastScroll = currentScroll;
            });

            // Section 2 (Sobre o Curso) Scroll Animations
            const sec2Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#sobre-o-curso",
                    start: "top 75%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            sec2Tl.to(".sec2-stagger", 
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.5, stagger: 0.4, ease: "power2.out" }
            )
            .fromTo(".gsap-image-reveal",
                { x: -100, opacity: 0, scale: 0.95 },
                { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
                "-=1.2"
            )
            .fromTo(".gsap-glass-card",
                { x: 50, opacity: 0, filter: 'blur(10px)' },
                { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1, ease: "power3.out" },
                "-=0.8"
            );

            // Section 2.5 (Agitação) Animations
            const agitacaoTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#agitacao",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            agitacaoTl.to("#agitacao .gsap-reveal",
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: "power3.out" }
            );

            // Section 3 (VR Imersão) Animations
            // Entry Timeline
            const sec3Tl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#imersao-vr",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            sec3Tl.to(".gsap-vr-stagger", 
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.2, ease: "power3.out" }
            );

            const vrImgTl = gsap.timeline({
                scrollTrigger: { trigger: "#imersao-vr", start: "top 75%", toggleActions: "play none none reverse" }
            });

            vrImgTl.fromTo(".gsap-vr-image",
                { x: 100, opacity: 0, scale: 0.8, rotation: -10 },
                { x: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.5, ease: "back.out(1.2)" }
            )
            .fromTo(".gsap-vr-scale",
                { scale: 1.5 },
                { scale: 1.0, duration: 2.5, ease: "power2.out" },
                "-=1.5"
            );

            // Exit Animation (Scrubbing smoothly fades out the section)
            gsap.to(".gsap-vr-exit", {
                y: -150,
                opacity: 0,
                scale: 0.95,
                filter: 'blur(10px)',
                ease: "none",
                scrollTrigger: {
                    trigger: "#imersao-vr",
                    start: "bottom 80%",
                    end: "bottom 10%",
                    scrub: 1
                }
            });

            // Section 3.5 (Quem Ensina / Autoridade) Animations
            const autoridadeTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#quem-ensina",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            autoridadeTl.fromTo(".gsap-autoridade-stagger",
                { y: 50, autoAlpha: 0, filter: 'blur(8px)' },
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, stagger: 0.15, ease: "power3.out" }
            );

            // Section 4 (Depoimentos) Animations
            gsap.fromTo(".gsap-dep-header", 
                { y: 60, opacity: 0, filter: 'blur(8px)' }, 
                { 
                    y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2, ease: "power3.out",
                    scrollTrigger: { trigger: "#depoimentos", start: "top 80%", toggleActions: "play none none reverse" }
                }
            );

            // Section 5 (App Exclusivo) Animations
            const appTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#app-exclusivo",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            appTl.fromTo(".gsap-app-stagger",
                { y: 50, autoAlpha: 0, filter: 'blur(8px)' },
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: "power3.out" }
            )
            .fromTo(".gsap-app-mockup",
                { y: 80, autoAlpha: 0, scale: 0.95, filter: 'blur(10px)' },
                { y: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" },
                "-=0.6"
            );

            // Section 6 (E-Books) Animations
            const ebookTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#e-books",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            ebookTl.fromTo(".gsap-ebook-stagger",
                { y: 50, autoAlpha: 0, filter: 'blur(8px)' },
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: "power3.out" }
            )
            .fromTo(".gsap-ebook-mockup",
                { x: 100, autoAlpha: 0, filter: 'blur(10px)' },
                { x: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" },
                "-=0.6"
            );

            // PDF Scroll Scrub
            gsap.to(".gsap-pdf-scroll", {
                y: "-66.66%",
                ease: "none",
                scrollTrigger: {
                    trigger: "#e-books",
                    start: "top 20%",
                    end: "bottom 100%",
                    scrub: 1
                }
            });

            // Section 7 (Comunidade) Animations
            const comTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#comunidade",
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            comTl.fromTo(".gsap-com-stagger",
                { y: 50, autoAlpha: 0, filter: 'blur(8px)' },
                { y: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 1, stagger: 0.2, ease: "power3.out" }
            )
            .fromTo(".gsap-com-mockup",
                { y: 80, autoAlpha: 0, scale: 0.95, filter: 'blur(10px)' },
                { y: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 1.5, ease: "power3.out" },
                "-=0.6"
            );

            // FAQ Accordion Logic
            const faqItems = document.querySelectorAll('.faq-item');
            if (faqItems.length > 0) {
                faqItems.forEach(item => {
                    const btn = item.querySelector('button');
                    const content = item.querySelector('.faq-content');
                    const icon = item.querySelector('.icon-plus');
                    
                    if (btn && content && icon) {
                        btn.addEventListener('click', () => {
                            const isOpen = content.style.gridTemplateRows === '1fr';
                            
                            // Close all
                            faqItems.forEach(otherItem => {
                                const otherContent = otherItem.querySelector('.faq-content');
                                const otherIcon = otherItem.querySelector('.icon-plus');
                                if (otherContent) otherContent.style.gridTemplateRows = '0fr';
                                if (otherIcon) otherIcon.classList.remove('rotate-45');
                                otherItem.classList.remove('border-orange-500/50', 'electric-card');
                                otherItem.classList.add('border-white/5');
                            });

                            // Toggle current
                            if (!isOpen) {
                                content.style.gridTemplateRows = '1fr';
                                icon.classList.add('rotate-45');
                                item.classList.remove('border-white/5');
                                item.classList.add('border-orange-500/50', 'electric-card');
                            }
                        });
                    }
                });
            }

            // Galeria de Professores Nav
            const galleryProf = document.getElementById('gallery-professores');
            const btnPrevProf = document.getElementById('btn-prev-prof');
            const btnNextProf = document.getElementById('btn-next-prof');

            if (galleryProf && btnPrevProf && btnNextProf) {
                // Largura do card + gap (aproximado)
                const scrollAmount = window.innerWidth > 768 ? 350 + 24 : window.innerWidth * 0.8 + 24; 
                
                btnPrevProf.addEventListener('click', () => {
                    galleryProf.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                });
                
                btnNextProf.addEventListener('click', () => {
                    galleryProf.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                });

                // Custom Progress Bar Logic
                const scrollThumb = document.getElementById('gallery-scrollbar-thumb');
                if (scrollThumb) {
                    const updateThumb = () => {
                        const scrollLeft = galleryProf.scrollLeft;
                        const maxScroll = galleryProf.scrollWidth - galleryProf.clientWidth;
                        
                        if (maxScroll > 0) {
                            const scrollPercentage = scrollLeft / maxScroll;
                            // Width is roughly based on the visible ratio
                            const thumbWidthRatio = galleryProf.clientWidth / galleryProf.scrollWidth;
                            const thumbWidthPercent = Math.max(thumbWidthRatio * 100, 15); // min 15% width
                            
                            scrollThumb.style.width = `${thumbWidthPercent}%`;
                            
                            const maxThumbMove = 100 - thumbWidthPercent;
                            const thumbPosition = scrollPercentage * maxThumbMove;
                            scrollThumb.style.left = `${thumbPosition}%`;
                        } else {
                            scrollThumb.style.width = '100%';
                            scrollThumb.style.left = '0%';
                        }
                    };

                    galleryProf.addEventListener('scroll', updateThumb);
                    window.addEventListener('resize', updateThumb);
                    // Initial update slightly delayed to ensure DOM is fully rendered
                    setTimeout(updateThumb, 100);
                }
            }
        });