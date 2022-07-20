import './admin-panel.scss';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import UserService from "../../api/user.service";
import Sidebar from './Sidebar';
import Header from './Header';
import Empoyees from './Empoyees';
import EmployeeForm from './EmployeeForm';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);


  useEffect(() => {
    !isLoggedIn
      && navigate('/login');
  }, [isLoggedIn])


  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <div className="content">
          Статистики
          <Empoyees />
          Форма
          <EmployeeForm />
        </div>
      </div>
    </div>
  )

}

export default AdminPanel;