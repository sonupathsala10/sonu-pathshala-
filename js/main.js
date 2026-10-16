// ============ MENU TOGGLE ============
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const navBar = document.querySelector('.nav-bar');
  
  if (menuToggle && navBar) {
    menuToggle.addEventListener('click', function() {
      navBar.classList.toggle('open');
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !expanded);
    });
  }

  // ============ SMOOTH SCROLL ============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============ SHARE BUTTON ============
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async function() {
      const shareData = {
        title: 'Sonu Pathshala - BSEB Class 10',
        text: 'BSEB Class 10 ke liye free notes, PYQ, tests aur study material!',
        url: window.location.href
      };
      
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          alert('✅ Link copy ho gaya! Ab WhatsApp pe share karo.');
        }
      } catch (err) {
        console.log('Share cancelled');
      }
    });
  }

  // ============ SEARCH FUNCTIONALITY ============
  const searchInput = document.getElementById('siteSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.resource-card');
      
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ============ STUDY TIMETABLE ============
  const timetableBtn = document.getElementById('createTimetable');
  if (timetableBtn) {
    timetableBtn.addEventListener('click', function() {
      const subjectsInput = document.getElementById('subjects');
      const hoursInput = document.getElementById('hours');
      const result = document.getElementById('timetableResult');
      
      if (!subjectsInput || !hoursInput || !result) return;
      
      const subjects = subjectsInput.value.split(',').map(s => s.trim()).filter(s => s);
      const hours = parseFloat(hoursInput.value);
      
      if (subjects.length === 0 || !hours || hours <= 0) {
        result.innerHTML = '<p style="color:#FF7A00;">⚠️ Please subjects aur hours sahi se bharo.</p>';
        return;
      }
      
      const perSubject = (hours / subjects.length).toFixed(1);
      
      let html = '<h4 style="color:#1E5AA8; margin-bottom:10px;">📅 Aapka Study Plan</h4>';
      html += '<p style="margin-bottom:12px;">Total: <b>' + hours + ' hours/day</b> | ' + subjects.length + ' subjects</p>';
      html += '<ul style="list-style:none; padding:0;">';
      
      subjects.forEach((subject, i) => {
        html += '<li style="padding:8px 12px; background:#fff; border-left:4px solid #FF7A00; margin-bottom:8px; border-radius:6px;">';
        html += '<b>' + (i+1) + '. ' + subject + '</b> — ' + perSubject + ' hours';
        html += '</li>';
      });
      
      html += '</ul>';
      html += '<p style="margin-top:12px; font-size:11px; color:#666;">💡 Tip: Har subject ke beech 10 min break lo.</p>';
      
      result.innerHTML = html;
    });
  }

  // ============ YEAR IN FOOTER ============
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
