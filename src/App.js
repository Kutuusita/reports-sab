import './App.scss';

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";

import Engineers from './components/widjets/Engineers';
import LoginForm from './components/authorization/LoginForm';
import AdminPanel from './components/adminpanel/AdminPanel'

import { clearMessage } from "./redux/actions/message";
import { history } from "./helpers/history";
import { setEmployees, setRoles } from './redux/actions/users';
import UserService from './api/user.service';

const App = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth);
  const { employees, roles } = useSelector(state => state.users);

  const init = () => {
    !employees.length && dispatch(setEmployees());
    !roles.length && dispatch(setRoles());
  }

  useEffect(() => {
    if (isLoggedIn) {
      init();
    }
  }, []);

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  });

  useEffect(() => {
    // UserService.addEditEmployee().then((resp) => {
    //   dispatch(setEmployees());
    //   console.log(resp);
    // });

  }, []);



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