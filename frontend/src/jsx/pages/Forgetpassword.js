import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../scss/pages/Forgotpassword.scss';

export default function ForgetPassword() {
  let { handleSubmit, register } = useForm();
  let [message, setMSG] = useState('');
  let [err, setErr] = useState('');
  let [loading, setLoading] = useState(false);

  let onSubmit = async (obj) => {
    setLoading(true);

    try {
      let res = await axios.post(
        'http://ec2-54-90-254-70.compute-1.amazonaws.com:8086/api/public/forgotpassword',
        obj
      );

      setLoading(false);

      if (res.status === 200) {
        setErr('');
        setMSG(res.data.message);
      } else {
        setMSG('');
        setErr(res.data.message);
      }
    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 404) {
        setErr('User is not registered with us');
      } else {
        setErr('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='forgetpassword '>
      <h4 className='text-center fw-bold my-3'>Forget Password</h4>
      {loading ? (
        <p className='text-center mt-5 fs-4 fw-bold'>Sending request, please wait...</p>
      ) : (
        <form class='row g-3 ' onSubmit={handleSubmit(onSubmit)}>
          {message.length !== 0 && <h6 className='text-success text-center'>{message}</h6>}
          {err.length !== 0 && <h6 className='text-danger text-center'>{err}</h6>}
          <div class='col-md-12 '>
            <label for='email' class='form-label'>
              Email
            </label>
            <input
              type='email'
              class='form-control'
              placeholder='Enter your mail to send Forget Password reset link'
              {...register('email')}
              id='email'
            />
          </div>
          <div class='col-md-4'>
            <button id='btn' type='submit' class='btn btn-primary w-100'>
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
