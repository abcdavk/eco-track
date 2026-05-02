function initNavbar() {
  // Mobile menu toggle
  const nav_ham = document.getElementById('nav-ham');
  if (!nav_ham) return;
  
  document.getElementById('nav-ham').addEventListener('click', () => {
    var nav = document.getElementById('nav-inner');
    var menu = document.getElementById('nav-menu');
    var isOpen = menu.classList.toggle('open');
    nav.classList.toggle('mobile-open', isOpen);
  });
   
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    var nav = document.getElementById('nav-inner');
    var menu = document.getElementById('nav-menu');
    if (!nav.contains(e.target) && menu.classList.contains('open')) {
      menu.classList.remove('open');
      nav.classList.remove('mobile-open');
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initNavbar();
})