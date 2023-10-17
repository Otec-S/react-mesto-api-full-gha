import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({
  owner,
  likes,
  link,
  name,
  card,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  //подписка на контекст CurrentUserContext, после которой в currentUser появился объект с данными о User
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки (true/false)
  const isOwn = owner === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some((i) => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__heart ${
    isLiked && "card__heart_active"
  }`;

  //прокидываем объект в функцию handleClick
  function handleClick() {
    onCardClick(card);
  }

  //прокинутая из App функция клика по сердечку
  function handleLikeClick() {
    onCardLike(card);
  }

  //прокинутая из App функция удаления карточки по корзинке
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {/* если карточка не моя - корзину не показываем */}
      {isOwn && (
        <button
          type="button"
          aria-label="Кнопка для удаления картинки"
          className="card__trash-can"
          onClick={handleDeleteClick}
        />
      )}

      <a className="card__link" href="#">
        <div
          style={{ backgroundImage: `url(${link})` }}
          className="card__photo"
          onClick={handleClick}
        />
      </a>
      <h2 className="card__title">{name}</h2>
      <div className="card__heart-area">
        <button
          type="button"
          aria-label="Сердечко для лайка"
          className={cardLikeButtonClassName}
          //обработчик клика по сердечку
          onClick={handleLikeClick}
        />
        <div className="card__hearts-counter">{likes.length}</div>
      </div>
    </li>
  );
}
