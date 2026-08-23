// Single source of truth for resume link (Company-Specific)
const resumeLink = "https://drive.google.com/drive/folders/1NthA4NPIhBDI4ZM1E-vsp90s0x8BlR7E?usp=drive_link";

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navLinks = document.getElementById('nav-links');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
      const isExpanded = navLinks.classList.contains('mobile-active');
      hamburgerBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-active');
      });
    });
  }

  // Resume Download Button Link setup
  const resumeBtns = document.querySelectorAll('.download-resume-btn');
  resumeBtns.forEach(btn => {
    btn.setAttribute('href', resumeLink);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  // Certification Data Rendering Logic
  let showingAllCertifications = false;

  function renderCertifications() {
    const certContainer = document.getElementById('certifications-container');
    const toggleBtn = document.getElementById('toggle-cert-btn');

    if (!certContainer || typeof certificationsData === 'undefined') return;

    // Filter items based on toggle view, ensuring max 4 featured items when not showing all
    const filteredCerts = showingAllCertifications
      ? certificationsData
      : certificationsData.filter(cert => cert.featured === true).slice(0, 4);

    certContainer.innerHTML = '';

    filteredCerts.forEach(cert => {
      const card = document.createElement('div');
      card.className = 'card certificate-card';

      card.innerHTML = `
        <div class="cert-info">
          <h3>${cert.name}</h3>
          <div class="cert-issuer">${cert.issuer}</div>
          <div class="cert-meta">${cert.category}</div>
        </div>
        <a href="${cert.link}" target="_blank" rel="noopener noreferrer">
          <button class="view-btn">View Certificate</button>
        </a>
      `;

      certContainer.appendChild(card);
    });

    if (toggleBtn) {
      toggleBtn.innerText = showingAllCertifications
        ? "Show Featured Certifications Only"
        : "View All Certifications (" + certificationsData.length + ")";
    }
  }

  const toggleBtn = document.getElementById('toggle-cert-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      showingAllCertifications = !showingAllCertifications;
      renderCertifications();
    });
  }

  // Initial render
  renderCertifications();

  // Scroll active state highlighting for nav links
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector('.nav-links a[href*=' + sectionId + ']');

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
