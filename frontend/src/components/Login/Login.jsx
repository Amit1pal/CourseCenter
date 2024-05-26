import React, { useEffect } from 'react';
import './Login.css';
import loginLogo from '../../LoginAssets/loginLogo.jpg'; // Assuming loginLogo is the correct import
import loginVideo from '../../LoginAssets/loginvideo.mp4';
import axios from 'axios'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

const Login = () => {
  const NavitgateTo=useNavigate();
  const [statusHolder,setStatusHolder]=useState('message');
  const [loginStatus,setLoginStatus]=useState('');
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const loginUser=(data)=>{
      console.log('login data',data);
      axios.post('http://localhost:3000/login', {
        LoginEmail: data.email,
        LoginPassword: data.password
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
  return (
    <div className="login-page login">
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
        <form className="login-form" onSubmit={handleSubmit(loginUser)}>
          <div className="form-group">
            <label htmlFor="email">Username</label>
            <input  
              type="email" 
              id="email" 
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Enter a valid email address',
                },
              })} 
              placeholder='Enter Your Email'/>
          </div>
          {errors.email && <span>{errors.email.message}</span>}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" 
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })} 
            placeholder='Enter Your Password'/>
          </div>
          {errors.password && <span>{errors.password.message}</span>}
          <button type="submit">Login</button>
          <p className='dont_have_account'>Don't have account? <button className='register_btn_login'><a href='./register'>Register</a></button></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
