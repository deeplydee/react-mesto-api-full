import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = registerData;
    onRegister(email, password);
  };

  return (
    <section className="register">
      <h1 className="register__title">Регистрация</h1>
      <form className="register__form" name="register" onSubmit={handleSubmit}>
        <input
          className="register__data-input register__data-input_type_register-email"
          type="text"
          name="email"
          placeholder="Email"
          required
          id="register-email-input"
          value={registerData.email || ''}
          onChange={handleChange}
        />
        <input
          className="register__data-input register__data-input_type_register-password"
          type="password"
          name="password"
          placeholder="Пароль"
          required
          id="register-password-input"
          value={registerData.password || ''}
          onChange={handleChange}
        />
        <button className="register__form-submit" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="register__footer">
        Уже зарегистрированы?&nbsp;
        <Link to="/sign-in" className="register__link">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
