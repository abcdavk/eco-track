const max_daily_emission = 15.0;

async function sendData(distance, vehicle_type, ac_duration, laptop_duration) {
  try {
    const res = await fetch('/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "distance": parseInt(distance),
        "vehicle_type": vehicle_type,
        "ac_duration": parseInt(ac_duration),
        "laptop_duration": parseInt(laptop_duration)
      })
    });

    if (!res.ok) throw new Error('Request failed');

    const { emission } = await res.json();

    return emission;
  } catch (error) {
    console.error(error);    
  }
}

function initCalculator() {
  const calculateBtn = document.getElementById('calculateBtn');
  const resetCalculation = document.getElementById('resetCalculation');
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

  const motorChart = document.getElementById('motorChart');
  const carChart = document.getElementById('carChart');
  const acChart = document.getElementById('acChart');
  const laptopChart = document.getElementById('laptopChart');
  
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
  motorBtn.addEventListener('click', () => toggleBtnMotor());
  carBtn.addEventListener('click', () => toggleBtnCar());

  calculateBtn.addEventListener('click', () => onClickCalculate());
  resetCalculation.addEventListener('click', () => onClickResetCalculation());

  

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

  async function formInputUpdate() {
    let emission = await sendData(distanceTravel.value, vehicle_type, acHours.value, laptopHours.value);
    let loadedEmission = loadCalculation();
    emission += parseInt(loadedEmission);
    emission = emission.toFixed(2);


    const percentage = Math.min(100, Math.max(0, (emission/max_daily_emission) * 100));
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

    middleEmissionText.innerHTML = `${percentage.toFixed()}%`;
  }

  async function onClickCalculate() {
    let emission = await sendData(distanceTravel.value, vehicle_type, acHours.value, laptopHours.value);
    let loadedEmission = loadCalculation();
    emission += parseInt(loadedEmission);
    emission = emission.toFixed(2);

    const percentage = Math.min(100, Math.max(0, (emission/max_daily_emission) * 100));
    const t = percentage/100;
    
    const rotation = 360 * t;
    dottedCircle.style.transform = `rotate(${rotation}deg)`;
    
    localStorage.setItem("emission", emission);
    const motorDistanceData = parseInt(localStorage.getItem("motorDistanceData"));
    const carDistanceData = parseInt(localStorage.getItem("carDistanceData"));
    const acHoursData = parseInt(localStorage.getItem("acHoursData"));
    const laptopHoursData = parseInt(localStorage.getItem("laptopHoursData"));

    if (vehicle_type === "car") {
      localStorage.setItem("carDistanceData", carDistanceData+parseInt(distanceTravel.value));
    } else {
      localStorage.setItem("motorDistanceData", motorDistanceData+parseInt(distanceTravel.value));
    }
    updateBarChart();

    resetFormInput();
  }
  function loadCalculation() {
    const emission = localStorage.getItem("emission") ?? "0";

    return parseFloat(emission);
  }

  function onClickResetCalculation() {
    dottedCircle.style.transform = `rotate(0deg)`;

    localStorage.setItem("emission", 0);
    resetBarChart();
    resetFormInput();
    formInputUpdate();
  }

  function resetFormInput() {
    distanceTravel.value = '';
    acHours.value = '';
    laptopHours.value = '';
  }

  function resetBarChart() {
    localStorage.setItem('car_distance', 0);
    localStorage.setItem('motor_distance', 0);
    localStorage.setItem('ac_duration', 0);
    localStorage.setItem('laptop_duration', 0);
    
    carChart.style.width = `0%`
    motorChart.style.width = `0%`
    acChart.style.width = `0%`
    laptopChart.style.width = `0%`

    carChart.innerHTML = `<p>0%</p>`
    motorChart.innerHTML = `<p>0%</p>`
    acChart.innerHTML = `<p>0%</p>`
    laptopChart.innerHTML = `<p>0%</p>`
  }

  function updateBarChart() {
    let distance = parseInt(distanceTravel.value) || 0;
    let ac_duration = parseInt(acHours.value) || 0;
    let laptop_duration = parseInt(laptopHours.value) || 0;
    
    let ac_duration_saved = parseInt(localStorage.getItem('ac_duration')) || 0;
    let laptop_duration_saved = parseInt(localStorage.getItem('laptop_duration')) || 0;

    let car_distance = parseInt(localStorage.getItem('car_distance')) || 0;
    let motor_distance = parseInt(localStorage.getItem('motor_distance')) || 0;

    if (vehicle_type === 'car') {
      car_distance += distance;
    } else {
      motor_distance += distance;
    }

    ac_duration += ac_duration_saved;
    laptop_duration += laptop_duration_saved;

    const total = car_distance + motor_distance + ac_duration + laptop_duration;

    const carPercent = (car_distance/total)*100;
    const motorPercent = (motor_distance/total)*100;
    const acPercent = (ac_duration/total)*100;
    const laptopPercent = (laptop_duration/total)*100;

    carChart.style.width = `${carPercent}%`
    motorChart.style.width = `${motorPercent}%`
    acChart.style.width = `${acPercent}%`
    laptopChart.style.width = `${laptopPercent}%`

    if (!Number.isNaN(carPercent) || !Number.isNaN(motorPercent) ||
      !Number.isNaN(acPercent) || !Number.isNaN(laptopPercent)
    ) {
      localStorage.setItem('car_distance', car_distance);
      localStorage.setItem('motor_distance', motor_distance);
      localStorage.setItem('ac_duration', ac_duration);
      localStorage.setItem('laptop_duration', laptop_duration);

      carChart.innerHTML = `<p>${carPercent.toFixed()}%</p>`
      motorChart.innerHTML = `<p>${motorPercent.toFixed()}%</p>`
      acChart.innerHTML = `<p>${acPercent.toFixed()}%</p>`
      laptopChart.innerHTML = `<p>${laptopPercent.toFixed()}%</p>`
    } else {
      carChart.style.width = `0%`
      motorChart.style.width = `0%`
      acChart.style.width = `0%`
      laptopChart.style.width = `0%`
      carChart.innerHTML = `<p>0%</p>`
      motorChart.innerHTML = `<p>0%</p>`
      acChart.innerHTML = `<p>0%</p>`
      laptopChart.innerHTML = `<p>0%</p>`
    }
  }

  toggleBtnMotor();
  formInputUpdate();
  updateBarChart();
}

window.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});