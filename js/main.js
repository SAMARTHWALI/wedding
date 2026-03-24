/**
 * Main JS for Wedding Invitation
 * Handles Loader, Music, and General Setup
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Loader Logic ---
    const loader = document.getElementById('loader');
    const progress = document.getElementById('loader-progress');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('opacity-0');
                setTimeout(() => {
                    loader.style.display = 'none';
                    startHeroAnimation();
                }, 800);
            }, 500);
        } else {
            width += Math.random() * 15;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 150);

    // --- 2. Background Music ---
    const music = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>`;
        } else {
            music.play().catch(err => console.log("Audio play blocked by browser."));
            musicBtn.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>`;
        }
        isPlaying = !isPlaying;
    });

    // --- 3. Navbar Scroll Effect ---
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 4. Petals Generation ---
    const petalsContainer = document.getElementById('petals-container');
    const petalCount = 30;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random styles for variety
        const size = Math.random() * 15 + 10 + 'px';
        petal.style.width = size;
        petal.style.height = size;
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = Math.random() * 5 + 5 + 's';
        petal.style.animationDelay = Math.random() * 10 + 's';
        
        // Randomly set colors
        const colors = ['#ffb7c5', '#D4AF37', '#ffffff', '#e60000'];
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        petalsContainer.appendChild(petal);
    }
});

/**
 * Triggered after loader finishes
 */
function startHeroAnimation() {
    gsap.to('#hero-content', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out'
    });

    gsap.from('.ganesha-container', {
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: 'back.out(1.7)',
        delay: 0.2
    });

    gsap.from('#hero-bg img', {
        scale: 1.2,
        duration: 10,
        ease: 'none',
        repeat: -1,
        yoyo: true
    });
}
