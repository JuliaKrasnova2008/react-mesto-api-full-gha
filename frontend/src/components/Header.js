import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/logo.svg";
export default function Header({ email, onExit }) {
  return (
    <header className="header">
      <div className="header__block">
        <div>
          <img
            className="header__logo"
            src={logo}
            alt="Логотип сайта Места России"
          />
        </div>
        <div>
          {email && <span className="header__email">{email}</span>}
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link className="user-form__sign" to={"/sign-in"}>
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link className="user-form__sign" to={"/sign-up"}>
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/"
              element={
                <Link
                  className="header__exit"
                  onClick={onExit}
                  to={"/sign-in"}
                  replace
                >
                  Выйти
                </Link>
              }
            />
          </Routes>
        </div>
      </div>
    </header>
  );
}
