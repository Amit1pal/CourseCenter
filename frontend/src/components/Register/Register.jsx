import React, { useEffect, useState } from 'react';
import './Register.css';
import loginLogo from '../../LoginAssets/loginLogo.jpg';
import loginVideo from '../../LoginAssets/loginvideo.mp4';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerMessage,setRegisterMessage]=useState('');
  const [registerMessageHolder,setRegisterMessageHolder]=useState('message');

  const registerUser = () => {
    axios.post('http://localhost:3000/register', {
      Email: email,
      Username: username,
      Password: password
    })
    .then(() => {
      setRegisterMessage('User registered');
      setEmail('');
      setUsername('');
      setPassword('');
    })
    .catch((error) => {
      setRegisterMessage('Fill Form Again');
    });

  }
  useEffect(()=>{
    setTimeout(()=>{
      registerMessageHolder('message')
    },4000);
  },[])

  return (
    <div className="login-page">
      <div className="video-background">
        <video autoPlay muted loop>
          <source src={loginVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={loginLogo} alt="Logo" />
        </div>
        <p className={registerMessageHolder}>{registerMessage}</p>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" placeholder='Enter Your Email' required onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder='Enter Your Username' required onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder='Enter Your Password'required onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type="button" onClick={registerUser}>Register</button>
        </form>
      </div>
    </div>

  )
}

export default Register;
