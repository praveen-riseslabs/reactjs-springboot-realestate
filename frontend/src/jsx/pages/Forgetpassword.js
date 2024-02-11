import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../scss/pages/Forgotpassword.scss';
import { Link, useNavigate } from 'react-router-dom';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import backgrounImg from '../../images/backgroundImg.jpg';

export default function ForgetPassword() {
  const navigate = useNavigate();
  let { handleSubmit, register ,formState: { errors }} = useForm();
  let [message, setMSG] = useState('');
  let [err, setErr] = useState('');
  let [loading, setLoading] = useState(false);
  const [blocking, setBlocking] = useState(false);

  let onSubmit = async (obj) => {
    setLoading(true);

    try {
      setBlocking(true);
      let res = await axios.post('http://localhost:8086/api/public/forgotpassword', obj );
      setLoading(false);

      if (res.status === 200) {
        setBlocking(false);
        setErr('');
        setMSG(res.data.message);
        setTimeout(()=>{
           navigate("/login");
        }, 2000)
      } else {
        setBlocking(false);
        setMSG('');
        setErr(res.data.message);
        // setTimeout(()=>{
        //     navigate("/login");
        // }, 2000);
      }
    } catch (error) {
      setBlocking(false);
      setLoading(false);

      if (error.response && error.response.status === 404) {
        setBlocking(false);
        setErr('User is not registered with us');
        setMSG('');
      } else {
        setBlocking(false);
        setErr('An unexpected error occurred. Please try again later.');
        setMSG('');
      }
    }
  };

  const gotoLogin=()=> {
    navigate('/login');
  }

  return (
    <BlockUi tag="div" blocking={blocking}>
      <div className='background-image'>
          <img src={backgrounImg} alt="background-image" />
      </div>

      <div className='forgetpassword '>
        <h4 className='text-center fw-bold my-3'>Forgot Password</h4>
        {loading ? ( <p className='text-center mt-5 fs-4 fw-bold'>Sending request, please wait...</p>
        ) : (
        <form class='row g-3 ' autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
          {message.length !== 0 && <h6 className='text-success text-center'>{message}</h6>}
          {err.length !== 0 && <h6 className='text-danger text-center'>{err}</h6>}
          <div class='col-md-12 '>
            <label for='email' class='form-label'> Email </label>
            <input type='email' class='form-control' placeholder='Enter email address' id='email' {...register('email', { required: 'Please enter valid email address',
              pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: 'Invalid email address', }, })} />
              {errors.email && <span className="text-danger">{errors.email.message}</span>}
          </div>
             
          <div  style={{}}>
              <div  style={{float:"left"}}>
              <button id='btn'  onClick={()=> gotoLogin()} className='btn btn-secondary w-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Back&nbsp;&nbsp;&nbsp;&nbsp;</button>
              </div>
              <div c style={{float:"right"}}>
              <button id='btn' type="submit" className='btn btn-primary w-100'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>
              </div>
        </div>
        </form>
      )}
    </div>
    </BlockUi>
  );
}
