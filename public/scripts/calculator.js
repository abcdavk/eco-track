const motor_k = 0.1;
const car_k = 0.2;
const ac_k = 0.5;
const laptop_k = 0.05;
const max_daily_emission = 15.0;

function initCalculator() {
  const calculateBtn = document.getElementById('calculateBtn');
  const distanceTravel = document.getElementById('distanceTravel');
  const acHours = document.getElementById('acHours');
  const laptopHours = document.getElementById('laptopHours');
  const visualizer = document.getElementById('visualizer');
  const progressText = document.getElementById('progressText');
  const progressBarFill = document.getElementById('progressBarFill');
  const dottedCircle = document.getElementById('dottedCircle');
  const middleEmissionText = document.getElementById('middleEmissionText');

  if (!calculateBtn) return;
  if (!distanceTravel) return;
  if (!acHours) return;
  if (!laptopHours) return;
  if (!visualizer) return;

  distanceTravel.addEventListener('input', () => formInputUpdate());
  acHours.addEventListener('input', () => formInputUpdate());
  laptopHours.addEventListener('input', () => formInputUpdate());

  function formInputUpdate() {
    const hueRed = 150;
    const hueGreen = 280;

    let emission = countEmission(distanceTravel.value, "motor", acHours.value, laptopHours.value);
    emission = emission.toFixed(2)

    const percentage = Math.min(100, Math.max(0, (emission/max_daily_emission) * 100));
    const t = percentage/100;
    const hue = hueGreen + (hueRed - hueGreen) * t;
    const rotation = 360 * t;

    progressBarFill.style.width = `${percentage}%`;
    progressText.innerHTML = `${emission} KG CO2e`;
    visualizer.style.filter = `hue-rotate(${hue}deg)`;

    dottedCircle.style.transform = `rotate(${rotation}deg)`
    middleEmissionText.innerHTML = `${percentage.toFixed()}%`
  }
}

function countEmission(distance = 0, vehicle_type = "motor", ac_dur = 0, laptop_dur = 0) {
   const vehicle_k = vehicle_type === "motor" ? motor_k : car_k;
   return (distance*vehicle_k) + (ac_dur*ac_k) + (laptop_dur*laptop_k);
}

window.addEventListener('DOMContentLoaded', () => {
  initCalculator();
})