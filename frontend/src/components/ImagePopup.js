function ImagePopup({ card, onClose }) {
  return (
    <section
      className={`popup popup_type_overview ${card && 'popup_is-opened'}`}
    >
      <div className="popup__container popup__container_place_overview">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <div className="overview">
          <img
            className="overview__image"
            src={card && card.link}
            alt={card && card.name}
          />
          <p className="overview__title">{card && card.name}</p>
        </div>
      </div>
    </section>
  );
}

export default ImagePopup;
