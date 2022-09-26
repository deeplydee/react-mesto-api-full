import { useState } from 'react';

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = loginData;
    onLogin(email, password);
  };

  return (
    <section className="login">
      <h1 className="login__title">Вход</h1>
      <form className="login__form" name="login" onSubmit={handleSubmit}>
        <input
          className="login__data-input login__data-input_type_login-email"
          type="text"
          name="email"
          placeholder="Email"
          required
          id="login-email-input"
          value={loginData.email || ''}
          onChange={handleChange}
        />
        <input
          className="login__data-input login__data-input_type_login-password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          id="login-password-input"
          value={loginData.password || ''}
          onChange={handleChange}
        />
        <button className="login__form-submit" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
