const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/page/dashboard.html'))
});

app.post('/calculate', (req, res) => { 
  res.json({
    success: true,
    message: "Calculation success!!"
  });
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
