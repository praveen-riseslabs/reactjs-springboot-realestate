import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadingToggleAction, loginAction } from '../../store/actions/AuthActions';
import axios from 'axios'; // Import axios

import './Login.scss';

function Login(props) {
  const [email, setEmail] = useState('demo@example.com');
  let errorsObj = { email: '', password: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('123456');

  const dispatch = useDispatch();
  const nav = useNavigate();

  async function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));

    try {
      const res = await axios.post('http://ec2-54-90-254-70.compute-1.amazonaws.com:8086/api/public/authenticate', {
        email,
        password,
      });

      dispatch(loginAction(email, password, nav));
    } catch (error) {
      console.error('Authentication failed', error);
    }
  }

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin}  className="form-validate">
                    <h3 className="text-center mb-4 text-black">Login</h3>
                    <div className="form-group mb-3">
                      <label className="mb-1"  htmlFor="val-email"><strong>Email</strong></label>
                      <div>
                        <input type="email" className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1"><strong>Password</strong></label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
					  <div class="forget-password text-end"><a >Forget password? </a> </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p>New User? <Link className="text-primary" to="/register">Register</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>	
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);