import './LoginForm.scss';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { login, logout } from '../../../actions/auth';

const required = (value) => {
  if (!value) {
    return (
      <div className="" role="alert">
        Это поле обязательно!
      </div>
    );
  }
};

const LoginForm = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector(state => state.auth);
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
      dispatch(login(username, password))
        .then(() => {
          console.log('Зарегались, теперь должна произойти переадресация');
          setLoading(false);
          // props.history.push('/profile');
          // window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false)
    }
  };
  const logOut = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    console.log('Проверили авторизацию, и переадресовываем');
    // navigate('/profile');
  } else {
    console.log('Не авторизованы', isLoggedIn);
  }

  const isLoggedInMsg = isLoggedIn ? 'авторизован' : 'не авторизован';
  return (
    <div className="login-page">
      <div className="login-form">
        <div className="login-form__heading heading center">Личный кабинет</div>
        <div className="center">
          ({isLoggedInMsg})
        </div>
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
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              Запомнить пароль
            </div>
            <div className="form-group">
              <button className="btn btn-s3" disabled={loading}>
                {loading && (
                  <span className="">Загрузка</span>
                )}
                <span>Войти</span>
              </button>
            </div>
            <div className="form-group">
              <div className="btn btn-s3" onClick={logOut}>
                <span>Выйти</span>
              </div>
            </div>
            {message && (
              <div className="form-group">
                <div className="" role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  )
}

export default LoginForm;