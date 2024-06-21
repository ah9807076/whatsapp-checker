const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/check-number', (req, res) => {
  const phoneNumber = req.query.number;
  
  exec(
    `ts-node checker.ts 
    ${phoneNumber}
  `, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: 
        ${error}`
      );
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ number: phoneNumber, result: JSON.parse(stdout) });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
