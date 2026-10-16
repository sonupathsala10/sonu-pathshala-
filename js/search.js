document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('siteSearch');
  
  if (!searchInput) return;

  const cards = document.querySelectorAll('.resource-card, .tip-card, .subject-pill');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const match = query === '' || text.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    let noResult = document.getElementById('noResult');
    if (visibleCount === 0 && query !== '') {
      if (!noResult) {
        noResult = document.createElement('div');
        noResult.id = 'noResult';
        noResult.className = 'empty-search';
        noResult.innerHTML = '<p style="padding:20px;text-align:center;color:#657187;">🔍 Koi result nahi mila: <b>' + query + '</b></p>';
        searchInput.closest('.section, .hero').appendChild(noResult);
      } else {
        noResult.innerHTML = '<p style="padding:20px;text-align:center;color:#657187;">🔍 Koi result nahi mila: <b>' + query + '</b></p>';
        noResult.style.display = '';
      }
    } else if (noResult) {
      noResult.style.display = 'none';
    }
  });

  // Enter key se search clear
  searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.value = '';
      this.dispatchEvent(new Event('input'));
    }
  });
});
