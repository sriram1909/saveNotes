import React, { useState } from "react";
import NoteContext from "./noteContext";
import Alerts from "../../components/Alerts";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesItem = [];
  const [notes, setNotes] = useState(notesItem);

  // Adding notes
  const addNote = async (title, description, tag) => {
    // API
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (err) {
      console.log("Error message : ", err)
    }

  }

  // To delete the notes of user
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      const newNotes = notes.filter((note) => { return note._id !== id });
      setNotes(newNotes);
      <Alerts message = "Note deleted successfuly"/>;
      return json;
    } catch (err) {
      console.log("Error message : ", err)
    }

  }

  const editNotes = async (id, title, description, tag) => {
    // API
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({ title, description, tag }),
      });
      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes))
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
      return json;
    }
    catch (error) {
      console.log("Error : ", error);
    }
  }

  // To fetch all the notes of user
  const fetchNotes = async () => {
    // API
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (err) {
      console.log("Error message : ", err);
    }

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, fetchNotes, editNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
