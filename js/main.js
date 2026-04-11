/**
 * Main JS for Wedding Invitation
 * Handles Loader, Music, and General Setup
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Loader Logic ---
    const loader = document.getElementById('loader');
    const progress = document.getElementById('loader-progress');
    const loaderBar = document.getElementById('loader-bar');
    const loaderStatus = document.getElementById('loader-status');
    const enterBtn = document.getElementById('enter-btn');
    let width = 0;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            
            // Transition from progress bar to Enter button
            setTimeout(() => {
                loaderBar.classList.add('opacity-0');
                loaderStatus.classList.add('opacity-0');
                
                setTimeout(() => {
                    loaderBar.style.display = 'none';
                    loaderStatus.style.display = 'none';
                    
                    enterBtn.classList.remove('hidden');
                    // Force reflow for transition
                    enterBtn.offsetHeight; 
                    enterBtn.classList.add('show');
                }, 500);
            }, 500);
        } else {
            width += Math.random() * 20;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 150);

    // --- 2. Enter Button Click ---
    enterBtn.addEventListener('click', () => {
        // Start Music (via i18n handler which knows the track)
        if (window.initMusic) window.initMusic();

        // Reveal Site
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.style.display = 'none';
            startHeroAnimation();
        }, 800);
    });

    // --- 2. Manual Music Toggle (Consolidated) ---
    const musicBtn = document.getElementById('music-toggle');
    musicBtn.addEventListener('click', () => {
        if (window.toggleMusic) window.toggleMusic();
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

/**
 * Generate and download an ICS file for the wedding event
 * Includes a reminder 1 day before (April 19th)
 */
function downloadICS() {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wali Family//Wedding Invitation//EN
BEGIN:VEVENT
UID:wali-wedding-2026@namma-maduve.in
DTSTAMP:20260409T000000Z
DTSTART:20260420T065900Z
DTEND:20260420T113000Z
SUMMARY:Wali Family Wedding Ceremony
DESCRIPTION:Wedding of Jagadeesh & Pooja and Rakesh & Bharati.
LOCATION:Sri Thonapinath Kalyana Mantapa\\, Mahalingpur
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: Wali Family Wedding Ceremony Tomorrow
TRIGGER:-P1D
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Wali_Family_Wedding.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

/**
 * Switch Gallery between couples
 * @param {string} coupleId - 'couple1' or 'couple2'
 */
function switchGallery(coupleId) {
    const panels = document.querySelectorAll('.gallery-panel');
    const tabs = document.querySelectorAll('.gallery-tab');
    
    // Hide all panels
    panels.forEach(panel => panel.classList.add('hidden'));
    
    // Show selected panel
    const selectedPanel = document.getElementById(`gallery-${coupleId}`);
    if (selectedPanel) {
        selectedPanel.classList.remove('hidden');
    }
    
    // Update tabs
    tabs.forEach(tab => tab.classList.remove('active-tab'));
    
    const activeTab = coupleId === 'couple1' ? document.getElementById('gallery-tab-1') : document.getElementById('gallery-tab-2');
    if (activeTab) {
        activeTab.classList.add('active-tab');
    }
}
