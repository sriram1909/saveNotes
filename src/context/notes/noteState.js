import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesItem = [];
    const [notes,setNotes] = useState(notesItem);

    // Adding notes
    const addNote = async (title,description,tag) => {
      // API
      const response = await fetch(`${host}/api/note/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGEiOiI2NWI3Yjk5NTMyNjYxYTkwYmE4ZmVjOWQifSwiaWF0IjoxNzA2NzE5OTY3fQ.1Nb7GwsyXc8VmT7FTSjBkPXRGm1ryx4EdNPHhRXim9g"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json);
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
    const deleteNote = async (id) => {
      const newNotes = notes.filter((note)=>{ return note._id !== id });
      setNotes(newNotes);
    }

    const editNotes = async (id,title,description,tag) => {
      // API
        const response = await fetch(`${host}/api/note/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGEiOiI2NWI3Yjk5NTMyNjYxYTkwYmE4ZmVjOWQifSwiaWF0IjoxNzA2NzE5OTY3fQ.1Nb7GwsyXc8VmT7FTSjBkPXRGm1ryx4EdNPHhRXim9g"
          },
          body: JSON.stringify({title,description,tag}),
        });
        const json = await response.json();
        console.log(json);
      // Logic
      for (let index = 0; index < notes.length; index++) {
        const element = notes[index];
        if(element._id === id){
          element.title = title;
          element.description = description;
          element.tag = tag;
        }
      }
    }

    // To fetch all the notes of user
    const fetchNotes = async () => {
      // API
      const response = await fetch(`${host}/api/note/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImRhdGEiOiI2NWI3Yjk5NTMyNjYxYTkwYmE4ZmVjOWQifSwiaWF0IjoxNzA2NzE5OTY3fQ.1Nb7GwsyXc8VmT7FTSjBkPXRGm1ryx4EdNPHhRXim9g"
        },
      });
      const json = await response.json();
      console.log(json);
      setNotes(json);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, fetchNotes, editNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
