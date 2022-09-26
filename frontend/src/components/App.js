import { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import api from '../utils/api.js';
import auth from '../utils/auth.js';

import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';

import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';
import InfoTooltip from './InfoTooltip.js';

import ProtectedRoute from './ProtectedRoute.js';

import Register from './Register.js';
import Login from './Login.js';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);

  const [deleteCardId, setDeleteCardId] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '' });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipState, setTooltipState] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api
      .getUserData()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleOpenEditAvatarPopup() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleOpenEditProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function handleOpenAddPlacePopup() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(cardId) {
    setIsConfirmationPopupOpen(true);
    setDeleteCardId(cardId);
  }

  function handleInfoTooltip() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsConfirmationPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard ||
      isConfirmationPopupOpen ||
      isInfoTooltipOpen
    ) {
      function handleEscKeyPress(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        }
      }

      function closeClickOverlay(evt) {
        if (evt.target.classList.contains('popup_is-opened')) {
          closeAllPopups();
        }
      }

      document.addEventListener('keydown', handleEscKeyPress);
      document.addEventListener('mousedown', closeClickOverlay);

      return () => {
        document.removeEventListener('mousedown', closeClickOverlay);
        document.removeEventListener('keydown', handleEscKeyPress);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isConfirmationPopupOpen,
    isInfoTooltipOpen,
  ]);

  function handleUpdateAvatar(newUserAvatar) {
    setIsLoading(true);
    api
      .updateAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newUserData) {
    setIsLoading(true);
    api
      .updateProfileData(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(dataCard) {
    setIsLoading(true);
    api
      .addNewCard(dataCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    api
      .getInitialCards()
      .then((initialCards) => {
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    auth
      .getContent(token)
      .then((res) => {
        setUserInfo({ email: res.data.email });
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn, history]);

  const onLogin = (email, password) => {
    return auth
      .login(email, password)
      .then(({ token }) => {
        setUserInfo({ email: email });
        localStorage.setItem('token', token);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRegister = (email, password) => {
    return auth
      .register(email, password)
      .then(() => {
        setTooltipState(true);
        history.push('/sign-in');
        handleInfoTooltip();
      })
      .catch(() => {
        setTooltipState(false);
        handleInfoTooltip();
      });
  };

  const onSignOut = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userInfo.email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            onEditAvatar={handleOpenEditAvatarPopup}
            onEditProfile={handleOpenEditProfilePopup}
            onAddPlace={handleOpenAddPlacePopup}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
            component={Main}
          />
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <PopupWithConfirmation
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          card={deleteCardId}
          isLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          state={tooltipState}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
