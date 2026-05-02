function ecoTipInit() {
  const container = document.getElementById('ecoTipCheckboxes');
  if (!container) return;
  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const labels = container.querySelectorAll('label');
  if (!checkboxes) return;
  if (!labels) return;

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      localStorage.setItem(cb.id, cb.checked);
      labelStyleUpdate(cb);
    });
  });

  function labelStyleUpdate(cb) {
    labels.forEach((label) => {
      if (label.id === cb.id) {
        if (cb.checked) {
          label.style.textDecoration = 'line-through';
          label.style.opacity = '50%'
        }
        else {
          label.style.textDecoration = 'none';
          label.style.opacity = '100%'
        }
      }
    })
  }

  function loadCheckedCheckbox() {
    checkboxes.forEach(cb => {
      const checked = localStorage.getItem(cb.id, cb.checked) ?? false;
      cb.checked = checked === "true";

      labelStyleUpdate(cb);
    });
  }

  loadCheckedCheckbox();
}

window.addEventListener('DOMContentLoaded', () => {
  ecoTipInit();
});