import React, { useContext } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';


const Notes = () => {
    const context = useContext(NoteContext);
  // eslint-disable-next-line
  const {notes,setNotes} = context;
  return (
    <>
    <AddNotes/>
    <div className = 'container row my-3'>
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key = {note._id} note = {note}/>;
        })}
    </div>
    </>
  )
}

export default Notes
