import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesItem = [
        {
            "_id": "65ba873c25c05b6aa492f9b6",
            "user": "65b7b99532661a90ba8fec9d",
            "title": "routine",
            "description": "Practice 2 leetcode questions",
            "tag": "study",
            "date": "2024-01-31T17:45:32.340Z",
            "__v": 0
          },
          {
            "_id": "65be3b0e28f37025bcac79b7",
            "user": "65b7b99532661a90ba8fec9d",
            "title": "routine 2",
            "description": "Play badminton",
            "tag": "sports",
            "date": "2024-02-03T13:09:34.117Z",
            "__v": 0
          },
          {
            "_id": "65be3b2728f37025bcac79b9",
            "user": "65b7b99532661a90ba8fec9d",
            "title": "routine 3",
            "description": "Build some project",
            "tag": "Projects",
            "date": "2024-02-03T13:09:59.095Z",
            "__v": 0
          },
          {
            "_id": "65be3b3e28f37025bcac79bb",
            "user": "65b7b99532661a90ba8fec9d",
            "title": "routine 4",
            "description": "Learn machine learning",
            "tag": "study",
            "date": "2024-02-03T13:10:22.512Z",
            "__v": 0
          }
    ];
    const [notes,setNotes] = useState(notesItem);

    // Adding notes
    const addNote = (title,description,tag) => {
      const note = {
        "_id": "65be3b3e28f37025bcac79bb",
        "user": "65b7b99532661a90ba8fec9d",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-02-03T13:10:22.512Z",
        "__v": 0
      };
      setNotes(notes.concat(note));
    }

    // To delete the notes of user
    const deleteNote = () => {

    }

    // To fetch all the notes of user
    const fetchNotes = () => {

    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, fetchNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
