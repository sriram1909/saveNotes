import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


const Notes = () => {
    const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {notes,setNotes} = context;
  return (
    <div className = 'container row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key = {note._id} note = {note}/>;
        })}
    </div>
  )
}

export default Notes
