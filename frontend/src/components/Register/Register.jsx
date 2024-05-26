import React, { useEffect, useState } from 'react';
import './Register.css';
import loginLogo from '../../LoginAssets/loginLogo.jpg';
import loginVideo from '../../LoginAssets/loginvideo.mp4';
import axios from 'axios';
import { useForm } from "react-hook-form";

const Register = () => {
  const [registerMessage, setRegisterMessage] = useState('');
  const [registerMessageHolder, setRegisterMessageHolder] = useState('message');

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const registerUser = (data) => {
    axios.post('http://localhost:3000/register', {
      Firstname: data.firstname,
      Lastname: data.lastname,
      Email: data.email,
      Username: data.username,
      Password: data.password,
      ConfirmPassword: data.confirmPassword
    })
    .then(() => {
      setRegisterMessage('User registered');
      setRegisterMessageHolder('message-success');
    })
    .catch((error) => {
      setRegisterMessage('Fill Form Again');
      setRegisterMessageHolder('message-error');
    });
  };

  useEffect(() => {
    if (registerMessage !== '') {
      const timer = setTimeout(() => {
        setRegisterMessage('');
        setRegisterMessageHolder('message');
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [registerMessage]);

  return (
    <div className="login-page register">
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
        <form className="login-form" onSubmit={handleSubmit(registerUser)}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstname">Firstname</label>
              <input 
                type="text" 
                id="firstname" 
                {...register('firstname', { required: 'Firstname is required' })} 
                placeholder='Enter Your firstname' 
              />
              {errors.firstname && <span>{errors.firstname.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastname">Lastname</label>
              <input 
                type="text" 
                id="lastname" 
                {...register('lastname', { required: 'Lastname is required' })} 
                placeholder='Enter Your lastname' 
              />
              {errors.lastname && <span>{errors.lastname.message}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
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
              placeholder='Enter Your Email' 
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                id="password" 
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })} 
                placeholder='Enter Your Password' 
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                id="confirmPassword" 
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value => value === watch('password') || 'Passwords do not match',
                })} 
                placeholder='Re-enter Your Password' 
              />
              {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
