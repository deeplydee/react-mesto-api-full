import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import Card from './Card.js';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const cardsElements = cards.map((card) => (
    <li className="card" key={card._id}>
      <Card
        card={card}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        onCardDeleteClick={onCardDeleteClick}
      />
    </li>
  ));

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            className="profile__avatar-button"
            type="button"
            aria-label="Изменить аватар"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="photo-grid">
        <ul className="photo-grid__list">
          {cardsElements}
        </ul>
      </section>
    </main>
  );
}

export default Main;
