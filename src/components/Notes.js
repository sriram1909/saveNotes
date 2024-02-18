import React, { useContext, useEffect, useState, useRef } from 'react';
import NoteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNotes from './AddNotes';
import Alerts from './Alerts';
import { useNavigate } from 'react-router-dom';


const Notes = () => {
  const context = useContext(NoteContext);
  const navigate = useNavigate();
  const { notes, fetchNotes, editNotes } = context;

  // useEffect(() => {
  //   if (!dataFetched) {
  //     fetchNotes();
  //     setDataFetched(true);
  //   }
  // }, [dataFetched, fetchNotes]);

  useEffect(() => {
    if(localStorage.getItem('token')){
        fetchNotes();
    }
    else{
      navigate("/login");
    }
    // eslint-disable-next-line 
  },[]);

  const ref = useRef(null)
  const refClose = useRef(null)
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const handleClick = (e) => {
    editNotes(note.id, note.etitle, note.edescription, note.etag);
    <Alerts message = "Note modified successfully."/>
    refClose.current.click();
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNotes />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='container row my-3'>
        <h2>Your Notes</h2>
        {Array.isArray(notes) ? (
          notes.map((note) => (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          ))
        ) : (
          <div className="container">
            {notes.length === 0 && "No Notes to display"}
          </div>
        )}
      </div>
    </>
  )
}

export default Notes
