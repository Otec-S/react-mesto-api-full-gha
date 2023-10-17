import React from "react";
import Card from "./Card.js";
import pencil from "../images/big-pencil-to-change-ava.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  //подписка на контекст CurrentUserContext, после которой в currentUser появился объект с данными о User
  const currentUser = React.useContext(CurrentUserContext);

  // console.log("currentUser:", currentUser);

  console.log("props.cards:", props.cards);



  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <a
            href="#"
            className="profile__avatar-link"
            onClick={props.onEditAvatar}
          >
            <div
              style={{ backgroundImage: `url(${pencil})` }}
              alt="Карандаш для редактирования"
              className="profile__avatar-change"
            />
            <div
              style={{ backgroundImage: `url(${currentUser.avatar})` }}
              alt="Фото аватара"
              className="profile__avatar"
            />
          </a>
          <div className="profile__name">
            <button
              type="button"
              aria-label="Кнопка редактирования"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Кнопка добавления"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="cardsblock main__cardsblock">
        <ul className="cards">
          {props.cards?.map((item) => {
            {/* console.log('item:', item); */}
            return (
              <Card
                card={item}
                link={item.link}
                name={item.name}
                likes={item.likes}
                key={item._id}
                onCardClick={props.onCardClick}
                owner={item.owner}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
