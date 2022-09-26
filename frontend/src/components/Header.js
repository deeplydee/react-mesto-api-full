import { Switch, Route, Link } from 'react-router-dom';
import logo from '../images/header-logo.svg';

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Место Россия" />
      <Switch>
        <Route exact path="/">
          <div className="header__wrap">
            <p className="header__email">{email}</p>
            <Link to="/sign-in" onClick={onSignOut} className="header__link">
              Выйти
            </Link>
          </div>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
