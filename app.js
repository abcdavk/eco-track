const express = require('express');
const path = require('path');

const app = express();

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});

app.post('/calculate', (req, res) => { 
  res.json({
    success: true,
    message: "Calculation success!!"
  });
});