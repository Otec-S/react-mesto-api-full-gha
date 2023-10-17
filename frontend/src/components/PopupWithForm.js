function PopupWithForm({
  isOpen,
  onClose,
  popupTitle,
  name,
  handleSubmit,
  buttonName,
  children,
}) {
  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Крестик для закрытия окна"
          className="popup__close-cross"
          onClick={onClose}
        />
        <h2 className="popup__title">{popupTitle}</h2>

        <form
          name={`formFor${name}Popup`}
          className='popup__form'
          onSubmit={handleSubmit}
        >
          {children}

          <button
            type="submit"
            aria-label="Кнопка для сохранения изменений"
            className="popup__submit"
          >
            {buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
