import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Routes } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NoteState from './context/notes/noteState';
import Alerts from './components/Alerts';

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alerts message={"This is for alert box."} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
