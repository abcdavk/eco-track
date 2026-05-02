const express = require('express');
const path = require('path');

const app = express(); 

app.use(express.json());

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));

app.post('/calculate', (req, res) => {
  console.log(req.body)
  res.status(200).json({
    success: true,
    message: "Calculation success!!"
  });
});

app.get('/calculate', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Calculation success!!"
  });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
