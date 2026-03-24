/**
 * RSVP Form Handling for Wedding Invitation
 */

document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvp-form');
    const rsvpSuccess = document.getElementById('rsvp-success');

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const attending = document.querySelector('input[name="attending"]:checked').value;

            // Simple validation check
            if (name.trim() === '' || phone.trim() === '') {
                alert('Please fill in all required fields.');
                return;
            }

            // Animation for transition
            gsap.to(rsvpForm, {
                opacity: 0,
                y: -20,
                duration: 0.5,
                onComplete: () => {
                    rsvpForm.classList.add('hidden');
                    rsvpSuccess.classList.remove('hidden');
                    gsap.fromTo(rsvpSuccess, 
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' }
                    );
                }
            });

            // Log data (In a real app, you would send this to a server)
            console.log('RSVP Received:', { name, phone, attending });
        });
    }

    // Input focus animations
    const inputs = document.querySelectorAll('input[type="text"], input[type="tel"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.previousElementSibling, {
                color: '#D4AF37',
                letterSpacing: '0.2em',
                duration: 0.3
            });
        });

        input.addEventListener('blur', () => {
            if (input.value === '') {
                gsap.to(input.previousElementSibling, {
                    color: 'rgba(212, 175, 55, 0.6)',
                    letterSpacing: '0.1em',
                    duration: 0.3
                });
            }
        });
    });
});
