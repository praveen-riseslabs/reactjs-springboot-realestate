import React from 'react';
import { useForm } from 'react-hook-form';
import './Login.scss';

function Login() {
  const { register,handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='login'>
      <h4 className='text-center fw-bold my-3'>Login</h4>
      <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-12">
          <label htmlFor="userName" className="form-label">User Name</label>
          <input type="text" className="form-control" placeholder='Enter your name' {...register('userName', { required: true })} id="userName" />
          {errors.userName && (errors.userName.type === 'required' && (<span className='text-danger'>Username cannot be blank</span>))}
        </div>

        <div className="col-md-12">
          <label htmlFor="pass" className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" {...register('password', { required: true })} id="pass" />
          {errors.password && (errors.password.type === 'required' && (<span className='text-danger'>Required field</span>))}
        </div>

        <div className="forget-password text-end">
          <a href="#">Forget password?</a>
        </div>

        <div className="col-12">
          <button id='btn' type="submit" className="btn btn-primary w-100">Login</button>
        </div>

        <div className="text-center">
          <span>Not a member?</span> <a className="register" href="/signup">Register</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
