import React, { useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.scss'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./authorization/Registration";
import Login from './authorization/Login';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../redux/actions/user';

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
  
  },[]);
  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar isAuth={isAuth} dispatch={dispatch} />
        <div className="wrap">
          {!isAuth &&
            <Routes>
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          }
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;