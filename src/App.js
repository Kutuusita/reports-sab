import './App.scss';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Engineers from './components/widjets/Engineers';
import LoginForm from './components/authorization/LoginForm';
import AdminPanel from './components/adminpanel/AdminPanel'

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from "./helpers/history";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <BrowserRouter history={history}>
      {/* <Engineers /> */}
      <Routes>
        <Route exact path="/" element={<AdminPanel />} />
        <Route exact path="/aministration" element={<AdminPanel />} />
        <Route exact path="/login" element={<LoginForm />} />
        <Route exact path="/widget/engineers" element={<Engineers />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;