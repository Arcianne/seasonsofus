// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Falling leaves effect 🍂 using images
function createLeaf() {
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');

    // pick random leaf image
    const images = [
        "assets/autumn/leaves/leaf1.png",
        "assets/autumn/leaves/leaf2.png",
        "assets/autumn/leaves/leaf3.png",
        "assets/autumn/leaves/leaf4.png",
        "assets/autumn/leaves/leaf5.png",
        "assets/autumn/leaves/leaf6.png",
        "assets/autumn/leaves/leaf7.png"
    ];
    
    leaf.src = images[Math.floor(Math.random() * images.length)];
    
    // random position and size
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = 5 + Math.random() * 5 + 's'; // 5–10s
    leaf.style.width = 20 + Math.random() * 30 + 'px'; // 20–50px
    
    document.getElementById('leaves').appendChild(leaf);
    
    // remove after fall
    setTimeout(() => leaf.remove(), 10000);
}

// create leaves continuously
setInterval(createLeaf, 300);