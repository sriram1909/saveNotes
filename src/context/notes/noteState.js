import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesItem = [];
    const [notes,setNotes] = useState(notesItem);

    // Adding notes
    const addNote = async (title,description,tag) => {
      // API
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViN2I5OTUzMjY2MWE5MGJhOGZlYzlkIn0sImlhdCI6MTcwNzgxOTkzNn0.mxgLUcXYNOPDWCNZxfmvmwCadmuZ0Zu1m7D3NFjYZrQ"
        },
        body: JSON.stringify({title,description,tag}),
      });
      const json = await response.json();
      console.log(json);
      const note = {
        "title": title,
        "description": description,
        "tag": tag,
      };
      setNotes(notes.concat(note));
    }

    // To delete the notes of user
    const deleteNote = async (id) => {
      try{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViN2I5OTUzMjY2MWE5MGJhOGZlYzlkIn0sImlhdCI6MTcwNzgxOTkzNn0.mxgLUcXYNOPDWCNZxfmvmwCadmuZ0Zu1m7D3NFjYZrQ"
          },
        });
        const json = await response.json();
        const newNotes = notes.filter((note)=>{ return note._id !== id });
        setNotes(newNotes);
        return json;
      }catch(err){
        console.log("Error message : ", err)
      }
      
    }

    const editNotes = async (id,title,description,tag) => {
      // API
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViN2I5OTUzMjY2MWE5MGJhOGZlYzlkIn0sImlhdCI6MTcwNzgxOTkzNn0.mxgLUcXYNOPDWCNZxfmvmwCadmuZ0Zu1m7D3NFjYZrQ"
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
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjViN2I5OTUzMjY2MWE5MGJhOGZlYzlkIn0sImlhdCI6MTcwNzgxOTkzNn0.mxgLUcXYNOPDWCNZxfmvmwCadmuZ0Zu1m7D3NFjYZrQ"
        },
      });
      const json = await response.json();
      setNotes(json);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, fetchNotes, editNotes}}>
            {props.children}
        </NoteContext.Provider>
    );
};

export default NoteState;
