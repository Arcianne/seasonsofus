const images = document.querySelectorAll('.zoom-fade');

    images.forEach((image) => {
        image.addEventListener('click', (event) => {
            event.preventDefault();

            const nextPageLink = image.parentElement.href;
            image.classList.add('zoomed');

            document.body.classList.add('fade-out');
            setTimeout(() => {
                window.location.href = nextPageLink;
            }, 1000);
        });
    });

    const audio = document.getElementById("bg-audio");
    const muteBtn = document.getElementById("mute-btn");

    audio.volume = 0.5; 

    muteBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteBtn.textContent = audio.muted ? "♪ ▶" : "♪ ❚❚";
    });