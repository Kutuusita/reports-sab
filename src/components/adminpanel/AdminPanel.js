import './admin-panel.scss';
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import UserService from "../../services/user.service";
import Sidebar from './Sidebar';
import Header from './Header';
import Empoyees from './Empoyees';

const AdminPanel = () => {

  const [content, setContent] = useState("");
  const { user: currentUser } = useSelector((state) => state.auth);
  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);

  if (!currentUser) {
    return <Navigate replace to="/login" />
  };

  return (
    <div className="admin-panel">
      <Sidebar />
      <div className="content-wrapper">
        <Header />
        <div className="content">
          Статистики
          <Empoyees />
        </div>
      </div>
    </div>
  )

}

export default AdminPanel;