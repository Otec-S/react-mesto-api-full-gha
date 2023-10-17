import React from "react";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupFormInput from "../components/PopupFormInput.js";
import { AppContext } from "../contexts/AppContext.js";

function AddPlacePopup({ onAddPlace, isOpen }) {
  //подписка на контекст
  const { isLoading, closeAllPopups } = React.useContext(AppContext);

  //стейты для новых карточек
  const [newCardName, setNewCardName] = React.useState("");
  const [newCardLink, setNewCardLink] = React.useState("");

  //установление значения стейта newCardName из значения поля попапа
  function handleChangeNewCardName(e) {
    setNewCardName(e.target.value);
  }

  //установление значения стейта newCardLink из значения поля попапа
  function handleChangeNewCardLink(e) {
    setNewCardLink(e.target.value);
  }

  //функция отправки формы из попапа AddPlacePopup
  function handleSubmitPlacePopup(e) {
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: newCardName,
      link: newCardLink,
    });
  }

  //очищаем инпуты при открытии (монтировании) компонента попапа
  React.useEffect(() => {
    setNewCardName("");
    setNewCardLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={closeAllPopups}
      popupTitle="Новое место"
      name="AddPlace"
      handleSubmit={handleSubmitPlacePopup}
      buttonName={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <PopupFormInput
        id="card-title"
        type="text"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        autoComplete="off"
        onChange={handleChangeNewCardName}
        value={newCardName}
      />
      <PopupFormInput
        id="card-url"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        autoComplete="off"
        onChange={handleChangeNewCardLink}
        value={newCardLink}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
