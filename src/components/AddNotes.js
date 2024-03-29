import React,{useContext,useState} from 'react'
import NoteContext from '../context/notes/noteContext'
import Alerts from './Alerts';

const AddNotes = () => {
    const context = useContext(NoteContext);
    const {addNote} = context;

    const [note,setNote] = useState({title: "",description: "",tag: ""})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        <Alerts message = "Note Added successfully."/>
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className='container my-5'>
            <h2>Add Notes</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange = {onChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange = {onChange}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tags</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange = {onChange}/>
                </div>

                <button type="submit" className="btn btn-primary" onClick = {handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNotes
