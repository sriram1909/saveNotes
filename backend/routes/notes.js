const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/notesData');
const { body, validationResult } = require('express-validator');

// Route-1 : fetching all the notes through route(/api/note/fetchallnotes)
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.data });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route-2 : Adding a new note through route(/api/note/addnotes)
router.post('/addnotes', fetchuser, [
    body('title', 'Title should be minimum 3 characters').isLength({ min: 3 }),
    body('description', 'Description should be minimum 3 characters').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        // Creating a new note
        const note = new Note({
            title, description, tag, user: req.user.data// saved the session details of the user in data.
        });
        // saving the note
        const newNote = await note.save();
        res.json(newNote);// Returning the user notes in json.
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route-3 : Updating a note through route(/api/note/updatenote/:id)
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tags } = req.body;

    // Creating a new note
    const newNote = {};

    if (title) { newNote.title = title; }
    if (description) { newNote.description = description; }
    if (tags) { newNote.tags = tags; }

    try {
        //Finding the note of the user
        let note = await Note.findOne({ user: req.params.id });
        if (!note) {
            return res.status(404).send("Note not found.");
        }
        //checking if the user is updating his notes not someone else's
        if (note.user.toString() !== req.params.id) {
            return res.status(401).send("Not Allowed");
        }
        // Updating the note by Id into new note.
        let noteId = note.id;
        note = await Note.findByIdAndUpdate(noteId, { $set: newNote }, { new: true });
        
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route-4: Deleting a note through route(/api/note/deletenote/:id)
router.delete('/deletenote/:id',fetchuser, async (req, res) => {
    try {
        let note = await Note.findOne({ user: req.params.id });
        if (!note) {
            return res.status(404).send("Note not found.");
        }

        //checking if the user is deleting his notes not someone else's
        if (note.user.toString() !== req.params.id) {
            return res.status(401).send("Not Allowed");
        }

        //deleting the node from the database.
        let noteId = note.id;
        note = await Note.findByIdAndDelete(noteId);

        res.json({ "Success":"Deletion successful",note:note });// Sending a success note upon deletion.
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;