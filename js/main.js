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
 * Show calendar options modal for the wedding event
 * Lets users add the event to Google Calendar (opens directly)
 * or Apple/Outlook Calendar (downloads ICS as fallback)
 * Includes a reminder 1 day before the wedding (April 19th)
 */
function addToCalendar() {
    // --- Build Google Calendar URL ---
    // Wedding: April 20, 2026, 12:29 PM IST (06:59 UTC) to 5:00 PM IST (11:30 UTC)
    const gcalUrl = [
        'https://calendar.google.com/calendar/render?action=TEMPLATE',
        '&text=Wali+Family+Wedding+Ceremony',
        '&dates=20260420T065900Z/20260420T113000Z',
        '&details=Wedding+of+Jagadeesh+%26+Pooja+and+Rakesh+%26+Bharati.+You+are+cordially+invited!',
        '&location=Sri+Thonapinath+Kalyana+Mantapa,+Mahalingpur',
        '&add=',               // opens add-event directly
        '&trp=false'
    ].join('');

    // Show a small modal letting user pick their calendar app
    showCalendarModal(gcalUrl);
}

/**
 * Display a sleek modal with calendar options
 */
function showCalendarModal(gcalUrl) {
    // Remove existing modal if any
    const existing = document.getElementById('cal-modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'cal-modal-overlay';
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.65);
        display:flex;align-items:center;justify-content:center;
        z-index:99999;backdrop-filter:blur(4px);
        animation:calFadeIn 0.25s ease;
    `;

    overlay.innerHTML = `
        <style>
            @keyframes calFadeIn{from{opacity:0}to{opacity:1}}
            @keyframes calSlideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
            #cal-modal{
                background:linear-gradient(135deg,#1a0a00,#3b1a05);
                border:1px solid rgba(212,175,55,0.4);
                border-radius:20px;padding:36px 32px;
                max-width:380px;width:90%;text-align:center;
                box-shadow:0 20px 60px rgba(0,0,0,0.6);
                animation:calSlideUp 0.3s ease;
                font-family:'Cormorant Garamond',serif;
            }
            #cal-modal h3{
                color:#D4AF37;font-size:1.5rem;margin-bottom:6px;
                letter-spacing:1px;
            }
            #cal-modal p{color:rgba(255,255,255,0.7);font-size:0.9rem;margin-bottom:24px;}
            .cal-btn{
                display:flex;align-items:center;justify-content:center;gap:10px;
                width:100%;padding:13px 20px;border-radius:12px;
                font-size:1rem;font-family:inherit;cursor:pointer;
                border:none;margin-bottom:12px;font-weight:600;
                transition:transform 0.2s,box-shadow 0.2s;text-decoration:none;
            }
            .cal-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(0,0,0,0.4);}
            .cal-btn-google{background:#fff;color:#333;}
            .cal-btn-other{background:rgba(212,175,55,0.15);color:#D4AF37;border:1px solid rgba(212,175,55,0.4);}
            .cal-btn-other:hover{background:rgba(212,175,55,0.25);}
            .cal-close{
                background:none;border:none;color:rgba(255,255,255,0.4);
                font-size:0.85rem;cursor:pointer;margin-top:4px;
                font-family:inherit;padding:6px 12px;border-radius:8px;
                transition:color 0.2s;
            }
            .cal-close:hover{color:rgba(255,255,255,0.8);}
            .cal-note{font-size:0.75rem;color:rgba(255,255,255,0.4);margin-top:10px;}
        </style>
        <div id="cal-modal">
            <h3>📅 Save the Date</h3>
            <p>Add the wedding to your calendar with a reminder the day before!</p>

            <a class="cal-btn cal-btn-google" href="${gcalUrl}" target="_blank" rel="noopener" id="cal-google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google Calendar
            </a>

            <button class="cal-btn cal-btn-other" id="cal-ics-btn">
                🗓️ Apple / Outlook Calendar
            </button>

            <div class="cal-note">⏰ Reminder set for 1 day before the wedding</div>
            <br>
            <button class="cal-close" id="cal-dismiss-btn">Dismiss</button>
        </div>
    `;

    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });

    // Dismiss button
    document.getElementById('cal-dismiss-btn').addEventListener('click', () => overlay.remove());

    // Close modal when Google Calendar link is clicked
    document.getElementById('cal-google-btn').addEventListener('click', () => {
        setTimeout(() => overlay.remove(), 300);
    });

    // ICS download for Apple/Outlook
    document.getElementById('cal-ics-btn').addEventListener('click', () => {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Wali Family//Wedding Invitation//EN',
            'BEGIN:VEVENT',
            'UID:wali-wedding-2026@namma-maduve.in',
            'DTSTAMP:20260409T000000Z',
            'DTSTART:20260420T065900Z',
            'DTEND:20260420T113000Z',
            'SUMMARY:Wali Family Wedding Ceremony',
            'DESCRIPTION:Wedding of Jagadeesh & Pooja and Rakesh & Bharati.',
            'LOCATION:Sri Thonapinath Kalyana Mantapa\\, Mahalingpur',
            'BEGIN:VALARM',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder: Wali Family Wedding Ceremony Tomorrow!',
            'TRIGGER:-P1D',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Wali_Family_Wedding.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => overlay.remove(), 300);
    });
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
