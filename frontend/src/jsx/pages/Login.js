
import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.scss'


function Login() {
    let { handleSubmit, register, formState: { errors } } = useForm()
    let navigate = useNavigate()
 
    
    let onSubmit = async (obj) => {
        try {
            let res = await axios.post('http://ec2-54-90-254-70.compute-1.amazonaws.com:8086/api/public/authenticate', obj)
            console.log(res)
            if (res.data.jwtToken ) {
              let token = res.data.jwtToken;
              localStorage.setItem('token', token)
                navigate('/dashboard')
            }
            else {
                alert("Login failed")
            }
        }
        catch (error) {
            console.error(error)
        }

    }

    return (
        <div className='login'>
            <h4 className='text-center fw-bold my-3'>Login</h4>
            <form className="row g-3 " autocomplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className="col-md-12 ">
                    <label htmlFor="userName" className="form-label" >Email</label>
                    <input type="text" autocomplete="off"  className="form-control" placeholder='Enter your name' {...register('email', { required: true })} id="userName" />
                    {errors.userName && (errors.userName.type === 'required' && (<span className='text-danger'>username cannot be blank</span>))}
                </div>

                <div className="col-md-12">
                    <label htmlFor="pass" className="form-label"> Password </label>
                    <input type="password" autocomplete="off"  className="form-control" placeholder="Enter your password" {...register('password', { required: true })} id="pass" />
                    {errors.password && (errors.password.type === 'required' && (<span className='text-danger'>Required field</span>))}
                </div>
                <div className="forget-password text-end"><a onClick={() => navigate('/forgetpassword')}>Forget password? </a> </div>
                <div className="col-12">
                    <button id='btn' type="submit" className="btn btn-primary w-100">Login</button>
                </div>

                <div className="text-center">
                    <span>Not a member?</span>  <a className="register" onClick={() => navigate('/register')}>  Register </a>
                </div>

            </form>
        </div>
    )
}

export default Login;