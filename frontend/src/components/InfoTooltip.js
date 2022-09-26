import successIcon from '../images/success-icon.svg';
import errorIcon from '../images/error-icon.svg';

function InfoTooltip({ state, isOpen, onClose }) {
  return (
    <section
      className={`popup popup_type_info-tooltip ${isOpen && 'popup_is-opened'}`}
    >
      <div className="popup__container popup__container_type_info-tooltip">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__icon"
          src={state ? successIcon : errorIcon}
          alt={
            state
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        />
        <h2 className="popup__form-heading popup__form-heading_type_info-tooltip">
          {state
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </section>
  );
}

export default InfoTooltip;
