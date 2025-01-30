const express = require('express');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Create a client for the Google Vision API
const client = new ImageAnnotatorClient();

// Endpoint to handle image upload and text recognition
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const [result] = await client.textDetection(req.file.path);
    const detections = result.textAnnotations;
    const recognizedText = detections.length > 0 ? detections[0].description : 'No text recognized';
    res.json({ text: recognizedText });
  } catch (error) {
    console.error('Error recognizing text:', error);
    res.status(500).send('Error recognizing text');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});