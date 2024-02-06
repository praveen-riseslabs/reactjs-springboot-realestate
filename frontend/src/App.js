
import React, { useEffect, Suspense } from 'react';
import {Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';
import Index from "./jsx";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./css/style.css";
import ForgetPassword from './jsx/pages/Forgetpassword';
import ResetPassword from './jsx/pages/Resetpassword';

const Login = React.lazy(() => import('./jsx/pages/Login'));
const Registration = React.lazy(()=> import('./jsx/pages/Registration'));

function App(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();    
    const location = useLocation().pathname;

    useEffect(() => {
        checkAutoLogin(dispatch, navigate, location);    
    }, []);

    let routeblog = (         
      <Routes>   
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/dashboard/*' element={<Index />} />
        <Route path='/forgetpassword' element={<ForgetPassword />} />
        <Route path='/reset_password' element={<ResetPassword />} />
      </Routes> 
      
    );

    if (props.isAuthenticated) {
      return (
        <>
          <Suspense fallback={              
            <div id="preloader">                
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>  
          }>
            <Index /> 
          </Suspense>
        </>
      );    
    } else {
      return (
        <div className="vh-100">
          <Suspense fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }>
            {routeblog}
            

          </Suspense>
        </div>
      );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default connect(mapStateToProps)(App);
