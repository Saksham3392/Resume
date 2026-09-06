/**
 * ====================================================================
 * SAKSHAM SHEORAN — INTERACTIVE RESUME & MAINFRAME ENGINE
 * ====================================================================
 * Bulletproof, high-performance implementation conforming to Apple HIG.
 */

document.addEventListener("DOMContentLoaded", () => {
  safeRun("initWebAudio", initWebAudio);
  safeRun(
    "initCustomCursorAndDynamicBackground",
    initCustomCursorAndDynamicBackground,
  );
  safeRun("initVideoScrub", initVideoScrub);
  safeRun("initHeroTypewriter", initHeroTypewriter);
  safeRun("initActionPills", initActionPills);
  safeRun("initMobileMenu", initMobileMenu);
  safeRun("initAppleScrollReveals", initAppleScrollReveals);
  safeRun("init3DTilt", init3DTilt);
  safeRun("initMetricsCounters", initMetricsCounters);
  safeRun("initProjectsCarousel", initProjectsCarousel);
  safeRun("initModal", initModal);
  safeRun("initResumeModal", initResumeModal);
  safeRun("initGitHubTelemetry", initGitHubTelemetry);
  safeRun("initGradesWidget", initGradesWidget);
  safeRun("initTerminal", initTerminal);
  safeRun("initContactForm", initContactForm);
});

function safeRun(name, fn) {
  try {
    fn();
  } catch (err) {
    console.warn(`[Mainframe] ${name} error:`, err);
  }
}

/* ====================================================================
   0A. SOUND DESIGN & WEB AUDIO ENGINE (HAPTIC SOUND SYNTHESIZER)
   ==================================================================== */
let audioCtx = null;
let soundEnabled = true; // Enabled by default as requested

function initWebAudio() {
  // First interaction unlock for modern browser audio policy
  const unlockAudio = () => {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {}
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    window.removeEventListener("click", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };

  window.addEventListener("click", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  // Hook global click sound to buttons, pills, links
  document.addEventListener("click", (e) => {
    if (!soundEnabled) return;
    const clickable = e.target.closest(
      'a, button, [role="button"], .pill-btn-white, .pill-btn-outline',
    );
    if (clickable) {
      playSynthSound("click", 640, 0.035);
    }
  });

  // Hook keypress audio for interactive typing
  document.addEventListener("keydown", (e) => {
    if (!soundEnabled) return;
    const isTyping =
      e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
    if (isTyping && e.key.length === 1) {
      const pitch = 220 + Math.random() * 80;
      playSynthSound("key", pitch, 0.02);
    }
  });
}

function playSynthSound(type = "click", freq = 600, duration = 0.04) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + duration);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else if (type === "key") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + duration);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    osc.start(now);
    osc.stop(now + duration);
  } catch (err) {}
}

/* ====================================================================
   0B. CUSTOM CINEMATIC CURSOR & DYNAMIC REACTIVE BACKGROUND
   ==================================================================== */
function initCustomCursorAndDynamicBackground() {
  const dot = document.getElementById("custom-cursor-dot");
  const ring = document.getElementById("custom-cursor-ring");
  const glow = document.getElementById("ambient-light-glow");
  const canvas = document.getElementById("bg-interactive-canvas");

  // Mouse coordinate trackers
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let dotX = mouseX;
  let dotY = mouseY;
  let isMoving = false;
  let moveTimeout = null;

  // Track mouse coordinates
  window.addEventListener(
    "mousemove",
    (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update CSS custom variables for dynamic ambient glow
      if (glow) {
        glow.style.setProperty(
          "--mouse-x",
          `${(mouseX / window.innerWidth) * 100}%`,
        );
        glow.style.setProperty(
          "--mouse-y",
          `${(mouseY / window.innerHeight) * 100}%`,
        );
      }

      clearTimeout(moveTimeout);
      isMoving = true;
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 2000);
    },
    { passive: true },
  );

  // Hover detection on interactive elements
  const interactiveSelector =
    'a, button, input, textarea, select, label, .glass-card, [role="button"], .tilt-element';
  document.addEventListener("mouseover", (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        document.body.classList.add("cursor-text");
      } else {
        document.body.classList.add("cursor-hover");
      }
    }
  });

  document.addEventListener("mouseout", (e) => {
    const target = e.target.closest(interactiveSelector);
    if (target) {
      document.body.classList.remove("cursor-hover", "cursor-text");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.add("cursor-active");
  });

  document.addEventListener("mouseup", () => {
    document.body.classList.remove("cursor-active");
  });

  // Smooth lerp / spring animation loop for cursor
  function animateCursor() {
    // Dot follows sharply
    dotX += (mouseX - dotX) * 0.45;
    dotY += (mouseY - dotY) * 0.45;

    // Outer ring follows with smooth trailing fluid elasticity
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    if (dot) {
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    }
    if (ring) {
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Background Interactive Mesh & Constellation Particle Canvas
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener(
    "resize",
    () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    },
    { passive: true },
  );

  // Particles network
  const numParticles = Math.min(65, Math.floor((width * height) / 18000));
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.35 + 0.15,
      color:
        Math.random() > 0.6
          ? "#38bdf8"
          : Math.random() > 0.3
            ? "#2997ff"
            : "#818cf8",
    });
  }

  function drawInteractiveBackground() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse repulsion/attraction force
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.hypot(dx, dy);
      const maxMouseDist = 180;

      if (dist < maxMouseDist) {
        // Subtle magnetic drift toward or around the cursor
        const force = (1 - dist / maxMouseDist) * 0.9;
        p.x -= (dx / dist) * force;
        p.y -= (dy / dist) * force;
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.baseAlpha;
      ctx.fill();

      // Connect particles close to cursor with dynamic glowing constellation lines
      if (dist < maxMouseDist) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "#38bdf8";
        ctx.globalAlpha = (1 - dist / maxMouseDist) * 0.22;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Connect nearby particles to each other
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const pDist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (pDist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = "#2997ff";
          ctx.globalAlpha = (1 - pDist / 100) * 0.12;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1.0;
    requestAnimationFrame(drawInteractiveBackground);
  }

  requestAnimationFrame(drawInteractiveBackground);
}

/* ====================================================================
   1. MOUSE-SCRUB CONTROLLED BACKGROUND VIDEO (NON-BLOCKING)
   ==================================================================== */
function initVideoScrub() {
  const video = document.getElementById("bg-video");
  if (!video) return;

  let prevX = null;
  let isSeeking = false;
  let targetTime = 0;
  const SENSITIVITY = 0.8;

  // Try to play muted video automatically for initial frame rendering
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay with video paused is fine, seek will drive it
    });
  }

  function performSeek() {
    if (
      isSeeking ||
      !isFinite(video.duration) ||
      video.duration <= 0 ||
      !isFinite(targetTime)
    )
      return;
    try {
      isSeeking = true;
      video.currentTime = Math.max(0, Math.min(video.duration, targetTime));
    } catch (e) {
      isSeeking = false;
    }
  }

  video.addEventListener("seeked", () => {
    isSeeking = false;
    if (
      isFinite(targetTime) &&
      Math.abs(video.currentTime - targetTime) > 0.05
    ) {
      performSeek();
    }
  });

  video.addEventListener("loadedmetadata", () => {
    if (isFinite(video.duration) && video.duration > 0) {
      targetTime = 0.01;
      performSeek();
    }
  });

  // Mousemove horizontal scrub
  window.addEventListener("mousemove", (e) => {
    if (prevX === null) {
      prevX = e.clientX;
      return;
    }

    const delta = e.clientX - prevX;
    prevX = e.clientX;

    if (!isFinite(video.duration) || video.duration <= 0) return;

    const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
    if (!isFinite(offset)) return;

    targetTime = Math.max(
      0,
      Math.min(
        video.duration,
        (isFinite(targetTime) ? targetTime : 0) + offset,
      ),
    );
    performSeek();
  });

  window.addEventListener("mouseleave", () => {
    prevX = null;
  });

  // Scroll scrub
  window.addEventListener(
    "scroll",
    () => {
      if (!isFinite(video.duration) || video.duration <= 0) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const fraction = window.scrollY / maxScroll;
        targetTime = Math.max(
          0,
          Math.min(video.duration, fraction * video.duration),
        );
        performSeek();
      }
    },
    { passive: true },
  );
}

/* ====================================================================
   2. HERO TEXT ANIMATION (TITLE REVEAL & BIO TYPEWRITER)
   ==================================================================== */
function initHeroTypewriter() {
  const titleEl = document.getElementById("hero-title-animated");
  const typewriterEl = document.getElementById("hero-typewriter-text");
  const cursorEl = document.getElementById("typewriter-cursor");

  if (titleEl) {
    titleEl.style.opacity = "0";
    titleEl.style.transform = "translateY(12px)";
    titleEl.style.transition =
      "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    setTimeout(() => {
      titleEl.style.opacity = "1";
      titleEl.style.transform = "translateY(0)";
    }, 150);
  }

  if (!typewriterEl) return;

  const defaultText =
    "Computer Science & Engineering student at Chitkara University, focused on building scalable web applications, reliable backend systems, and polished user experiences.";
  const fullText =
    window.portfolioData &&
    window.portfolioData.hero &&
    window.portfolioData.hero.typewriterText
      ? window.portfolioData.hero.typewriterText
      : defaultText;

  // Clear and type
  typewriterEl.textContent = "";
  let charIdx = 0;

  setTimeout(() => {
    const timer = setInterval(() => {
      if (charIdx < fullText.length) {
        typewriterEl.textContent += fullText.charAt(charIdx);
        charIdx++;
      } else {
        clearInterval(timer);
        if (cursorEl) {
          cursorEl.style.opacity = "0.7";
        }
      }
    }, 28);
  }, 450);
}

/* ====================================================================
   3. ACTION PILLS & RESUME ACTION
   ==================================================================== */
function initActionPills() {
  const resumeBtn = document.getElementById("download-resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  const copyBtn = document.getElementById("copy-email-pill");
  if (copyBtn) {
    copyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const email =
        window.portfolioData &&
        window.portfolioData.profile &&
        window.portfolioData.profile.email
          ? window.portfolioData.profile.email
          : "sakshamsheoran2005@gmail.com";

      navigator.clipboard
        .writeText(email)
        .then(() => {
          const textSpan = copyBtn.querySelector(".copy-text-label");
          if (textSpan) {
            const original = textSpan.textContent;
            textSpan.textContent = "Copied to Clipboard!";
            setTimeout(() => {
              textSpan.textContent = original;
            }, 2500);
          }
        })
        .catch(() => {
          alert(`Email: ${email}`);
        });
    });
  }
}

/* ====================================================================
   4. MOBILE HAMBURGER & OVERLAY
   ==================================================================== */
function initMobileMenu() {
  const btn = document.getElementById("mobile-hamburger-btn");
  const overlay = document.getElementById("mobile-nav-overlay");
  const links = document.querySelectorAll(".mobile-overlay-link");

  if (!btn || !overlay) return;

  function toggle() {
    const isActive = btn.classList.toggle("hamburger-active");
    if (isActive) {
      overlay.classList.remove("opacity-0", "pointer-events-none");
      overlay.classList.add("opacity-100", "pointer-events-auto");
      document.body.style.overflow = "hidden";
    } else {
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100", "pointer-events-auto");
      document.body.style.overflow = "";
    }
  }

  btn.addEventListener("click", toggle);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      btn.classList.remove("hamburger-active");
      overlay.classList.add("opacity-0", "pointer-events-none");
      overlay.classList.remove("opacity-100", "pointer-events-auto");
      document.body.style.overflow = "";
    });
  });
}

/* ====================================================================
   5. SCROLL CHOREOGRAPHY REVEALS
   ==================================================================== */
function initAppleScrollReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  document
    .querySelectorAll(".scroll-reveal, .apple-reveal, .section-header-reveal")
    .forEach((el) => {
      observer.observe(el);
    });
}

/* ====================================================================
   6. 3D TILT EFFECT
   ==================================================================== */
function init3DTilt() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const tiltCards = document.querySelectorAll(".tilt-element");
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* ====================================================================
   7. ANIMATED METRICS COUNTERS
   ==================================================================== */
function initMetricsCounters() {
  const counters = document.querySelectorAll(".counter-val");
  let hasAnimated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach((counter) => {
          const target = parseFloat(counter.getAttribute("data-target"));
          const duration = 1500;
          const steps = 35;
          const inc = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              counter.textContent =
                target % 1 === 0 ? target : target.toFixed(1);
              clearInterval(timer);
            } else {
              counter.textContent =
                target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
            }
          }, duration / steps);
        });
      }
    },
    { threshold: 0.2 },
  );

  const metricsSection = document.getElementById("metrics-grid");
  if (metricsSection) observer.observe(metricsSection);
}

/* ====================================================================
   8. PROJECTS CAROUSEL & MODAL
   ==================================================================== */
let currentCategory = "All";

function initProjectsCarousel() {
  const track = document.getElementById("projects-track");
  const pillsContainer = document.getElementById("project-category-pills");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  if (!track || !window.portfolioData) return;

  // Filter pills
  if (pillsContainer) {
    pillsContainer.innerHTML = "";
    window.portfolioData.projectCategories.forEach((cat) => {
      const btn = document.createElement("button");
      btn.className = `px-4 py-1.5 rounded-full text-xs font-mono transition-all ${
        cat === currentCategory
          ? "bg-white text-black font-semibold shadow-md"
          : "text-slate-300 hover:text-white hover:bg-white/10"
      }`;
      btn.textContent = cat;
      btn.addEventListener("click", () => {
        currentCategory = cat;
        initProjectsCarousel();
      });
      pillsContainer.appendChild(btn);
    });
  }

  // Render cards
  const filtered =
    currentCategory === "All"
      ? window.portfolioData.projects
      : window.portfolioData.projects.filter(
          (p) => p.category === currentCategory,
        );

  track.innerHTML = "";
  filtered.forEach((proj) => {
    const card = document.createElement("div");
    card.className =
      "shrink-0 w-[320px] sm:w-[390px] lg:w-[430px] glass-card tilt-element p-6 sm:p-7 flex flex-col justify-between cursor-pointer";

    const tagsHtml = (proj.techStack || proj.tags || [])
      .map(
        (t) =>
          `<span class="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10">${t}</span>`,
      )
      .join("");

    const bulletsHtml = (proj.bullets || [])
      .slice(0, 3)
      .map(
        (b) =>
          `<li class="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
            <span class="text-[#2997ff] mt-1 shrink-0 text-[10px]">▹</span>
            <span>${b}</span>
          </li>`,
      )
      .join("");

    card.innerHTML = `
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-mono font-semibold text-[#2997ff] uppercase">${proj.category}</span>
          <span class="text-[11px] font-mono text-[#94a3b8]">Production System</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold font-heading text-white mb-2">${proj.title}</h3>
        <p class="text-xs text-slate-300 mb-4 leading-relaxed">${proj.oneLiner || proj.description}</p>
        
        <div class="mb-5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
          <div class="text-[11px] font-mono text-[#94a3b8] uppercase tracking-wider mb-2">Technical Implementation</div>
          <ul class="space-y-2">
            ${bulletsHtml}
          </ul>
        </div>
      </div>
      <div>
        <div class="flex flex-wrap gap-1.5 mb-5">${tagsHtml}</div>
        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <span class="text-xs font-mono font-bold text-[#2997ff] flex items-center gap-1.5">
            <span>View Full Details</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </span>
          <div class="flex items-center gap-3">
            <a href="${proj.githubUrl}" target="_blank" class="text-slate-400 hover:text-white" title="Source Code"><i class="fa-brands fa-github text-base"></i></a>
            <a href="${proj.demoUrl}" target="_blank" class="text-slate-400 hover:text-[#2997ff]" title="Live System"><i class="fa-solid fa-arrow-trend-up text-base"></i></a>
          </div>
        </div>
      </div>
    `;

    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openModal(proj);
    });

    track.appendChild(card);
  });

  if (prevBtn && nextBtn) {
    prevBtn.onclick = () => track.scrollBy({ left: -360, behavior: "smooth" });
    nextBtn.onclick = () => track.scrollBy({ left: 360, behavior: "smooth" });
  }
}

/* ====================================================================
   9. CASE STUDY MODAL
   ==================================================================== */
let modal, backdrop, closeBtn;

function initModal() {
  modal = document.getElementById("project-modal");
  backdrop = document.getElementById("modal-backdrop");
  closeBtn = document.getElementById("modal-close-btn");

  if (!modal) return;

  const hide = () => {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", hide);
  backdrop?.addEventListener("click", hide);
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) hide();
  });
}

function openModal(project) {
  if (!modal) return;
  document.getElementById("modal-title").textContent = project.title;
  document.getElementById("modal-subtitle").textContent =
    project.oneLiner || project.subtitle;
  document.getElementById("modal-category").textContent = project.category;

  const descEl = document.getElementById("modal-description");
  if (descEl) {
    const bullets = project.bullets || [];
    if (bullets.length > 0) {
      descEl.innerHTML = `
        <div class="space-y-4">
          <p class="text-sm sm:text-base text-slate-200 font-medium">${project.oneLiner || ""}</p>
          <div class="mt-4">
            <h4 class="text-xs font-mono text-[#2997ff] uppercase tracking-wider mb-3">Key Technical Contributions & Implementation:</h4>
            <ul class="space-y-2.5">
              ${bullets.map((b) => `<li class="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2.5"><span class="text-[#2997ff] mt-1 shrink-0">▹</span><span>${b}</span></li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    } else {
      descEl.textContent = project.longDescription || project.description;
    }
  }

  const metricsEl = document.getElementById("modal-metrics");
  if (metricsEl) {
    const stack = (project.techStack || project.tags || []).join(" • ");
    metricsEl.textContent = `Tech Stack: ${stack}`;
  }

  const tagsContainer = document.getElementById("modal-tags");
  if (tagsContainer) {
    tagsContainer.innerHTML = (project.techStack || project.tags || [])
      .map(
        (t) =>
          `<span class="px-3 py-1 text-xs font-mono bg-[#2997ff]/15 text-[#2997ff] border border-[#2997ff]/30 rounded-lg">${t}</span>`,
      )
      .join("");
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

/* ====================================================================
   9B. ACADEMIC GRADES & SEMESTER TRANSCRIPT ENGINE
   ==================================================================== */
function initGradesWidget() {
  const container = document.getElementById("grades-detail-container");
  const semBtns = document.querySelectorAll(".sem-tab-btn");
  const yearBtns = document.querySelectorAll(".year-accordion-btn");

  if (!container || !window.portfolioData || !window.portfolioData.grades)
    return;

  const { grades } = window.portfolioData;

  // Helper to find semester object
  function findSemester(semNum) {
    for (const y of grades.years) {
      for (const s of y.semesters) {
        if (s.sem === Number(semNum)) {
          return { semester: s, year: y };
        }
      }
    }
    return null;
  }

  // Grade color formatting badge - displays clean letter grade
  function getGradeBadge(grade) {
    const g = (grade || "").trim().toUpperCase();
    if (g === "O") {
      return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">O</span>`;
    }
    if (g === "A+") {
      return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">A+</span>`;
    }
    if (g === "A") {
      return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs font-mono font-bold">A</span>`;
    }
    if (g === "B+") {
      return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">B+</span>`;
    }
    if (g === "C") {
      return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">C</span>`;
    }
    return `<span class="inline-flex items-center justify-center min-w-[34px] px-2.5 py-0.5 rounded-md bg-slate-500/15 text-slate-300 border border-slate-500/30 text-xs font-mono font-bold">${g || "P"}</span>`;
  }

  function renderSemester(semNum) {
    const data = findSemester(semNum);
    if (!data) return;

    const { semester, year } = data;

    // Update active state on all semester buttons (clean high-contrast glowing dark theme)
    semBtns.forEach((btn) => {
      const isCurrent = Number(btn.dataset.sem) === Number(semNum);
      const titleDiv = btn.children[0];
      const subDiv = btn.children[1];
      if (isCurrent) {
        btn.className =
          "sem-tab-btn active px-3 py-2 rounded-xl text-left font-mono transition-all border bg-[#2997ff]/20 border-[#2997ff] text-white shadow-[0_0_15px_rgba(41,151,255,0.25)] ring-1 ring-[#2997ff]/50";
        if (titleDiv)
          titleDiv.className =
            "text-[11px] font-bold text-white flex items-center justify-between";
        if (subDiv)
          subDiv.className = "text-[10px] text-[#38bdf8] font-semibold";
      } else {
        btn.className =
          "sem-tab-btn px-3 py-2 rounded-xl text-left font-mono transition-all border bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10";
        if (titleDiv)
          titleDiv.className = "text-[11px] font-bold text-slate-300";
        if (subDiv) subDiv.className = "text-[10px] text-slate-400";
      }
    });

    // Highlight active Year Card parent border
    document.querySelectorAll("#grades .year-accordion-btn").forEach((yBtn) => {
      const parentCard = yBtn.closest(".rounded-2xl");
      if (parentCard) {
        if (Number(yBtn.dataset.year) === year.year) {
          parentCard.className =
            "p-3.5 rounded-2xl bg-white/[0.04] border border-[#2997ff]/50 shadow-sm transition-all border-l-4 border-l-[#2997ff]";
        } else {
          parentCard.className =
            "p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all";
        }
      }
    });

    // Check if courses are available or if it's "Result Not Found"
    if (!semester.courses || semester.courses.length === 0) {
      container.innerHTML = `
        <div class="flex-1 flex flex-col items-center justify-center text-center p-8 sm:p-12 my-auto">
          <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8] mb-4 shadow-lg">
            <i class="fa-solid fa-hourglass-half text-2xl animate-pulse"></i>
          </div>
          <span class="text-xs font-mono uppercase tracking-widest text-[#38bdf8] mb-1">Academic Evaluation</span>
          <h4 class="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">Result Not Found</h4>
          <p class="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed mb-6">
            Official academic grades for <strong class="text-white">${semester.title} (${year.title})</strong> have not been declared yet by Chitkara University Examination Division.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
            <span class="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
              Status: Upcoming / Pending Examination
            </span>
            <span class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400">
              Chitkara University, Punjab
            </span>
          </div>
        </div>
      `;
      return;
    }

    // Render Completed Semester Table (Clean, wide, non-wrapping typography)
    const rowsHtml = semester.courses
      .map(
        (c) => `
        <tr class="hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0">
          <td class="py-3 px-3 text-slate-400 text-center font-mono text-xs">${c.num}</td>
          <td class="py-3 px-3 text-[#38bdf8] font-mono font-semibold text-xs whitespace-nowrap">${c.code}</td>
          <td class="py-3 px-3 text-slate-100 font-sans font-medium text-sm leading-snug">${c.name}</td>
          <td class="py-3 px-3 text-center text-slate-300 font-mono text-xs">${c.credits}</td>
          <td class="py-3 px-3 text-center whitespace-nowrap">${getGradeBadge(c.grade)}</td>
        </tr>
      `,
      )
      .join("");

    container.innerHTML = `
      <div>
        <!-- Top Header of Semester -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <h4 class="text-xl sm:text-2xl font-bold font-heading text-white">${semester.title} Grade Sheet</h4>
            <p class="text-xs text-[#94a3b8] font-mono mt-0.5">Academic Session: ${year.period} • Chitkara University</p>
          </div>
          
          <div class="flex items-center gap-3 text-xs font-mono">
            <div class="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-right">
              <span class="text-emerald-400/80 block text-[10px]">SGPA</span>
              <span class="text-base font-bold text-emerald-400">${semester.sgpa}</span>
            </div>
            <div class="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-right">
              <span class="text-cyan-400/80 block text-[10px]">CGPA</span>
              <span class="text-base font-bold text-cyan-300">${semester.cgpa}</span>
            </div>
            <div class="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-right">
              <span class="text-slate-400 block text-[10px]">Credits</span>
              <span class="text-base font-bold text-white">${semester.totalCredits}</span>
            </div>
          </div>
        </div>

        <!-- Responsive Courses Table with Sticky Header -->
        <div class="overflow-x-auto my-3 max-h-[480px] overflow-y-auto pr-1">
          <table class="w-full text-left">
            <thead class="sticky top-0 bg-[#0c121e]/95 backdrop-blur-md z-10">
              <tr class="border-b border-white/10 text-[#94a3b8] text-[11px] font-mono uppercase tracking-wider">
                <th class="py-2.5 px-3 text-center w-12">#</th>
                <th class="py-2.5 px-3 w-32">Subject Code</th>
                <th class="py-2.5 px-3">Subject Name</th>
                <th class="py-2.5 px-3 text-center w-24">Credits</th>
                <th class="py-2.5 px-3 text-center w-24">Grade</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${rowsHtml}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Footer of Table Record -->
      <div class="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[11px] font-mono text-[#94a3b8]">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-circle-check text-emerald-400"></i>
          <span>Official University Grade Point Scale: O = 10, A+ = 9, A = 8, B+ = 7</span>
        </div>
        <div>
          Evaluated: <span class="text-white font-bold">${semester.courses.length} Subjects</span> • Cumulative CGPA: <span class="text-emerald-400 font-bold">${semester.cgpa}</span>
        </div>
      </div>
    `;
  }

  // Bind click listeners for Semester buttons
  semBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const sem = btn.dataset.sem;
      renderSemester(sem);
    });
  });

  // Bind click listeners for Year accordion buttons
  yearBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const yr = Number(btn.dataset.year);
      let targetSem = 1;
      if (yr === 1) targetSem = 1;
      else if (yr === 2) targetSem = 4;
      else if (yr === 3) targetSem = 5;
      else if (yr === 4) targetSem = 7;
      renderSemester(targetSem);
    });
  });
}

/* ====================================================================
   10. INTERACTIVE TERMINAL
   ==================================================================== */
function initTerminal() {
  const input = document.getElementById("terminal-input");
  const output = document.getElementById("terminal-output");
  if (
    !input ||
    !output ||
    !window.portfolioData ||
    !window.portfolioData.terminal
  )
    return;

  const { prompt, welcome, commands } = window.portfolioData.terminal;
  const shellPrompt = prompt || "saksham@portfolio:~$";

  function print(text, isCmd = false, isErr = false) {
    const div = document.createElement("div");
    div.className = isCmd
      ? "text-[#2997ff] font-bold"
      : isErr
        ? "text-rose-400 font-mono text-xs whitespace-pre-wrap"
        : "text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed";
    div.textContent = isCmd ? `${shellPrompt} ${text}` : text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  print(welcome);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const val = input.value.trim().toLowerCase();
      input.value = "";
      if (!val) return;

      print(val, true);

      if (val === "clear") {
        output.innerHTML = "";
        return;
      }

      if (commands[val]) {
        print(commands[val]);
      } else {
        print(
          `Command not recognized: '${val}'. Type 'help' for available commands.`,
          false,
          true,
        );
      }
    }
  });
}

/* ====================================================================
   10B. IN-BROWSER RESUME PREVIEW MODAL
   ==================================================================== */
function initResumeModal() {
  const modal = document.getElementById("resume-modal");
  const backdrop = document.getElementById("resume-modal-backdrop");
  const closeBtn = document.getElementById("resume-modal-close");
  const trafficClose = document.getElementById("resume-close-traffic");
  const printBtn = document.getElementById("resume-print-btn");
  const downloadBtn = document.getElementById("resume-download-btn");
  const paper = document.getElementById("resume-paper-content");

  if (!modal || !paper) return;

  // Render high-craft resume document inside the modal
  paper.innerHTML = `
    <div class="resume-sheet">
      <div class="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-200 pb-4 mb-4">
        <div>
          <h1 class="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">Saksham Sheoran</h1>
          <p class="text-sm font-bold text-blue-600 mt-0.5">Full-Stack Software Engineer &amp; Computer Science Student</p>
        </div>
        <div class="text-xs font-mono text-slate-600 sm:text-right mt-3 sm:mt-0 space-y-1">
          <div>Punjab, India</div>
          <div><a href="mailto:sakshamsheoran2005@gmail.com" class="text-blue-600 hover:underline">sakshamsheoran2005@gmail.com</a></div>
          <div><a href="https://github.com/Saksham3392" target="_blank" class="text-blue-600 hover:underline">github.com/Saksham3392</a></div>
          <div><a href="https://www.linkedin.com/in/saksham-sheoran/" target="_blank" class="text-blue-600 hover:underline">linkedin.com/in/saksham-sheoran</a></div>
        </div>
      </div>

      <!-- Education -->
      <div class="mb-5">
        <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2.5">
          Education
        </h2>
        <div class="flex justify-between items-baseline font-semibold text-slate-900 text-sm">
          <span>Chitkara University</span>
          <span class="text-xs text-slate-500 font-normal">Punjab, India</span>
        </div>
        <div class="flex justify-between items-baseline italic text-xs text-slate-600 mb-1.5">
          <span>Bachelor of Engineering in Computer Science &amp; Engineering (AI-ML)</span>
          <span>Expected 2028</span>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800">Relevant Coursework:</strong> Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Distributed Systems, System Design, Software Engineering.
        </p>
      </div>

      <!-- Technical Skills -->
      <div class="mb-5">
        <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2.5">
          Technical Skills
        </h2>
        <div class="space-y-1.5 text-xs text-slate-700">
          <div><strong class="text-slate-900">Languages:</strong> C++, Java, JavaScript (ES6+), TypeScript, Python, SQL</div>
          <div><strong class="text-slate-900">Frontend:</strong> HTML5, CSS3, React.js, Next.js, Tailwind CSS, Responsive UI Design</div>
          <div><strong class="text-slate-900">Backend:</strong> Node.js, Express.js, RESTful APIs, Microservices, Auth &amp; Middleware</div>
          <div><strong class="text-slate-900">Databases:</strong> PostgreSQL, MySQL, MongoDB, Redis, Schema Design &amp; Optimization</div>
          <div><strong class="text-slate-900">Tools &amp; DevOps:</strong> Git, GitHub, Docker, Linux/Unix, Postman, CI/CD Pipelines, Vercel</div>
        </div>
      </div>

      <!-- Selected Projects -->
      <div class="mb-5">
        <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2.5">
          Selected Projects
        </h2>

        <div class="mb-3.5">
          <div class="flex justify-between items-baseline text-xs font-bold text-slate-900">
            <span>Distributed Task Processing &amp; Worker Queue</span>
            <span class="text-[11px] font-mono font-normal text-slate-500">Node.js, Redis, Docker, PostgreSQL</span>
          </div>
          <div class="text-[11px] italic text-slate-500 mb-1">Asynchronous job processing architecture • 2026</div>
          <ul class="list-disc ml-4 space-y-1 text-xs text-slate-700">
            <li>Engineered a scalable worker queue processing heavy background workloads with dead-letter queue recovery and exponential backoff retry policies.</li>
            <li>Integrated Redis BullMQ with PostgreSQL state management, sustaining reliable concurrency and reducing API endpoint latency by 45%.</li>
          </ul>
        </div>

        <div class="mb-3.5">
          <div class="flex justify-between items-baseline text-xs font-bold text-slate-900">
            <span>Real-Time Collaborative Code Canvas</span>
            <span class="text-[11px] font-mono font-normal text-slate-500">React, Node.js, WebSockets, Redis</span>
          </div>
          <div class="text-[11px] italic text-slate-500 mb-1">Multi-tenant synchronized coding workspace • 2026</div>
          <ul class="list-disc ml-4 space-y-1 text-xs text-slate-700">
            <li>Built a real-time collaborative workspace supporting synchronized code state propagation across connected clients via WebSockets.</li>
            <li>Implemented room-based pub/sub channels using Redis and robust operational conflict resolution with optimistic client updates.</li>
          </ul>
        </div>

        <div>
          <div class="flex justify-between items-baseline text-xs font-bold text-slate-900">
            <span>High-Throughput RESTful Microservices Gateway</span>
            <span class="text-[11px] font-mono font-normal text-slate-500">Express, TypeScript, JWT, Docker</span>
          </div>
          <div class="text-[11px] italic text-slate-500 mb-1">Secure API Gateway and Authorization Proxy • 2025</div>
          <ul class="list-disc ml-4 space-y-1 text-xs text-slate-700">
            <li>Architected a reverse proxy API Gateway enforcing rate-limiting (token bucket algorithm), centralized JWT authentication, and structured error boundaries.</li>
            <li>Automated containerized deployment using Docker and configured health check endpoints with comprehensive logging telemetry.</li>
          </ul>
        </div>
      </div>

      <!-- Core Principles -->
      <div class="pb-6">
        <h2 class="text-xs font-bold font-mono uppercase tracking-wider text-slate-800 border-b border-slate-300 pb-1 mb-2">
          Core Engineering Principles
        </h2>
        <ul class="list-disc ml-4 space-y-1 text-xs text-slate-700">
          <li><strong>Clean Architecture:</strong> Modularity, clean separation of concerns, and defensive programming for sustainable system growth.</li>
          <li><strong>Performance:</strong> Rigorous query optimization, algorithmic complexity analysis, and minimal latency overhead.</li>
        </ul>
      </div>
    </div>
  `;

  function close() {
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  [backdrop, closeBtn, trafficClose].forEach((el) => {
    if (el) el.addEventListener("click", close);
  });

  if (printBtn) {
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      // Direct print or save dialog
      window.print();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      close();
    }
  });
}

function openResumeModal() {
  const modal = document.getElementById("resume-modal");
  if (modal) {
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }
}

/* ====================================================================
   10C. GITHUB LIVE TELEMETRY & REPOSITORY FEED (@Saksham3392)
   ==================================================================== */
function initGitHubTelemetry() {
  const container = document.getElementById("github-repos-container");
  const reposCountEl = document.getElementById("gh-repos-count");
  const followersEl = document.getElementById("gh-followers-count");

  if (!container) return;

  const username = "Saksham3392";

  // Language color map
  const langColors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Java: "#b07219",
    "C++": "#f34b7d",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
  };

  // Fallback repos in case GitHub API rate limits
  const fallbackRepos = [
    {
      name: "CN-MCQs",
      description:
        "Computer Networks interactive exam preparation & practice test system with comprehensive question banks.",
      language: "JavaScript",
      stargazers_count: 0,
      html_url: "https://github.com/Saksham3392/CN-MCQs",
    },
    {
      name: "Java-Programming-Mcqs",
      description:
        "Core Java programming assessments, object-oriented concepts, and concurrency questions.",
      language: "JavaScript",
      stargazers_count: 0,
      html_url: "https://github.com/Saksham3392/Java-Programming-Mcqs",
    },
    {
      name: "Distributed-Worker-Queue",
      description:
        "Asynchronous task queue processing system built on Node.js, Redis BullMQ, and PostgreSQL.",
      language: "TypeScript",
      stargazers_count: 1,
      html_url: "https://github.com/Saksham3392",
    },
  ];

  function renderRepos(repos) {
    container.innerHTML = "";
    repos.slice(0, 6).forEach((repo) => {
      const card = document.createElement("a");
      card.href = repo.html_url;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.className = "gh-repo-card group";

      const lang = repo.language || "Code";
      const dotColor = langColors[lang] || "#38bdf8";

      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between gap-2 mb-2">
            <h4 class="text-sm font-bold font-mono text-white group-hover:text-[#2997ff] transition-colors truncate">
              ${repo.name}
            </h4>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400 group-hover:text-[#2997ff] transition-colors shrink-0"></i>
          </div>
          <p class="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
            ${repo.description || "Full-stack software engineering project and codebase implementation."}
          </p>
        </div>
        <div class="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-white/5">
          <div class="flex items-center gap-1.5">
            <span class="lang-dot" style="background-color: ${dotColor}"></span>
            <span>${lang}</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="fa-regular fa-star text-[10px]"></i>
            <span>${repo.stargazers_count}</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Fetch live profile stats
  fetch(`https://api.github.com/users/${username}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((data) => {
      if (data) {
        if (reposCountEl && data.public_repos !== undefined) {
          reposCountEl.textContent = data.public_repos;
        }
        if (followersEl && data.followers !== undefined) {
          followersEl.textContent = data.followers;
        }
      }
    })
    .catch(() => {});

  // Fetch live repositories
  fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
  )
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((repos) => {
      if (Array.isArray(repos) && repos.length > 0) {
        renderRepos(repos);
      } else {
        renderRepos(fallbackRepos);
      }
    })
    .catch(() => {
      renderRepos(fallbackRepos);
    });
}

/* ====================================================================
   11. FUNCTIONAL CONTACT FORM (WEB3FORMS + MAILTO FALLBACK)
   ==================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = document.getElementById("form-submit-btn");
  if (!form) return;

  const recipientEmail = "sakshamsheoran2005@gmail.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name =
      document.getElementById("form-name")?.value.trim() || "Colleague";
    const email = document.getElementById("form-email")?.value.trim() || "";
    const message = document.getElementById("form-message")?.value.trim() || "";

    if (!message || !email) return;

    const originalHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <i class="fa-solid fa-spinner animate-spin text-xs"></i>
      <span>Transmitting Message…</span>
    `;

    if (status) {
      status.className = "text-xs font-mono text-center pt-2 text-[#38bdf8]";
      status.textContent = "Connecting to transmission channel…";
      status.classList.remove("hidden");
    }

    try {
      // Web3Forms public contact dispatch
      const payload = {
        access_key: "058c49e0-e14a-4318-9717-380d32f7a468", // Free universal access endpoint for portfolio dispatch
        name: name,
        email: email,
        message: message,
        subject: `[Portfolio Inquiry] Message from ${name}`,
        from_name: "Saksham Sheoran Portfolio",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        submitBtn.innerHTML = `
          <i class="fa-solid fa-check text-xs"></i>
          <span>Message Delivered!</span>
        `;
        if (status) {
          status.className =
            "text-xs font-mono text-center pt-2 text-[#30d158]";
          status.textContent = `Thank you, ${name}! Your message has been routed directly to ${recipientEmail}.`;
        }
        form.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHtml;
        }, 5000);
      } else {
        throw new Error(result.message || "Failed dispatch");
      }
    } catch (err) {
      // Graceful smart fallback to mailto:
      if (status) {
        status.className = "text-xs font-mono text-center pt-2 text-amber-400";
        status.innerHTML = `
          Direct transmission unavailable. 
          <a href="mailto:${recipientEmail}?subject=${encodeURIComponent("Software Engineering Inquiry - " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}" class="underline font-bold text-white hover:text-[#2997ff]">
            Click here to send directly via your Email Client &rarr;
          </a>
        `;
      }
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <i class="fa-regular fa-envelope text-xs"></i>
        <span>Open in Email App</span>
      `;
      submitBtn.onclick = () => {
        window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent("Software Engineering Inquiry - " + name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")")}`;
      };
    }
  });
}
