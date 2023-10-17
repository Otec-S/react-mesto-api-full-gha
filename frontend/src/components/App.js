import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register.js";
import Login from "./Login.js";

import api from "../utils/api.js";
import * as auth from "../utils/auth.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";
import { Routes, Route } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

import React from "react";
import ProtectedRouteElement from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  //ПЕРЕМЕННЫЕ

  const navigate = useNavigate();

  //СТЕЙТЫ

  //переменная состояния для данных о User
  const [currentUser, setCurrentUser] = React.useState({});

  //стейт эл почты зарегистрированного лица
  const [usersEmail, setUsersEmail] = React.useState(null);

  //устанавливаем переменную состояние <cards> (список карточек)
  const [cards, setCards] = React.useState([]);

  //переменная состояния для данных о залогинивании пользователя
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // console.log('isLoggedIn in app.js:', isLoggedIn);

  //переменная для отслеживания состояния загрузки
  const [isLoading, setIsLoading] = React.useState(false);

  //стейты для попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  //стейт отктрытия попапа InfoTooltip
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(false);

  //стейт для Big Card
  const [selectedCard, setSelectedCard] = React.useState({});

  //СЕТТЕРЫ СТЕЙТОВ

  //обработчик стейта для Big Card
  function handleCardClick(item) {
    setSelectedCard(item);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleInfoTooltipClick() {
    setIsInfoTooltipOpen(true);
  }

  //меняем стейт isRegistered на true
  function handleRegister() {
    setIsRegistered(true);
  }
  //меняем isLoggedIn на true
  function handleLogin() {
    setIsLoggedIn(true);
  }

  //меняем isLoggedIn на false
  function handleUnLogin() {
    setIsLoggedIn(false);
  }

  //ФУНКЦИИ

  // !!!!!!!!!!!!!! НЕ срабатвает при первом логировании пользователя !!!!!!!!!!!!!!!
  //эффект при монтировании для currentUser и для получения карточек с сервера
  React.useEffect(() => {
    // console.log("сработал первый isLoggedIn");

    //только если пользователь залогирован
    if (isLoggedIn) {
      //получаем данные о пользователе с сервера

      api
        .getUserInfo()
        .then((res) => {
          // console.log("res in api.getUserInfo():", res);
          setCurrentUser(res);
        })
        .catch(console.error);

      // получаем данные об изначальном массиве карточек с сервера
      api
        .getCards()
        .then((res) => {
          //присваиваем переменной cards массив полученных с сервера объектов карточек
          setCards(res);
        })
        .catch(console.error);
    }
  }, [isLoggedIn]);

  //функция проверки токена, чтобы не вводить его повторно (при перезагрузке страницы например)
  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена, и если токен валидный, то перебросит (или оставит) его на главной странице
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            // авторизуем пользователя
            handleLogin();
            setUsersEmail(res.email); // тут убрали data посередине
            navigate("/", { replace: true });
          }
        })
        .catch(console.error);
    }
  }

  //функция проставления и убирания лайков
  function handleCardLike(card) {
    // Проверяем, есть ли уже мой лайк на этой карточке
    // тут либо true либо false
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //вспомогательная функция для исключения дублирования кода ниже
    function changeLikes(item) {
      setCards((stateLike) =>
        stateLike.map((c) => (c._id === card._id ? item : c))
      );
    }

    // если еще нет лайка: putLike, если уже есть: deleteLike
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          // console.log("newCard:", newCard);
          changeLikes(newCard);
        })
        .catch(console.error);
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          changeLikes(newCard);
        })
        .catch(console.error);
    }
  }

  //функция удаления карточки
  function handleCardDelete(card) {
    // Определяем, являемся ли мы владельцем текущей карточки

    const isOwn = card.owner === currentUser._id;

    //После запроса в API, обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку.
    if (isOwn) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((cardsList) => {
            console.log("cardsList:", cardsList);
            cardsList.filter(function (item) {
              return item._id !== card._id;
            });
          });
        })
        .catch(console.error);
    }
  }

  //обновляем данные о профиле User, получая новые из инпутов попапа
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .setUserId(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  //обновление аватара на сервере и отрисовка на странице
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  //добавление новой карточки на сервер
  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .setCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  //сброс всех стейтов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  //закрытие по нажатию на Escape и оверлею
  //булева переменная, принимающая true когда открыт хотя бы один попап
  const isPopupOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isInfoTooltipOpen ||
    selectedCard.link;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    function closeByClickToOverlay(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        closeAllPopups();
      }
    }

    if (isPopupOpen) {
      // навешиваем только при открытии попапа
      document.addEventListener("keydown", closeByEscape);
      document.addEventListener("mousedown", closeByClickToOverlay);

      //убираем при размонтировании
      return () => {
        document.removeEventListener("mousedown", closeByClickToOverlay);
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isPopupOpen]);

  return (
    <div className="root">
      <AppContext.Provider value={{ isLoading, closeAllPopups }}>
        <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route
              path="*"
              element={
                isLoggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  isLoggedIn={isLoggedIn}
                  element={
                    <>
                      <Header
                        buttonSignOut="Выйти"
                        handleUnLogin={handleUnLogin}
                        setCurrentUser={setCurrentUser}
                        usersEmail={usersEmail}
                      />
                      <Main
                        onEditProfile={handleEditProfileClick}
                        onEditAvatar={handleEditAvatarClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        cards={cards}
                        onCardDelete={handleCardDelete}
                      />
                      <Footer />
                    </>
                  }
                />
              }
            />

            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegister}
                  isOpen={handleInfoTooltipClick}
                  setIsRegistered={setIsRegistered}
                />
              }
            />

            <Route
              path="/sign-in"
              element={
                <Login onLogin={handleLogin} setUsersEmail={setUsersEmail} />
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isRegistered={isRegistered}
            text={
              isRegistered
                ? "Вы успешно зарегистрировались!"
                : "Что-то пошло не так! Попробуйте ещё раз."
            }
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </CurrentUserContext.Provider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
