// Matrix Rain
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');
let matrixEnabled = true;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 14;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    if (!matrixEnabled) return;
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let matrixInterval = setInterval(drawMatrix, 50);

document.getElementById('matrixToggle').addEventListener('click', function() {
    matrixEnabled = !matrixEnabled;
    this.textContent = matrixEnabled ? '[matrix] on' : '[matrix] off';
    if (!matrixEnabled) {
        clearInterval(matrixInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        matrixInterval = setInterval(drawMatrix, 50);
    }
});

// Typing effect for hero alias
const aliasEl = document.getElementById('hero-alias');
const cursorEl = document.getElementById('hero-cursor');
const aliasText = 'alias';

function typeAlias() {
    let i = 0;
    cursorEl.style.display = 'inline-block';
    function type() {
        if (i < aliasText.length) {
            aliasEl.textContent += aliasText[i];
            i++;
            setTimeout(type, 120);
        } else {
            cursorEl.style.animation = 'blink 1s step-end infinite';
        }
    }
    type();
}

setTimeout(typeAlias, 600);

// Nav active link highlight on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.scrollY >= top) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
