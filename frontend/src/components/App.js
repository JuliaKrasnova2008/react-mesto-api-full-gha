import { useEffect, useState } from "react";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [err, setErr] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if(isAuth) {
    Promise.all([api.getUserInfo(), api.getAllCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [isAuth]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setIsAuth(true);
          setEmail(res.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prev) => prev.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(user) {
    api
      .setUserInfo(user)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogin(obj) {
    if (!obj.email || !obj.password) {
      return;
    }

    auth
      .login(obj)
      .then((data) => {
        if (data.token) {
          setIsAuth(true);
          localStorage.setItem("token", data.token);
          setEmail(obj.email);
          navigate("/");
        }
      })
      .catch((err) => {
        setErr(true);
        setInfoTooltipOpen((state) => !state);
      });
  }

  function handleRegister(obj) {
    if (!obj.email || !obj.password) {
      return;
    }

    auth
      .register(obj)
      .then((data) => {
        setErr(false);
        setInfoTooltipOpen((state) => !state);
        navigate("/sign-in");
      })
      .catch((err) => {
        setErr(true);
        setInfoTooltipOpen((state) => !state);
      });
  }

  function handleExit() {
    setEmail("");
    localStorage.removeItem("token");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header email={email} onExit={handleExit} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute isAuth={isAuth}>
                <Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          formName="deleteForm"
          buttonText="Да"
          onClose={closeAllPopups}
        ></PopupWithForm>

        <InfoTooltip
          name={"infotooltip"}
          isOpen={infoTooltipOpen}
          onClose={closeAllPopups}
          err={err}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
