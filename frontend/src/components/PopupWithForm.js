function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  textButton,
  onSubmit,
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && 'popup_is-opened'}`}
    >
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__form-heading">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          <div className="popup__main-container">
            <fieldset className="popup__form-input-container">
              {children}
            </fieldset>
            <button
              className="popup__form-submit"
              type="submit"
              aria-label="{textButton}"
            >
              {textButton}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
