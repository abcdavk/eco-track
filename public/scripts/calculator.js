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
  const motorIcon = document.getElementById('motorIcon');
  const carIcon = document.getElementById('carIcon');

  const motorBtn = document.getElementById('motorBtn');
  const carBtn = document.getElementById('carBtn');
  
  if (!calculateBtn || !distanceTravel ||
    !acHours || !laptopHours ||
    !visualizer || !progressText ||
    !progressBarFill || !dottedCircle ||
    !middleEmissionText || !motorBtn ||
    !carBtn || !motorIcon || !motorIcon
  ) return;

  distanceTravel.addEventListener('input', () => formInputUpdate());
  acHours.addEventListener('input', () => formInputUpdate());
  laptopHours.addEventListener('input', () => formInputUpdate());

  let vehicle_type = 'motor';
  motorBtn.addEventListener('click', () => toggleBtnMotor())
  carBtn.addEventListener('click', () => toggleBtnCar())

  function toggleBtnMotor() {
    vehicle_type = 'motor';
    carBtn.style.backgroundColor = `var(--bg-100)`;
    carBtn.style.color = `var(--text)`;
    carIcon.style.fill = `var(--text)`;
    
    motorBtn.style.backgroundColor = `var(--green-400)`;
    motorBtn.style.color = `var(--text-white)`;
    motorIcon.style.fill = `var(--text-white)`;
    formInputUpdate()
  }
  function toggleBtnCar() {
    vehicle_type = 'car';
    motorBtn.style.backgroundColor = `var(--bg-100)`;
    motorBtn.style.color = `var(--text)`;
    motorIcon.style.fill = `var(--text)`;
  
    carBtn.style.backgroundColor = `var(--green-400)`;
    carBtn.style.color = `var(--text-white)`;
    carIcon.style.fill = `var(--text-white)`;
    formInputUpdate();
  }

  function formInputUpdate() {
    let emission = countEmission(distanceTravel.value, vehicle_type, acHours.value, laptopHours.value);
    emission = emission.toFixed(2);

    const percentage = Math.min(100, Math.max(0, (emission/max_daily_emission) * 100));
    const t = percentage/100;
    const rotation = 360 * t;
    let hue;
    
    if (emission <= 2) {
      hue = 280;
    } else if (emission <= 5) {
      hue = 200;
    } else {
      hue = 130;
    }

    progressBarFill.style.width = `${percentage}%`;
    progressText.innerHTML = `${emission} KG CO2e`;

    const intensity = emission > 5 ? 0.2 : 0;
    visualizer.style.backgroundImage = `radial-gradient(rgba(255,255,255,0.7), rgba(0,68,255,${intensity})), url("../../img/your_impact.webp")`;

    const saturate = emission > 5 ? " saturate(300%)" : "";
    visualizer.style.filter = `hue-rotate(${hue}deg)${saturate}`;

    dottedCircle.style.transform = `rotate(${rotation}deg)`;
    middleEmissionText.innerHTML = `${percentage.toFixed()}%`;
  }
  toggleBtnMotor();
  formInputUpdate();
}

function countEmission(distance = 0, vehicle_type = "motor", ac_dur = 0, laptop_dur = 0) {
   const vehicle_k = vehicle_type === "motor" ? motor_k : car_k;
   return (distance*vehicle_k) + (ac_dur*ac_k) + (laptop_dur*laptop_k);
}

window.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});