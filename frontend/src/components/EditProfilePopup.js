import React from "react";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupFormInput from "../components/PopupFormInput.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AppContext } from "../contexts/AppContext.js";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  //подписки на контексты
  const {isLoading, closeAllPopups} = React.useContext(AppContext);
  const currentUser = React.useContext(CurrentUserContext);

  // Внутри EditProfilePopup добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми. Не забудьте про обработчики onChange.

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  //подставляем в форму данные из контекста
  //также следим за состоянием открытости (одновременно), чтобы при закрытии попапа в нем оставались не измененные данные
  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser, isOpen]);

  //функция отправки формы из попапа EditProfilePopup
  function handleSubmit(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={closeAllPopups}
      popupTitle="Редактировать профиль"
      name="Profile"
      handleSubmit={handleSubmit}
      buttonName={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <PopupFormInput
        id="name"
        type="text"
        name="name"
        minLength="2"
        maxLength="40"
        onChange={handleChangeName}
        value={name}
      />
      <PopupFormInput
        id="status"
        type="text"
        name="about"
        required
        minLength="2"
        maxLength="200"
        onChange={handleChangeDescription}
        value={description}
      />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
