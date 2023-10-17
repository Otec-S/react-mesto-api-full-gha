import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header.js";
import WelcomeForm from "./WelcomeForm.js";
import * as auth from "../utils/auth.js";

export default function Register({ onRegister, isOpen, setIsRegistered }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // здесь обработчик регистрации
    const { email, password } = formValue;
    isOpen();

    auth
      .register(email, password)
      .then((response) => {
        console.log('response:', response);
        if (response.status === 201) {
          onRegister();
          navigate("/sign-in", { replace: true });
          return response.json();
        }
      })
      .then((res) => {
        return res;
      })
      .catch(console.error);
  }

  return (
    <>
      <Header buttonName="Войти" />
      <WelcomeForm
        title="Регистрация"
        buttonName="Зарегистрироваться"
        handleSubmit={handleSubmit}
        formValue={formValue}
        handleChange={handleChange}
      />

      <div className="welcomeform__question">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="welcomeform__link">
          Войти
        </Link>
      </div>
    </>
  );
}
