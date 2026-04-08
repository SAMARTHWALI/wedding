/**
 * i18n handler for English/Kannada Toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-switch');
    const currentLang = localStorage.getItem('wedding-lang') || 'en';

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
        const translatable = document.querySelectorAll('[data-en]');
        
        translatable.forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                // Check if we should use innerHTML or textContent
                // Use innerHTML only if it contains <br> or other tags
                if (translation.includes('<')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update body class for font switching
        document.body.classList.remove('lang-en', 'lang-kn');
        document.body.classList.add(`lang-${lang}`);
    }
});
