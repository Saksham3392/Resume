/**
 * ====================================================================
 * ADVANCED PARTICLE GALAXY & MATRIX RAIN CANVAS ENGINE
 * ====================================================================
 * Features dynamic theme color syncing, interactive 3D constellation
 * depth, cursor gravity, and optional Matrix digital rain mode.
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const mouse = {
    x: null,
    y: null,
    radius: 160
  };

  let isMatrixMode = false;
  let matrixColumns = [];
  const matrixChars = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
  const fontSize = 14;

  // Active theme color detection
  function getThemeColor() {
    const theme = document.body.getAttribute('data-theme') || 'cyan';
    if (theme === 'violet') return { r: 168, g: 85, b: 247 };
    if (theme === 'emerald') return { r: 16, g: 185, b: 129 };
    return { r: 56, g: 189, b: 248 }; // Cyan default
  }

  const getParticleCount = () => {
    if (window.innerWidth < 640) return 45;
    if (window.innerWidth < 1024) return 85;
    return 130;
  };

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.8;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5 + 0.12;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseVal = Math.random() * Math.PI;
    }

    draw(color) {
      this.pulseVal += this.pulseSpeed;
      const dynamicAlpha = this.alpha + Math.sin(this.pulseVal) * 0.15;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.max(0.1, dynamicAlpha)})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, 0.5)`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirX = dx / dist;
          const forceDirY = dy / dist;
          this.x -= forceDirX * force * 3;
          this.y -= forceDirY * force * 3;
        }
      }
    }
  }

  function initParticles() {
    particles.length = 0;
    const count = getParticleCount();
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles(color) {
    const maxDist = 120;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.16;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function initMatrixRain() {
    const columns = Math.floor(width / fontSize);
    matrixColumns = [];
    for (let i = 0; i < columns; i++) {
      matrixColumns[i] = Math.random() * -100;
    }
  }

  function drawMatrixRain() {
    ctx.fillStyle = 'rgba(5, 8, 15, 0.12)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#10b981';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < matrixColumns.length; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const x = i * fontSize;
      const y = matrixColumns[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > height && Math.random() > 0.975) {
        matrixColumns[i] = 0;
      }
      matrixColumns[i]++;
    }
  }

  let animationId;
  let running = true;

  function loop() {
    if (!running) return;

    if (isMatrixMode) {
      drawMatrixRain();
    } else {
      ctx.clearRect(0, 0, width, height);
      const color = getThemeColor();

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw(color);
      }
      connectParticles(color);
    }

    animationId = requestAnimationFrame(loop);
  }

  // Window Resize
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
    if (isMatrixMode) initMatrixRain();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      cancelAnimationFrame(animationId);
    } else {
      running = true;
      loop();
    }
  });

  // Global toggle for Matrix Mode triggered by terminal
  window.toggleMatrixMode = function () {
    isMatrixMode = !isMatrixMode;
    if (isMatrixMode) {
      initMatrixRain();
      document.body.setAttribute('data-theme', 'emerald');
    }
    return isMatrixMode;
  };

  initParticles();
  loop();
})();
