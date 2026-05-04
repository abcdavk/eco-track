const express = require('express');
const { type } = require('os');
const path = require('path');

const app = express(); 
const PORT = 3000;

app.use(express.json());

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));

app.post('/calculate', (req, res) => {
  const motor_k = 0.1;
  const car_k = 0.2;
  const ac_k = 0.5;
  const laptop_k = 0.05;

  let { distance, vehicle_type, ac_duration, laptop_duration } = req.body;

  const vehicle_k = vehicle_type === "motor" ? motor_k : car_k;
  const emission = (distance*vehicle_k) + (ac_duration*ac_k) + (laptop_duration*laptop_k);

  res.json({ emission });
});

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:3000');
});