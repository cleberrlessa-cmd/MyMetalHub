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

    // Cards Stagger (properly triggered individually)
    gsap.utils.toArray(".gsap-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
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

    // Modal Specialist Logic
    const modal = document.getElementById('modal-especialista');
    const modalContent = document.getElementById('modal-content');
    const triggers = document.querySelectorAll('.btn-especialista-trigger');
    const closeBtn = document.getElementById('close-modal');
    const form = document.getElementById('form-especialista');
    
    const titleInput = document.getElementById('modal-title');
    const titleCounter = document.getElementById('title-counter');
    const messageInput = document.getElementById('modal-message');
    const messageCounter = document.getElementById('message-counter');

    function openModal() {
        if (!modal) return;
        modal.classList.remove('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.add('opacity-0', 'pointer-events-none');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        document.body.style.overflow = ''; // restore scrolling
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Character counters
    if (titleInput && titleCounter) {
        titleInput.addEventListener('input', () => {
            titleCounter.textContent = `${titleInput.value.length}/70`;
        });
    }

    if (messageInput && messageCounter) {
        messageInput.addEventListener('input', () => {
            messageCounter.textContent = `${messageInput.value.length}/500`;
        });
    }

    // Mask for Phone Number: +XX (XX) XXXXX-XXXX
    const phoneInput = document.getElementById('modal-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value;
            // Always keep '+' as starting character
            let digits = value.replace(/\D/g, '');
            
            let formatted = '';
            if (digits.length > 0) {
                formatted += '+' + digits.substring(0, 2);
            }
            if (digits.length > 2) {
                formatted += ' (' + digits.substring(2, 4);
            }
            if (digits.length > 4) {
                if (digits.length > 9) {
                    formatted += ') ' + digits.substring(4, 9) + '-' + digits.substring(9, 14);
                } else {
                    formatted += ') ' + digits.substring(4, 9);
                }
            }
            
            e.target.value = formatted;
        });
    }

    // Form submission
    const formContainer = document.getElementById('modal-form-container');
    const successContainer = document.getElementById('modal-success-container');
    const submittedSubjectSpan = document.getElementById('submitted-subject');
    const successCloseBtn = document.getElementById('btn-success-close');
    const submitBtn = document.getElementById('btn-submit-especialista');
    const submitText = document.getElementById('btn-submit-text');
    const submitIcon = document.getElementById('btn-submit-icon');

    function resetModalState() {
        if (formContainer && successContainer) {
            formContainer.classList.remove('hidden');
            successContainer.classList.add('hidden');
        }
        if (form) form.reset();
        if (titleCounter) titleCounter.textContent = '0/70';
        if (messageCounter) messageCounter.textContent = '0/500';
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
        if (submitText) submitText.textContent = 'Enviar Mensagem';
        if (submitIcon) submitIcon.classList.remove('hidden');
    }

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            resetModalState();
            openModal();
        });
    });

    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closeModal);
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleVal = titleInput.value.trim();
            const messageVal = messageInput.value.trim();
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            }
            if (submitText) submitText.textContent = 'Enviando...';
            if (submitIcon) submitIcon.classList.add('hidden');
            
            // Simula o processamento do envio assíncrono (Web3Forms, Formspree, etc.)
            setTimeout(() => {
                if (submittedSubjectSpan) {
                    submittedSubjectSpan.textContent = titleVal;
                }
                
                if (formContainer && successContainer) {
                    formContainer.classList.add('hidden');
                    successContainer.classList.remove('hidden');
                }
            }, 1200);
        });
    }
});
