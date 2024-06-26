import React, { useEffect } from 'react';
import Navbar from "./navbar/Navbar";
import './app.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./auth/Registration";
import Login from './auth/Login';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className='app'>
        <Navbar />
        <div className="wrap">
          <Routes>
            {!isAuth ? (
              <>
                <Route path="/registration" element={<Registration />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Disk />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;