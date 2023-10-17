import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import PopupFormInput from "./PopupFormInput";
import { AppContext } from "../contexts/AppContext.js";

function EditAvatarPopup({ onUpdateAvatar, isOpen }) {
  //подписка на контекст
  const {isLoading, closeAllPopups} = React.useContext(AppContext);

  const avatarRef = useRef();

  //функция отправки формы из попапа EditAvatarPopup
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  //очищаем инпут при монтировании элемента
  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={closeAllPopups}
      popupTitle="Обновить аватар"
      name="Avatar"
      handleSubmit={handleSubmit}
      buttonName={isLoading ? "Сохранение..." : "Сохранить"}
    >
      <PopupFormInput
        id="profile-url"
        type="url"
        name="link"
        inputName="input-change-profile"
        placeholder="Ссылка на аватар"
        myRef={avatarRef}
      />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
