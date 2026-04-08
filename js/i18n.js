/**
 * i18n handler for English/Kannada Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-switch');
    const music = document.getElementById('bg-music');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    const musicTracks = {
        'en': 'assets/music/english.mp3',
        'kn': 'assets/music/Akashakke Chappara Haaki-KannadaMaza.Com.mp3'
    };

    const currentLang = localStorage.getItem('wedding-lang') || 'en';

    // --- Music Global Controls ---
    window.initMusic = function() {
        const lang = localStorage.getItem('wedding-lang') || 'en';
        music.src = musicTracks[lang];
        music.currentTime = lang === 'kn' ? 21 : 0; // Skip intro for Kannada
        music.volume = 0.35;
        
        music.play().then(() => {
            isPlaying = true;
            musicIcon.className = 'fa-solid fa-pause text-sm';
        }).catch(err => {
            console.log("Audio play blocked:", err);
            isPlaying = false;
        });
    };

    window.toggleMusic = function() {
        if (isPlaying) {
            music.pause();
            isPlaying = false;
            musicIcon.className = 'fa-solid fa-music text-sm';
        } else {
            music.play();
            isPlaying = true;
            musicIcon.className = 'fa-solid fa-pause text-sm';
        }
    };

    // Set initial state
    if (currentLang === 'kn') {
        langToggle.checked = true;
        updateLanguage('kn');
    } else {
        langToggle.checked = false;
        updateLanguage('en');
    }

    // Toggle listener
    langToggle.addEventListener('change', (e) => {
        const lang = e.target.checked ? 'kn' : 'en';
        localStorage.setItem('wedding-lang', lang);
        updateLanguage(lang);
    });

    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        
        // Update Music Track if playing
        if (music) {
            const wasPlaying = isPlaying;
            music.src = musicTracks[lang];
            music.currentTime = lang === 'kn' ? 21 : 0;
            if (wasPlaying) {
                music.play();
            }
        }

        const translatable = document.querySelectorAll('[data-en]');
        translatable.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        document.body.classList.remove('lang-en', 'lang-kn');
        document.body.classList.add(`lang-${lang}`);
    }
});
