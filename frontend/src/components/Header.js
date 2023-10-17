import logoWhite from "../images/header-logo-white.svg";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Header({ buttonName, usersEmail, buttonSignOut, handleUnLogin, setCurrentUser }) {
  const navigate = useNavigate();
  function onSignOut() {
    localStorage.removeItem("token");
    handleUnLogin(); // устанавливаем стейт isLoggedIn в положение false
    setCurrentUser({});
    navigate("/sign-in", { replace: true });
  }

  return (
    <header className="header">
      <img src={logoWhite} className="header__logo" alt="Логотип Место" />
      <div>
        <span className="header__button">{usersEmail}</span>
        <Link
          to={
            (buttonName === "Регистрация" && "/sign-up") ||
            (buttonName === "Войти" && "/sign-in")
          }
          className="header__button"
        >
          {buttonName}
        </Link>
        <button onClick={onSignOut} className="header__button">
          {buttonSignOut}
        </button>
      </div>
    </header>
  );
}

export default Header;
