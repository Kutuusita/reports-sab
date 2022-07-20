import './LoginForm.scss';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { required } from '../../../helpers/validators/validators';
import { login, logout } from '../../../redux/actions/auth';

import md5 from 'md5';
import { useEffect } from 'react';

const LoginForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn, currentUser } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  }
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  }
  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, md5(password)))
        .then(() => {
          setLoading(false);
          navigate('/');
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false)
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      switch(currentUser.role){
        case 'Admin':
          navigate('/');
          break;
        case 'Engineer':
          navigate('/widget/engineers');
          break;
        case 'Manager':
          navigate('/');
          break;
        default:
          break;

      }
    }
  },[isLoggedIn])


  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-form__heading heading center">Личный кабинет</div>
        <div className="center">Введите свой логин и пароль для входа в систему!</div>
        <Form onSubmit={handleLogin} ref={form} className="login-form__form">
            <div className="form-group">
              <label htmlFor="username">Логин*</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль*</label>
              <Input
                autoComplete="on"
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group form-group--button">
              <button className="btn btn-s3" disabled={loading}>
                {
                loading
                ? ( <span className="">Загрузка</span> )
                : ( <span>Войти</span> )
                }
              </button>
            </div>
            {message && (

                <div className="" role="alert">
                  {message}
                </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default LoginForm;