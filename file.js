const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(express.json());

// Upload a new file
app.post('/files', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.status(201).send('File uploaded successfully.');
});

// Retrieve an uploaded file by name
app.get('/files/:name', (req, res) => {
  const { name } = req.params;
  fs.readFile(`uploads/${name}`, (err, data) => {
    if (err) {
      return res.status(404).send('File not found.');
    }
    res.send(data);
  });
});

// Delete an uploaded file by name
app.delete('/files/:name', (req, res) => {
  const { name } = req.params;
  fs.unlink(`uploads/${name}`, (err) => {
    if (err) {
      return res.status(404).send('File not found.');
    }
    res.status(204).send();
  });
});

app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
