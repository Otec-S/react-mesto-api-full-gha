function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card.link
          ? "popup popup-big-photo popup_opened"
          : "popup popup-big-photo"
      }
    >
      <div className="popup__big-photo-content">
        <button
          type="button"
          aria-label="Крестик для закрытия окна"
          className="popup__close-cross"
          onClick={onClose}
        ></button>
        <figure className="popup__big-photo">
          <img
            className="popup__big-photo-picture"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="popup__big-photo-caption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
