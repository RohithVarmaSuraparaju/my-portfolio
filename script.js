console.log("🧠 script.js is running");

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded - Welcome Rohith!");

  // ✅ Global skill list
  let allSkills = [];

  // ✅ Load Skills
  fetch('data/skills.json')
    .then(response => response.json())
    .then(data => {
      console.log("✅ Loaded skills.json", data);
      allSkills = data;
      renderSkills("All");
      setupFilters();
    })
    .catch(err => console.error("❌ Error loading skills.json:", err));

  function renderSkills(category) {
    const container = document.getElementById('skills-grid');
    container.innerHTML = "";

    const filtered = category === "All"
      ? allSkills
      : allSkills.filter(skill => skill.category === category);

    if (filtered.length === 0) {
      container.innerHTML = `<p>No skills found for ${category}</p>`;
      return;
    }

    filtered.forEach(skill => {
      const badge = document.createElement("div");
      badge.className = "skill-badge";
      badge.innerHTML = `
        <img src="${skill.logo}" alt="${skill.name}" title="${skill.name}" />
        <span>${skill.name}</span>
      `;
      container.appendChild(badge);
    });
  }

  function setupFilters() {
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        renderSkills(category);
      });
    });
  }

  // ✅ Load Certifications
  fetch('data/certifications.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('certifications-list');
      if (!container) {
        console.error("Container for certifications not found");
        return;
      }

      container.innerHTML = "";

      data.forEach(cert => {
        const certCard = document.createElement("div");
        certCard.classList.add("cert-card", "fade-in-section");

        certCard.innerHTML = `
          <img src="${cert.logo}" alt="${cert.provider} Logo" class="cert-logo" />
          <p><a href="${cert.url}" target="_blank">${cert.title}</a></p>
        `;

        container.appendChild(certCard);
      });

      // 🔁 Fade-in observer
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in-section').forEach(card => {
        observer.observe(card);
      });
    })
    .catch(err => console.error("❌ Error loading certifications:", err));

  // ✅ Load Projects
  fetch('data/projects.json')
    .then(res => res.json())
    .then(projects => {
      const container = document.getElementById('projects-container');
      container.innerHTML = "";
      projects.forEach(p => {
        container.innerHTML += `
          <div class="project">
            <h3>${p.title}</h3>
            ${p.description ? `<p>${p.description}</p>` : ''}
            ${p.fullDetails ? `<p>${p.fullDetails.replace(/\n/g, '<br>')}</p>` : ''}
            <p><strong>Tech Stack:</strong> ${p.tech}</p>
            <p><strong>Published in:</strong> ${p.publishedIn}</p>
            <p><strong>Authors:</strong> ${p.authors}</p>
            <div class="project-links">
              <a href="${p.links.paper}" target="_blank">📘 View Published Paper</a><br>
              <a href="${p.links.expo}" target="_blank">🖼️ View Expo Summary</a><br>
              <a href="${p.links.certificate}" target="_blank">🎓 View Conference Certificate</a>
            </div>
          </div>
        `;
      });
    })
    .catch(err => console.error("❌ Error loading projects:", err));
});
// 🌙 Dark Mode Toggle
const toggle = document.getElementById('darkToggle');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  // Apply dark mode class to other sections
  document.querySelectorAll('header, footer, section').forEach(el => {
    el.classList.toggle('dark-mode');
  });

  // Also toggle on buttons and badges if needed
  document.querySelectorAll('.btn, .contact-button, .filter-btn, .skill-badge').forEach(el => {
    el.classList.toggle('dark-mode');
  });
});
