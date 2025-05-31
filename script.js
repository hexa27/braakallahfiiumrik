const giftBtn = document.getElementById('giftButton');
const message = document.getElementById('message');
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
const animatedBg = document.getElementById('animatedBackground');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

giftBtn.addEventListener('click', () => {
  giftBtn.classList.add('hidden');
  animatedBg.style.display = 'none';
  document.body.style.backgroundImage = "url('background.jpg')";

  setTimeout(() => {
    message.style.transform = 'scale(1)';
    triggerFireworks();
    launchBalloons(15);
  }, 1000);
});

function triggerFireworks() {
  let particles = [];

  function createFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 100; i++) {
      particles.push({
        x,
        y,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 1,
        radius: Math.random() * 2 + 1,
        alpha: 1,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      if (p.alpha <= 0) {
        particles.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    });
    requestAnimationFrame(draw);
  }

  createFirework();
  setInterval(createFirework, 800);
  draw();
}

function launchBalloons(count) {
  for (let i = 0; i < count; i++) {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = `${Math.random() * 100}vw`;
    balloon.style.animationDuration = `${5 + Math.random() * 3}s`;
    document.body.appendChild(balloon);
    setTimeout(() => balloon.remove(), 8000);
  }
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});