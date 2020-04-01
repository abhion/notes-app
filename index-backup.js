const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3035;


const Schema = mongoose.Schema;
const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String
    }
});

app.use(express.json());

const Note = mongoose.model('Notes', notesSchema);

app.get('/notes', function(req, res){
    Note.find()
        .then(notes => {
            res.json(notes);
        })
        .catch(err => res.json(err));
});

app.get('/notes/:id', function(req, res){
    const id = req.params.id;
    Note.findById(id)
        .then(note => {
            if(note){
                res.json(note);
            }
            else{
                res.json({})
            }
        });
})

app.post('/notes', function(req, res){
    const note = new Note(req.body);
    note.save()
        .then(note => res.json(note))
        .catch(err => res.json(err));
})

app.delete('/notes/:id', function(req, res){
    const id = req.params.id;
    Note.findByIdAndDelete(id)
        .then(note => res.json(note))
        .catch(err => res.json(err))
})

app.put('/notes/:id', function(req, res){
    const id = req.params.id;
    const body = req.body;
    Note.findByIdAndUpdate(id, body, {new: true, runValidators: true})
        .then(note => !note ? res.json({}) : res.json(note))
        .catch(err => res.json(err));
})

mongoose.connect('mongodb://localhost:27017/notes-app')
    .then(res => console.log("connected to db"))
    .catch(err => console.log(err))

app.listen(port, function(){
    console.log("running on port 3035");
}) 