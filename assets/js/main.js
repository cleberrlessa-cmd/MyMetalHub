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

            // Force play video to prevent autoplay restrictions
            const heroVideo = document.querySelector('video.gsap-video');
            if (heroVideo) {
                // Ensure video is properly muted to allow autoplay
                heroVideo.muted = true;
                heroVideo.play().catch(e => console.log('Autoplay prevented:', e));

                // Mobile fallback: force play on first interaction if blocked
                document.body.addEventListener('touchstart', function() {
                    if (heroVideo.paused) {
                        heroVideo.play().catch(e => {});
                    }
                }, { once: true });
            }

            // Handle Back/Forward Cache (bfcache) to restart animations on return
            window.addEventListener('pageshow', function (event) {
                if (event.persisted) {
                    window.location.reload();
                }
            });

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
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                const header = document.getElementById('header');

                // Toggle padding, background, and shadow based on scroll position
                if (currentScroll > 20) {
                    header.classList.add('py-2', 'bg-[#050505]/90', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'border-white/10');
                    header.classList.remove('py-4', 'bg-[#050505]/70', 'border-white/5');
                } else {
                    header.classList.add('py-4', 'bg-[#050505]/70', 'border-white/5');
                    header.classList.remove('py-2', 'bg-[#050505]/90', 'shadow-[0_4px_30px_rgba(0,0,0,0.5)]', 'border-white/10');
                }
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

        // ==========================================
        // PREMIUN COOKIE CONSENT BANNER
        // ==========================================
        (function() {
            if (localStorage.getItem('mymetalhub-cookie-consent')) {
                return;
            }

            function initBanner() {
                if (document.getElementById('cookie-banner')) return;

                const css = `
                    #cookie-banner {
                        position: fixed;
                        bottom: 24px;
                        right: 24px;
                        z-index: 9999;
                        max-width: 420px;
                        background: rgba(10, 10, 10, 0.95);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 20px;
                        padding: 24px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(249, 115, 22, 0.1);
                        transform: translateY(100px);
                        opacity: 0;
                        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                        font-family: 'Inter', sans-serif;
                    }
                    #cookie-banner.show {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    #cookie-banner h4 {
                        color: #ffffff;
                        font-family: 'Bricolage Grotesque', sans-serif;
                        font-size: 18px;
                        font-weight: 500;
                        margin: 0 0 8px 0;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    #cookie-banner p {
                        color: #a3a3a3;
                        font-size: 13px;
                        line-height: 1.6;
                        margin: 0 0 18px 0;
                        font-weight: 300;
                    }
                    #cookie-banner .cookie-actions {
                        display: flex;
                        gap: 12px;
                    }
                    #cookie-banner button {
                        cursor: pointer;
                        padding: 10px 18px;
                        border-radius: 12px;
                        font-size: 13px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    #cookie-banner .btn-accept {
                        background: linear-gradient(135deg, #f97316, #ea580c);
                        color: #ffffff;
                        border: none;
                        flex-grow: 2;
                        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
                    }
                    #cookie-banner .btn-accept:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.4);
                        filter: brightness(1.1);
                    }
                    #cookie-banner .btn-reject {
                        background: rgba(255, 255, 255, 0.05);
                        color: #e5e5e5;
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        flex-grow: 1;
                    }
                    #cookie-banner .btn-reject:hover {
                        background: rgba(255, 255, 255, 0.1);
                        color: #ffffff;
                    }
                    @media (max-width: 480px) {
                        #cookie-banner {
                            bottom: 16px;
                            left: 16px;
                            right: 16px;
                            max-width: none;
                            padding: 20px;
                        }
                    }
                `;

                // Inject CSS dynamically
                const styleEl = document.createElement('style');
                styleEl.innerHTML = css;
                document.head.appendChild(styleEl);

                // Create banner element
                const banner = document.createElement('div');
                banner.id = 'cookie-banner';
                banner.innerHTML = `
                    <h4>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z"/>
                            <path d="M8.5 8.5v.01"/>
                            <path d="M16.5 15.5v.01"/>
                            <path d="M12 18v.01"/>
                            <path d="M11 13v.01"/>
                            <path d="M7.5 14.5v.01"/>
                        </svg>
                        Controle de Cookies
                    </h4>
                    <p>Utilizamos cookies essenciais para otimizar sua experiência e analisar nosso tráfego em conformidade com as melhores práticas de privacidade e proteção de dados.</p>
                    <div class="cookie-actions">
                        <button class="btn-reject" id="btn-cookie-reject">Recusar</button>
                        <button class="btn-accept" id="btn-cookie-accept">Aceitar Todos</button>
                    </div>
                `;

                document.body.appendChild(banner);

                // Show banner with a smooth delay
                setTimeout(() => {
                    banner.classList.add('show');
                }, 1500);

                // Event listeners
                document.getElementById('btn-cookie-accept').addEventListener('click', () => {
                    localStorage.setItem('mymetalhub-cookie-consent', 'accepted');
                    banner.classList.remove('show');
                    setTimeout(() => banner.remove(), 600);
                });

                document.getElementById('btn-cookie-reject').addEventListener('click', () => {
                    localStorage.setItem('mymetalhub-cookie-consent', 'rejected');
                    banner.classList.remove('show');
                    setTimeout(() => banner.remove(), 600);
                });
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initBanner);
            } else {
                initBanner();
            }
        })();