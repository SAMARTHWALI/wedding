/**
 * GSAP Animations for Wedding Invitation
 */

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Reveal Animations for Sections ---
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true // Ensure it stays visible after first reveal
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
            clearProps: 'all' // Clear props after animation to prevent interference
        });
    });

    // --- 2. Couple Card Parallax/Hover ---
    const cards = document.querySelectorAll('.couple-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            gsap.to(card.querySelector('img'), {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });

    // --- 3. Parallax Backgrounds ---
    gsap.to('#hero-bg', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        ease: 'none'
    });

    // --- 4. Floating Animation for Specific Elements ---
    gsap.to('.ganesha-container', {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});
