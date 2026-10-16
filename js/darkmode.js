document.addEventListener('DOMContentLoaded', function() {
  const themeBtn = document.getElementById('themeToggle') 
                || document.getElementById('themeBtn');
  
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateButton(savedTheme);

  themeBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButton(newTheme);
  });

  function updateButton(theme) {
    if (theme === 'dark') {
      themeBtn.textContent = '☀️';
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
    } else {
      themeBtn.textContent = '🌙';
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
});
