import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function FormLogin() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [btnDisabled, setBtnDisabled] = useState(true);

  const history = useHistory();

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    history.push('/meals');
  };

  useEffect(() => {
    const validationForm = () => {
      const MIN_PASSWORD_LENGTH = 6;
      if (
        login.email.includes('@')
        && login.email.includes('.com')
        && login.password.length > MIN_PASSWORD_LENGTH) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    };
    validationForm();
  }, [login]);

  return (
    <div className="center">
      <br />
      <h1>Login</h1>
      <label htmlFor="email">
        <input
          className="loginInput"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={ handleChange }
          data-testid="email-input"
        />
        <br />
      </label>
      <label htmlFor="password">
        <input
          className="loginInput"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={ handleChange }
          data-testid="password-input"
        />
        <br />
      </label>
      <button
        className="buttonLogin"
        type="button"
        onClick={ handleClick }
        disabled={ btnDisabled }
        data-testid="login-submit-btn"
      >
        Enter
      </button>
    </div>
  );
}

export default FormLogin;
