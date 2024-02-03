import { lazy, Suspense, useEffect, } from 'react';

/// Components
import Index from "./jsx";
import { connect, useDispatch } from 'react-redux';
import {  Route, Routes,BrowserRouter, useLocation , useNavigate , useParams } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { isAuthenticated } from './store/selectors/AuthSelectors';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import "./css/style.css";

import Dashboard from './jsx/pages/Dashboard';
import ForgetPassword from './jsx/pages/Forgetpassword';
import ResetPassword from './jsx/pages/Resetpassword';
import Registration from './jsx/pages/Registration';
import Login from './jsx/pages/Login'



const App = () =>{
		  return (
			
        <Routes>   
          <Route  path='/login' element={<Login />} />
          <Route  path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />        
          <Route path='/dashboard' element={<Dashboard />} />        
          <Route path='/forgetpassword' element={<ForgetPassword />} />        
          <Route path='/reset_password' element={<ResetPassword />} />        
        </Routes> 
      );    
	
};

export default App;

