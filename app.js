const express = require('express');
const path = require('path');

const app = express(); 
const PORT = 3000;

app.use(express.json());

// Serve static files dari folder public
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html']
}));

app.listen(PORT, () => {
  console.log('Server berjalan di http://localhost:3000');
});
