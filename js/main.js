const images = document.querySelectorAll('.zoom-fade');
const audio = document.getElementById("bg-audio");
const muteBtn = document.getElementById("mute-btn");

// Initialize audio
audio.volume = 0.5;

// Save audio state before leaving page
window.addEventListener('beforeunload', function() {
    localStorage.setItem('audioCurrentTime', audio.currentTime);
    localStorage.setItem('audioIsPlaying', !audio.paused);
    localStorage.setItem('audioMuted', audio.muted);
});

// Restore audio state when page loads
window.addEventListener('load', function() {
    const savedTime = localStorage.getItem('audioCurrentTime');
    const wasPlaying = localStorage.getItem('audioIsPlaying') === 'true';
    const wasMuted = localStorage.getItem('audioMuted') === 'true';
    
    if (savedTime) {
        audio.currentTime = parseFloat(savedTime);
    }
    
    audio.muted = wasMuted;
    muteBtn.textContent = audio.muted ? "♪ ▶" : "♪ ❚❚";
    
    if (wasPlaying && !audio.muted) {
        audio.play().catch(error => {
            console.log("Autoplay prevented - user interaction required");
        });
    }
});

// Image click handlers with smooth audio transition
images.forEach((image) => {
    image.addEventListener('click', (event) => {
        event.preventDefault();

        const nextPageLink = image.parentElement.href;
        
        // Smooth fade out
        fadeAudio(audio, 0, 300);
        
        image.classList.add('zoomed');
        document.body.classList.add('fade-out');
        
        setTimeout(() => {
            window.location.href = nextPageLink;
        }, 1000);
    });
});

// Mute button
muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "♪ ▶" : "♪ ❚❚";
    localStorage.setItem('audioMuted', audio.muted);
    
    // If unmuting and audio isn't playing, start playback
    if (!audio.muted && audio.paused) {
        audio.play().catch(error => {
            console.log("Playback failed");
        });
    }
});

// Audio fade function
function fadeAudio(audioElement, targetVolume, duration) {
    const initialVolume = audioElement.volume;
    const delta = targetVolume - initialVolume;
    const startTime = performance.now();
    
    function fadeStep() {
        const currentTime = performance.now();
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        audioElement.volume = initialVolume + delta * progress;
        
        if (progress < 1) {
            requestAnimationFrame(fadeStep);
        }
    }
    
    fadeStep();
}

// Add this to your existing code
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Reduce volume when in background tab
        audio.volume = 0;
    } else {
        // Restore volume when tab is active
        audio.volume = 0.5;
    }
});