
import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.scss'
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import backgrounImg from '../../images/backgroundImg.jpg';


function Login() {
    let { handleSubmit, register, formState: { errors } } = useForm()
    let navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('');
    const [blocking, setBlocking] = useState(false);
 
    
    let onSubmit = async (obj) => {
        try {
            setBlocking(true);
            let res = await axios.post('http://localhost:8086/api/public/authenticate', obj)
            if (res.data.jwtToken ) {
              let token = res.data.jwtToken;
              localStorage.setItem('token', token)
              axios.get('http://localhost:8086/api/private/home', {
              headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                })
                .then((response1) => {
                    localStorage.setItem('userinfo', JSON.stringify(response1.data));
                    //Navigate to dashboard only after setting userinfo in localstorage
                    navigate('/dashboard')
                })
                .catch((error) => {
                    console.log(error);
                    setBlocking(false);
                    setErrorMessage(res.message || "An error occurred while fetching userinfo.");
                });
            }
            else {
                setBlocking(false);
                setErrorMessage(res.data.message || "Login failed. Please check your credentials.");
            }
        }
        catch (error) { 
            setBlocking(false);
            console.error(error)
            setErrorMessage("Email or password may be incorrect, please check and try again");
        }
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className='background-image'>
                <img src={backgrounImg} alt="background-image" />
            </div>
        <div className='login'>
            <h4 className='text-center fw-bold my-3'>Login</h4>

            <form className="row g-3 " autoComplete="off"  onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12 ">
            {errorMessage && <div className="text-danger text-left mt-3">{errorMessage}</div>}
            </div>
                <div className="col-md-12 ">
                    <label htmlFor="email" className="form-label" >Email</label>
                    <input type="text"  className="form-control" placeholder='Enter your email' id="email"  {...register('email', { required: 'Email is required',
                    pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email address', }, })} />
                    {errors.email && ( <div className='text-danger'>{errors.email.message}</div> )}
                </div>

                <div className="col-md-12">
                    <label htmlFor="pass" className="form-label"> Password </label>
                    <input type="password"   className="form-control" placeholder="Enter your password" {...register('password', { required: true })} id="pass" />
                    {errors.password && (errors.password.type === 'required' && (<span className='text-danger'>Required field</span>))}
                </div>
                <div className="forget-password text-end"><a onClick={() => navigate('/forgetpassword')}>Forgot password? </a> </div>
                <div className="col-12">
                    <button id='btn' type="submit" className="btn btn-primary w-100">Login</button>
                </div>
                <div className="text-center">
                    <span>Not a member?</span>  <a className="register" onClick={() => navigate('/register')}>  Register </a>
                </div>

            </form>
        </div>
        </BlockUi>
    )
}

export default Login;