import './App.css';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import { Routes } from "react-router-dom";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
