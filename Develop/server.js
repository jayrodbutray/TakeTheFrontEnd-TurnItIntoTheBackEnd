const express = require('express');
const cors = require('cors');
const path= require('path');
const noteData = require('./db/db.json');



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

const notes = [];
app.post('/api/notes', (req, res) => {

  
    const { title, text } = req.body;
    if (!title || !text){
        return res.status(400).json({error: 'Title and Text both required.'});
    }

    const newNotes = {title, text};
    notes.push(newNotes);

    const fs = require('fs');
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
    
    res.json({message: 'Note saved.', note: newNotes});
  });

app.listen(3001, () => {
    console.log('server is running');
});