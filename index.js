const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url}`
  );
  next();
});
app.use(express.static('public'));
app.get('/api/check-number', (req, res) => {
  const phoneNumber = req.query.number;

  // Logging the request
  console.log(
    `Received request to check number: ${phoneNumber}`
  );

  // Replace the following mock logic with your actual logic
  try {
    const result = checkWhatsAppNumber(phoneNumber);
    res.json({
      number: phoneNumber,
      exists: result
    });
  } catch (error) {
    console.error(
      `Error handling request: ${error}`
    );
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});
function checkWhatsAppNumber(phoneNumber) {
  // Mocked checking logic for demonstration
  const knownNumbers = {
    '+201008307668': true, // Assuming this number exists on WhatsApp
    '+201008307669': false // Assuming this number doesn't exist on WhatsApp
  };
  return knownNumbers[phoneNumber] || false;
}
app.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port}`
  );
});
