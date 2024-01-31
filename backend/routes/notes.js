const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/notesData');
const { body, validationResult } = require('express-validator');

// router.get('/fetchnotes',fetchuser , async (req, res) => {
//     const note = await Note.find({user: req.user.id});
//     res.json(note);
// })

router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnotes', fetchuser, [
    body('title', 'Title should be minimum 3 characters').isLength({ min: 3 }),
    body('description', 'Description should be minimum 3 characters').isLength({ min: 3 })
], async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.send({ errors: result.array() });
        }
        // Creating a new note
        const note = new Note({
            title, description, tags, user: req.user.id
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


module.exports = router;