const express = require('express');
const axios = require('axios');
const app = express();

const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw9E2jYaxdWpesvcpaB4bq5W68yO4txuQR0GHRr9-aTQ0HOxv9NbzlZJE8gclHKM8K3/exec';

app.use(express.json());

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_APPS_SCRIPT_URL, req.body, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    res.status(response.status).send(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).send({
      error: 'Proxy error',
      details: err.message
    });
  }
});

app.get('/', (req, res) => {
  res.send('GPT Memory Proxy is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy listening on port ${PORT}`);
});
