import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Alerts from './Alerts';

const Login = () => {
  const [creds, setCreds] = useState({email: "",password: ""});
  const host = "http://localhost:5000";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email: creds.email,password: creds.password})
      });
      const json = await response.json();
      if(json.success){
        localStorage.setItem("token", json.jwt_data);
        navigate("/");
        <Alerts message = "Login Successful!"/>
      }
      else{
        <Alerts message = "Signed up Successfully"/>
      }
      console.log(json);
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
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email" onChange={onChange} value={creds.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} value={creds.password} id="password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
