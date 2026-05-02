const messages = [
  "You haven’t started yet. Every small step matters—pick one eco-friendly habit to begin today.",
  "Great start! One small change can make a difference. Keep going!",
  "Nice progress! You’re already reducing your impact—let’s add one more!",
  "Well done! You’re building strong eco habits. Keep the momentum going!",
  "Amazing effort! You’re making a real difference for the planet.",
  "Outstanding! You’re living sustainably and setting a great example for others."
];

function ecoTipInit() {
  const container = document.getElementById('ecoTipCheckboxes');
  if (!container) return;

  const checkboxes = container.querySelectorAll('input[type="checkbox"]');
  const labels = container.querySelectorAll('label');
  const ecoTivation = document.getElementById('ecoTivation');

  if (!checkboxes || !labels || !ecoTivation) return;

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      localStorage.setItem(cb.id, cb.checked);
      labelStyleUpdate(cb);
      updateMessage();
    });
  });

  function labelStyleUpdate(cb) {
    labels.forEach(label => {
      if (label.htmlFor === cb.id) {
        if (cb.checked) {
          label.style.textDecoration = 'line-through';
          label.style.opacity = '0.5';
        } else {
          label.style.textDecoration = 'none';
          label.style.opacity = '1';
        }
      }
    });
  }

  function updateMessage() {
    let checkedCount = 0;

    checkboxes.forEach(cb => {
      if (cb.checked) checkedCount++;
    });

    ecoTivation.innerText = messages[checkedCount];
  }

  function loadCheckedCheckbox() {
    checkboxes.forEach(cb => {
      const checked = localStorage.getItem(cb.id);
      cb.checked = checked === "true";

      labelStyleUpdate(cb);
    });

    updateMessage();
  }

  loadCheckedCheckbox();
}

window.addEventListener('DOMContentLoaded', () => {
  ecoTipInit();
});