function PopupFormInput({
  id,
  type,
  minLength,
  maxLength,
  onChange,
  value,
  name,
  placeholder,
  inputName,
  myRef,
}) {
  return (
    <>
      <input
        id={id}
        type={type}
        className={`popup__input popup__${inputName}`}
        name={name}
        required
        minLength={minLength}
        maxLength={maxLength}
        autoComplete="off"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref={myRef}
      />
      <span id={`error-${id}`} className="error-message"></span>
    </>
  );
}

export default PopupFormInput;
