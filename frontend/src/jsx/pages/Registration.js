import React,{useState} from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/pages/Registration.scss';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import backgrounImg from '../../images/backgroundImg.jpg';


function Registration() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [blocking, setBlocking] = useState(false);

  const onSubmit = async (obj) => {
    try {
      setBlocking(true);
      const res = await axios.post('http://localhost:8086/api/public/register', obj);
      if (res.data.status) {
        setBlocking(false);
        reset();
        navigate('/login');
      } else {
        setBlocking(false)
        setErrorMessage(res.data.message || "Email id is already in use");
      }
    } catch (error) {
      console.log("res.data.message", error)
      setBlocking(false);
      setErrorMessage((error.response.data && error.response.data.message) || "An error occurred during register. Please try again later.");
    }
  };

  return (
    <BlockUi tag="div" blocking={blocking}>
      <div className='background-image'>
                <img src={backgrounImg} alt="background-image" />
            </div>
        <div className='SignUp'>
      <h4 className='my-3'>Registration</h4>
      {errorMessage && <div className="text-danger text-left mt-3">{errorMessage}</div>}

      <form className="row g-3" autoComplete="off"onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="form-label">Enter your full name</label>
          <input type="text" className="form-control" autoComplete="off" role="presentation" id="name" {...register("name", { required: true, minLength: 3 })} />
          {errors.name && (errors.name.type === 'required' && (<span className='text-danger'>Full Name is required</span>))}
          {errors.name && (errors.name.type === "minLength" && (<span className="text-danger">Minimum length should be 3 characters</span>))}
        </div>

        <div>
          <label htmlFor="email" className="form-label">Enter your email</label>
          <input type="email" autoComplete="off" role="presentation"  className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" {...register("email",
           { required: 'Email is required',
           pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email address', },
           })} />
          {errors.email && ( <div className='invalid-feedback'>{errors.email.message}</div> )}
        </div>

        <div>
          <label htmlFor="pass" className="form-label">Create a password </label>
          <input type="password" autoComplete="off" role="presentation" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="pass" {...register('password', { required: 'Password is required',
           minLength: { value: 8, message: 'Minimum length should be 8 characters' },
           pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, message: 'Please enter minimum 1 digit, 1 Uppercase, 1 lowercase, and one special character!!' }
          })}
          />
          {errors.password && (<div className="invalid-feedback">{errors.password.message}</div> )}
        </div>

        {/* <div>
          <label htmlFor="cPass" className="form-label"> Confirm password </label>
          <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} id="cPass" {...register('confirmPassword', { required: 'Confirm Password is required', validate: (value) => value === getValues('password') || 'Passwords do not match' })} />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword.message}</div>
          )}
        </div> */}

        <div className="col-12">
          <button id='btn' type="submit" className="btn btn-primary w-100">Register</button>
        </div>
        <div className="text-center">
          <span>Already have an account?</span> <Link to="/login" className="register">Login</Link>
        </div>
      </form>
    </div>
    </BlockUi>

  );
}

export default Registration;
