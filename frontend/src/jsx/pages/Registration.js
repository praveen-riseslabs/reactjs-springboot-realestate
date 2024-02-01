import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/pages/Registration.scss';

function RegistrationForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  

  const onSubmit = async (obj) => {
    try {
      const res = await axios.post('http://ec2-54-90-254-70.compute-1.amazonaws.com:8086/api/public/register', obj);
      console.log(obj)
      console.log(res)
      if (res.data) {
        console.log('User Details are created')
        reset();
        navigate('/login');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='SignUp'>
      <h4 className='my-3'>Registration</h4>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="form-label">Enter your full name</label>
          <input type="text" className="form-control" id="name" {...register("name", { required: true, minLength: 3 })} />
          {errors.name && (errors.name.type === 'required' && (<span className='text-danger'>Full Name is required</span>))}
          {errors.name && (errors.name.type === "minLength" && (<span className="text-danger">Minimum length should be 3 characters</span>))}
        </div>

        <div>
          <label htmlFor="email" className="form-label">Enter your email</label>
          <input type="email" className="form-control" id="email" {...register("email", { required: true, minLength: 3 })} />
          {errors.email && (errors.email.type === 'required' && (<span className='text-danger'>Email is required</span>))}
        </div>

        <div>
          <label htmlFor="pass" className="form-label">Create a password </label>
          <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="pass" {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum length should be 6 characters' } })} />
          {errors.password && (<div className="invalid-feedback">{errors.password.message}</div>)}
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
  );
}

export default RegistrationForm;
