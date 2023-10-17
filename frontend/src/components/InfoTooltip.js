import React from "react";
import tick from "../images/Registration-tick.svg";
import cross from "../images/Registration-cross.svg";

import { AppContext } from "../contexts/AppContext.js";

export default function InfoTooltip({ isOpen, isRegistered, text }) {
  //подписка на контекст
  const { closeAllPopups } = React.useContext(AppContext);

  return (
    <div className={isOpen ? `popup popup_opened` : `popup`}>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Крестик для закрытия окна"
          className="popup__close-cross"
          onClick={closeAllPopups}
        />
        <div className="popup__registration">
          {isRegistered ? (
            <>
              <div
                style={{ backgroundImage: `url(${tick})` }}
                alt="Галочка успешной регистрации"
                className="popup__registration_sign"
              />
              <div className="popup__registration_text">{text}</div>
            </>
          ) : (
            <>
              <div
                style={{ backgroundImage: `url(${cross})` }}
                alt="Крестик неуспешной регистрации"
                className="popup__registration_sign"
              />
              <div className="popup__registration_text">{text}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
