import React, { useEffect } from 'react';
import './Login.css';
import loginLogo from '../../LoginAssets/loginLogo.jpg'; // Assuming loginLogo is the correct import
import loginVideo from '../../LoginAssets/loginvideo.mp4';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const NavitgateTo=useNavigate();
  const [statusHolder,setStatusHolder]=useState('message');
  const [loginStatus,setLoginStatus]=useState('');

  const loginUser=(e)=>{
    e.preventDefault();
      axios.post('http://localhost:3000/login', {
        LoginUsername: loginUsername,
        LoginPassword: loginPassword
      })
      .then((response) => {
        console.log(response);
        if(response.data.message){
          NavitgateTo('/');
          setLoginStatus('Credentials not matched')
        }
        else{
          NavitgateTo('/dashboard')
        }
      })
  }
  useEffect(()=>{
    if(loginStatus !==''){
      setStatusHolder('showMessage');
      setTimeout(()=>{
        setStatusHolder('message');
      },4000)
    }
    else{

    }
  },[loginStatus]);
  const onformSubmit =(e)=>{
    e.preventDefault();
    setLoginUsername('');
    setLoginPassword('');
  }
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
        <p className={statusHolder}>{loginStatus}</p>
        <form className="login-form" onSubmit={onformSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder='Enter Your Username'  onChange={(event) => setLoginUsername(event.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder='Enter Your Password' onChange={(event) => setLoginPassword(event.target.value)} />
          </div>
          <button type="button" onClick={loginUser}>Login</button>
          <p className='dont_have_account'>Don't have account? <button><a href='./register'>Register</a></button></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
