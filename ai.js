const express = require('express');
const axios = require('axios');
const router = express.Router();

// AI Resource Generator endpoint
router.post('/resource-generator', async (req, res) => {
  const { topic, domain } = req.body;
  // Call Python FastAPI microservice
  const aiRes = await axios.post('http://localhost:8000/resource-generator', { topic, domain });
  res.json(aiRes.data);
});

module.exports = router;