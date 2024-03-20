import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [creds, setCreds] = useState({name: "", email: "", password: "", cpassword: ""});
  const host = "https://savenotes.onrender.com";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: creds.name, email: creds.email,password: creds.password})
      });
      const json = await response.json();
      localStorage.setItem("token", json.jwt_data);
      navigate("/");
    } catch (err) {
      console.log("Error message : ", err);
    }
  }

  const onChange = (e) => {
    setCreds({...creds, [e.target.name]: e.target.value})
  }

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="text" className="form-label">Name</label>
          <input type="name" className="form-control" name="name" onChange={onChange} value={creds.name} id="name"/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={creds.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} value={creds.password} id="password"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" onChange={onChange} value={creds.cpassword} id="cpassword"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
