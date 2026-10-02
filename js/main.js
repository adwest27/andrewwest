/**
 * MODERN PROFESSIONAL PORTFOLIO
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavbar();
  initProjectFilters();
  initTimelineTabs();
  initContactForm();
  initCopyEmail();
  initScrollAnimations();
  initResumeModal();
  initExploringRotator();
  initGitHubActivity();
  initCardTilt();
  initRecruiterMode();
  initQuickShare();
  initConstellationNetwork();
  initCaseStudyStepper();
  initCourseworkDrawers();
});

/* ==========================================================================
   THEME TOGGLE SYSTEM (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  
  // Check stored preference or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('portfolio-theme', newTheme);
    });
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-moon';
        themeToggleBtn?.setAttribute('aria-label', 'Switch to dark theme');
      } else {
        themeIcon.className = 'fas fa-sun';
        themeToggleBtn?.setAttribute('aria-label', 'Switch to light theme');
      }
    }
  }
}

/* ==========================================================================
   DYNAMIC TYPEWRITER EFFECT (Hero Section)
   ========================================================================== */
function initTypewriter() {
  const targetElement = document.getElementById('typewriter-text');
  if (!targetElement) return;

  // Custom roles
  const roles = [
    'Information Systems and Decision Science',
    'Python Coding',
    'Data Analysis'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 1800;

  function type() {
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      targetElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      targetElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 300);
      return;
    }

    const currentSpeed = isDeleting ? deletingSpeed : typingSpeed;
    setTimeout(type, currentSpeed);
  }

  type();
}

/* ==========================================================================
   NAVBAR INTERACTIONS & SCROLLSPY
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Scrollspy to highlight active link
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const matchingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (matchingLink) matchingLink.classList.add('active');
      }
    });
  });

  // Smooth scroll for Back to Top
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   PROJECT FILTERING TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   TIMELINE TABS (Experience vs. Education)
   ========================================================================== */
function initTimelineTabs() {
  const tabBtns = document.querySelectorAll('.timeline-tab-btn');
  const workTimeline = document.getElementById('timeline-work');
  const eduTimeline = document.getElementById('timeline-education');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.getAttribute('data-tab');
      if (target === 'work') {
        if (workTimeline) workTimeline.style.display = 'block';
        if (eduTimeline) eduTimeline.style.display = 'none';
      } else {
        if (workTimeline) workTimeline.style.display = 'none';
        if (eduTimeline) eduTimeline.style.display = 'block';
      }
    });
  });
}

/* ==========================================================================
   CONTACT FORM & TOAST NOTIFICATION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Simulate submission state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Thank you! Your message has been sent successfully.');
    }, 1200);
  });
}

/* ==========================================================================
   COPY EMAIL TO CLIPBOARD
   ========================================================================== */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('contact-email-text');

  if (copyBtn && emailTextEl) {
    copyBtn.addEventListener('click', () => {
      const email = emailTextEl.innerText.trim();
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast('Copied: ' + email);
      });
    });
  }
}

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.style.opacity = '1';
        entry.target.style.transform = '';
        setTimeout(() => {
          entry.target.style.transition = '';
        }, 600);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.glass-card:not(.modal-dialog), .timeline-item, .stat-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)';
    observer.observe(el);
  });
}

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .revealed {
    opacity: 1 !important;
  }
`;
document.head.appendChild(styleSheet);

/* ==========================================================================
   RESUME MODAL CONTROLLER
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openButtons = document.querySelectorAll('.open-resume-modal-btn');
  const closeBtn = document.getElementById('resume-close-btn');
  const printBtn = document.getElementById('resume-print-btn');

  if (!modal) return;

  function openModal() {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open modal triggers (Hero and Navbar buttons)
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close button trigger
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Click outside modal backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Print / Save to PDF trigger
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

/* ==========================================================================
   DYNAMIC "CURRENTLY EXPLORING" ROTATOR
   ========================================================================== */
function initExploringRotator() {
  const exploringText = document.getElementById('exploring-text');
  if (!exploringText) return;

  const topics = [
    'Cloud Infrastructure & DNS Systems',
    'Python Automation & Data Analytics',
    'ISDS Decision Systems & Modeling',
    'Cyber Risk Analysis & Threat Mitigation'
  ];

  let currentTopicIndex = 0;

  setInterval(() => {
    exploringText.classList.add('fade-out');
    setTimeout(() => {
      currentTopicIndex = (currentTopicIndex + 1) % topics.length;
      exploringText.textContent = topics[currentTopicIndex];
      exploringText.classList.remove('fade-out');
    }, 350);
  }, 4000);
}

/* ==========================================================================
   LIVE GITHUB ACTIVITY FETCHER (adwest27)
   ========================================================================== */
async function initGitHubActivity() {
  const cards = document.querySelectorAll('.github-activity-card');
  if (!cards.length) return;

  const username = 'adwest27';

  try {
    const userPromise = fetch(`https://api.github.com/users/${username}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    const reposPromise = fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });

    const [userRes, reposRes] = await Promise.all([userPromise, reposPromise]);

    if (userRes.ok) {
      const userData = await userRes.json();
      document.querySelectorAll('.gh-avatar').forEach(img => {
        if (userData.avatar_url) img.src = userData.avatar_url;
      });
      document.querySelectorAll('.gh-public-repos').forEach(el => {
        if (userData.public_repos !== undefined) el.textContent = userData.public_repos;
      });
    }

    if (reposRes.ok) {
      const repos = await reposRes.json();
      if (Array.isArray(repos) && repos.length > 0) {
        const activeRepo = repos[0];
        document.querySelectorAll('.gh-repo-name').forEach(el => {
          el.textContent = activeRepo.name;
          el.href = activeRepo.html_url;
        });
        document.querySelectorAll('.gh-repo-desc').forEach(el => {
          el.textContent = activeRepo.description || 'Personal Portfolio and Web Application';
        });
        document.querySelectorAll('.gh-repo-lang').forEach(el => {
          el.textContent = activeRepo.language || 'CSS / Web';
        });
      }
    }
  } catch (err) {
    // If rate-limited or offline, the fallback markup already in HTML remains visually active
    console.log('GitHub API offline or rate-limited; fallback active.', err);
  }
}

/* ==========================================================================
   GLOBAL UNIFIED TOAST NOTIFICATION
   ========================================================================== */
function showToast(title, desc = '') {
  let toast = document.getElementById('share-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'share-toast';
    toast.className = 'share-toast';
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `
      <div class="share-toast-content">
        <div class="share-toast-icon"><i class="fas fa-check"></i></div>
        <div class="share-toast-text">
          <strong id="toast-title"></strong>
          <span id="toast-desc"></span>
        </div>
      </div>`;
    document.body.appendChild(toast);
  }

  const titleEl = toast.querySelector('#toast-title') || toast.querySelector('strong');
  const descEl = toast.querySelector('#toast-desc') || toast.querySelector('span');

  if (titleEl) {
    titleEl.textContent = title;
  }
  if (descEl) {
    if (desc) {
      descEl.textContent = desc;
      descEl.style.display = 'block';
    } else {
      descEl.textContent = '';
      descEl.style.display = 'none';
    }
  }

  toast.classList.add('show');
  
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* ==========================================================================
   3D INTERACTIVE CARD TILT WITH SPECULAR GLARE
   ========================================================================== */
function initCardTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const tiltCards = document.querySelectorAll(
    '.project-card, .skill-card, .github-activity-card, .projects-portal-box, .stat-item, .highlight-item, .contact-card'
  );

  tiltCards.forEach(card => {
    let glare = card.querySelector('.card-glare');
    if (!glare) {
      glare = document.createElement('div');
      glare.className = 'card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      
      glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 70%)`;
      glare.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      if (glare) glare.style.opacity = '0';
      setTimeout(() => {
        card.style.transition = '';
      }, 400);
    });
  });
}

/* ==========================================================================
   RECRUITER 1-MINUTE MODE
   ========================================================================== */
function initRecruiterMode() {
  const toggleBtns = document.querySelectorAll('.recruiter-toggle-btn');
  const banner = document.getElementById('recruiter-banner');
  const bannerClose = document.getElementById('recruiter-banner-close');

  const savedMode = localStorage.getItem('portfolio-recruiter-mode') === 'true';
  if (savedMode) {
    enableRecruiterMode(false);
  }

  function enableRecruiterMode(showToastMsg = true) {
    document.documentElement.classList.add('recruiter-mode-active');
    toggleBtns.forEach(btn => {
      btn.classList.add('active');
      const textSpan = btn.querySelector('.recruiter-toggle-text');
      if (textSpan) textSpan.textContent = 'Exit 1-Min';
    });
    if (banner) {
      banner.classList.add('show');
      banner.setAttribute('aria-hidden', 'false');
    }
    localStorage.setItem('portfolio-recruiter-mode', 'true');
    if (showToastMsg) {
      showToast('⚡ Recruiter 1-Min Scan Enabled', 'Core metrics, skills, and highlights are now prioritized.');
    }
  }

  function disableRecruiterMode() {
    document.documentElement.classList.remove('recruiter-mode-active');
    toggleBtns.forEach(btn => {
      btn.classList.remove('active');
      const textSpan = btn.querySelector('.recruiter-toggle-text');
      if (textSpan) textSpan.textContent = 'Recruiter Mode';
    });
    if (banner) {
      banner.classList.remove('show');
      banner.setAttribute('aria-hidden', 'true');
    }
    localStorage.setItem('portfolio-recruiter-mode', 'false');
    showToast('Standard View Restored', 'Full portfolio details and expanded narratives visible.');
  }

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = document.documentElement.classList.contains('recruiter-mode-active');
      if (isActive) {
        disableRecruiterMode();
      } else {
        enableRecruiterMode(true);
      }
    });
  });

  if (bannerClose) {
    bannerClose.addEventListener('click', disableRecruiterMode);
  }
}

/* ==========================================================================
   QUICK SHARE TOAST CONTROLLER
   ========================================================================== */
function initQuickShare() {
  const shareBtns = document.querySelectorAll('.nav-share-btn, .quick-share-btn');
  
  shareBtns.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareUrl = window.location.href.split('#')[0];
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(shareUrl);
          showToast('🎉 Portfolio Link Copied!', 'Link copied to clipboard, ready to share with hiring managers.');
        } else {
          const tempInput = document.createElement('input');
          tempInput.value = shareUrl;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showToast('🎉 Portfolio Link Copied!', 'Link copied to clipboard, ready to share with hiring managers.');
        }
      } catch (err) {
        showToast('Link Ready', shareUrl);
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE CONSTELLATION / DATA NETWORK CANVAS
   ========================================================================== */
function initConstellationNetwork() {
  const canvas = document.getElementById('network-canvas');
  if (!canvas) return;

  const hero = document.getElementById('hero') || canvas.parentElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = hero.offsetWidth);
  let height = (canvas.height = hero.offsetHeight);

  const particles = [];
  const particleCount = Math.min(Math.floor((width * height) / 13000), 55);

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('resize', () => {
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  });

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  hero.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.65;
      this.vy = (Math.random() - 0.5) * 0.65;
      this.radius = Math.random() * 1.5 + 1.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse attraction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x += (dx / dist) * force * 1.1;
          this.y += (dy / dist) * force * 1.1;
        }
      }
    }

    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(129, 140, 248, 0.75)' : 'rgba(99, 102, 241, 0.65)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Inter-particle connection lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          const opacity = (1 - dist / 110) * (isDark ? 0.22 : 0.16);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(129, 140, 248, ${opacity})`
            : `rgba(99, 102, 241, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Cursor connection line
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - particles[i].x;
        const mdy = mouse.y - particles[i].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          const mOpacity = (1 - mdist / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = isDark
            ? `rgba(56, 189, 248, ${mOpacity})`
            : `rgba(79, 70, 229, ${mOpacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      particles[i].update();
      particles[i].draw(isDark);
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   CASE STUDY STEPPER CONTROLLER (projects.html)
   ========================================================================== */
function initCaseStudyStepper() {
  const stepBtns = document.querySelectorAll('.case-step-btn');
  const panels = document.querySelectorAll('.case-step-panel');
  if (!stepBtns.length || !panels.length) return;

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');

      stepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
      });

      const activePanel = document.getElementById(`case-step-${step}`);
      if (activePanel) {
        activePanel.style.display = 'block';
        activePanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   INTERACTIVE COURSEWORK DRAWERS CONTROLLER (index.html)
   ========================================================================== */
function initCourseworkDrawers() {
  const cards = document.querySelectorAll('.coursework-card');
  if (!cards.length) return;

  cards.forEach(card => {
    const trigger = card.querySelector('.coursework-trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      // Close other drawers for clean single-view accordion
      cards.forEach(c => {
        c.classList.remove('open');
        const t = c.querySelector('.coursework-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        card.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
