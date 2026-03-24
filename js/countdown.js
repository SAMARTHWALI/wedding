/**
 * Countdown Timer for Wedding Invitation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Set the wedding date (April 20, 2026)
    const weddingDate = new Date('April 20, 2026 12:29:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        document.getElementById('days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<h3 class='font-script text-4xl text-gold'>Today is the Big Day!</h3>";
        }
    };

    // Initial call
    updateCountdown();
    // Update every second
    const timerInterval = setInterval(updateCountdown, 1000);
});
