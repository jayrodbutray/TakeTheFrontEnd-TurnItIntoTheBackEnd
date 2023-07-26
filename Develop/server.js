const express = require('express');
const cors = require('cors');
const path= require('path');
const noteData = require('./db/db.json');
const fs = require('fs');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) => res.send("Click button to start adding notes"));

app.get('/api/notes', (req, res) => res.json(noteData));

app.post('/api/notes', (req, res) => {

    res.json(`${req.method} request received to add a note`);
  
    const { title, text } = req.body;
  });

app.listen(3001, () => {
    console.log('server is running');
});