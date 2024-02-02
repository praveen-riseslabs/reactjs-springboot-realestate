
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
            if (res.status === 200) {
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
            <form class="row g-3 " onSubmit={handleSubmit(onSubmit)}>
                <div class="col-md-12 ">
                    <label for="userName" class="form-label" >User Name</label>
                    <input type="text" class="form-control" placeholder='Enter your name' {...register('name', { required: true })} id="userName" />
                    {errors.userName && (errors.userName.type === 'required' && (<span className='text-danger'>username cannot be blank</span>))}
                </div>

                <div className="col-md-12">
                    <label for="pass" class="form-label"> Password </label>
                    <input type="password" class="form-control" placeholder="Enter your password" {...register('password', { required: true })} id="pass" />
                    {errors.password && (errors.password.type === 'required' && (<span className='text-danger'>Required field</span>))}
                </div>
                <div class="forget-password text-end"><a onClick={() => navigate('/forgetpass')}>Forget password? </a> </div>
                <div class="col-12">
                    <button id='btn' type="submit" class="btn btn-primary w-100">Login</button>
                </div>

                <div class="text-center">
                    <span>Not a member?</span>  <a class="register" onClick={() => navigate('/register')}>  Register </a>
                </div>

            </form>
        </div>
    )
}

export default Login;