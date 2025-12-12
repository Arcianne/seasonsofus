/* ===== Smooth Scroll for Navbar ===== */
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

/* ===== Falling Leaves ===== */
function createLeaf() {
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');

    const images = [
        "assets/leaves/leaf1.png",
        "assets/leaves/leaf2.png",
        "assets/leaves/leaf3.png",
        "assets/leaves/leaf4.png",
        "assets/leaves/leaf5.png",
        "assets/leaves/leaf6.png",
        "assets/leaves/leaf7.png",
    ];
    
    leaf.src = images[Math.floor(Math.random() * images.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    leaf.style.animationDuration = 5 + Math.random() * 5 + 's';
    leaf.style.width = 20 + Math.random() * 30 + 'px';
    
    document.getElementById('leaves').appendChild(leaf);
    setTimeout(() => leaf.remove(), 10000);
}
setInterval(createLeaf, 300);


/* ===================== Quote APIs ===================== */
const quoteEndpoints = [
    {
        name: "Quotable",
        url: "https://api.quotable.io/random",
        parser: async res => {
            const json = await res.json();
            return { text: json.content, author: json.author };
        }
    },
    {
        name: "ZenQuotes",
        url: "https://zenquotes.io/api/random",
        parser: async res => {
            const json = await res.json();
            return { text: json[0].q, author: json[0].a };
        }
    },
    {
        name: "AdviceSlip",
        url: "https://api.adviceslip.com/advice",
        parser: async res => {
            const json = await res.json();
            return { text: json.slip.advice, author: "AdviceSlip" };
        }
    }
];

/* Timeout wrapper */
async function fetchWithTimeout(url, timeoutMs = 6000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal, cache: "no-cache" });
        clearTimeout(id);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res;
    } catch (err) {
        clearTimeout(id);
        throw err;
    }
}

/* Try remote APIs */
async function tryRemoteQuotes() {
    for (const ep of quoteEndpoints) {
        try {
            const res = await fetchWithTimeout(ep.url);
            const parsed = await ep.parser(res);
            if (parsed && parsed.text) return { ...parsed, source: ep.name };
        } catch {
            // silently fail
        }
    }
    return null;
}

/* HTML escaping */
function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>"']/g, m => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[m]);
}

/* Main generateQuote() */
async function generateQuote() {
    const quoteTextEl = document.getElementById("quote-text");
    const quoteSourceEl = document.getElementById("quote-source");

    quoteTextEl.textContent = "Loading quote...";
    quoteSourceEl.textContent = "";

    const remote = await tryRemoteQuotes();
    if (remote) {
        quoteTextEl.innerHTML =
            `"${escapeHtml(remote.text)}"<br><span style='font-size:15px;font-weight:bold;'>— ${escapeHtml(remote.author || "Unknown")}</span>`;
        quoteSourceEl.textContent = `Source: ${remote.source}`;
        return;
    }
    quoteTextEl.textContent = "Unable to load quote.";
}

/* Initialize quote button */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("new-quote-btn").addEventListener("click", generateQuote);
    generateQuote();
});
