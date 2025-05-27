const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9E2jYaxdWpesvcpaB4bq5W68yO4txuQR0GHRr9-aTQ0HOxv9NbzlZJE8gclHKM8K3/exec';

app.use(bodyParser.json());

app.post('/retrieve', async (req, res) => {
  try {
    const response = await axios.post(`${GOOGLE_SCRIPT_URL}?path=retrieve`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/save', async (req, res) => {
  try {
    const response = await axios.post(`${GOOGLE_SCRIPT_URL}?path=save`, req.body);
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Memory proxy is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
