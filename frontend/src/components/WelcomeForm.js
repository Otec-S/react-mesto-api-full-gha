export default function WelcomeForm({
  title,
  buttonName,
  handleSubmit,
  formValue,
  handleChange,
  onRegister,
}) {
  return (
    <form onSubmit={handleSubmit} className="welcomeform">
      <div className="welcomeform__title">{title}</div>

      <input
        id="email"
        name="email"
        type="email"
        value={formValue.email}
        className="welcomeform__input"
        required
        // autoComplete="off"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        id="password"
        name="password"
        type="password"
        className="welcomeform__input"
        required
        autoComplete="off"
        placeholder="Пароль"
        value={formValue.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        onSubmit={handleSubmit}
        onClick={onRegister}
        className="welcomeform__button"
      >
        {buttonName}
      </button>
    </form>
  );
}
