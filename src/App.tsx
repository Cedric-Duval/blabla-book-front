import './App.scss';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IBooks, ILibrary } from './@types/books';
import type { IUser } from './@types/user';
import Admin from './Admin/Admin';
import Book from './Book/Book';
import Books from './Books/Books';
import Confidentalite from './Confidentalité/Confidentalite';
import Contact from './Contact/Contact';
import Error from './Error404/Error404';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import LoginForm from './LoginForm/LoginForm';
import MentionLegale from './MentionLegales/MentionLegale';
import ModalBooks from './ModalBooks/ModalBooks';
import ReviewModal from './ModalBooks/ReviewModal/ReviewModal';
import ModalLibrary from './ModalLibrary/ModalLibrary';
import Navbar from './Navbar/Navbar';
import PersonalLibrary from './PersonalLibrary/PersonalLibrary';
import RegisterForm from './RegisterForm/RegisterForm';
import User from './User/User';
import api from './features/axiosApi';

function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [displayModalLibrary, setDisplayModalLibrary] = useState(false);
  const [displayModalBook, setDisplayModalBook] = useState(false);
  const [displayReviewModal, setDisplayReviewModal] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isLogged, setIsLogged] = useState(false);
  const [currentBook, setCurrentBook] = useState<IBooks | null>();
  const [myLibraries, setMyLibraries] = useState<ILibrary[]>([]);
  const [currentLibraries, setCurrentLibraries] = useState(myLibraries);
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUser() {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (_error) {
        localStorage.removeItem('token');
        setIsLogged(false);
        setUser(undefined);
        setMyLibraries([]);
        setCurrentLibraries([]);
      }
    }

    if (token) {
      getUser();
      setIsLogged(true);
    }
  }, []);

  function closeRegisterForm() {
    setDisplayRegisterForm(false);
  }

  function closeLoginForm() {
    setDisplayLoginForm(false);
  }

  function closeModalLibrary() {
    setDisplayModalLibrary(false);
  }

  function closeModalBook() {
    setDisplayModalBook(false);
  }

  return (
    <div className="app">
      {displayRegisterForm && (
        <RegisterForm
          closeRegisterForm={closeRegisterForm}
          setDisplayLoginForm={setDisplayLoginForm}
        />
      )}
      {displayLoginForm && (
        <LoginForm
          closeLoginForm={closeLoginForm}
          setUser={setUser}
          setIsLogged={setIsLogged}
          setDisplayRegisterForm={setDisplayRegisterForm}
        />
      )}
      {displayModalLibrary && (
        <ModalLibrary
          closeModalLibrary={closeModalLibrary}
          currentBook={currentBook}
          setMyLibraries={setMyLibraries}
          myLibraries={myLibraries}
          setCurrentLibraries={setCurrentLibraries}
        />
      )}

      {displayModalBook && (
        <ModalBooks
          closeModalBook={closeModalBook}
          currentBook={currentBook}
          setMyLibraries={setMyLibraries}
          myLibraries={myLibraries}
          displayReviewModal={displayReviewModal}
          setDisplayReviewModal={setDisplayReviewModal}
        />
      )}

      {displayReviewModal && (
        <ReviewModal
          setDisplayReviewModal={setDisplayReviewModal}
          setReviewed={setReviewed}
          closeModalBook={closeModalBook}
          currentBook={currentBook}
        />
      )}

      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayLoginForm={setDisplayLoginForm}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUser={setUser}
        user={user}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Homepage
              setDisplayRegisterForm={setDisplayRegisterForm}
              isLogged={isLogged}
              setDisplayLoginForm={setDisplayLoginForm}
              user={user}
              setDisplayModalBook={setDisplayModalBook}
              setCurrentBook={setCurrentBook}
            />
          }
        />
        <Route
          path="/books"
          element={
            <Books
              setDisplayModalBook={setDisplayModalBook}
              setCurrentBook={setCurrentBook}
            />
          }
        />
        <Route
          path="/book/:id"
          element={
            <Book
              setDisplayModalBook={setDisplayModalBook}
              setReviewed={setReviewed}
              reviewed={reviewed}
              user={user}
            />
          }
        />
        <Route
          path="/myLibrary"
          element={
            <PersonalLibrary
              setDisplayModalLibrary={setDisplayModalLibrary}
              setCurrentBook={setCurrentBook}
              myLibraries={myLibraries}
              setMyLibraries={setMyLibraries}
              currentLibraries={currentLibraries}
              setCurrentLibraries={setCurrentLibraries}
            />
          }
        />

        <Route
          path="/user"
          element={
            <User
              user={user}
              setUser={setUser}
              setIsLogged={setIsLogged}
              reviewed={reviewed}
              setReviewed={setReviewed}
            />
          }
        />

        {isLogged && user?.admin && <Route path="/admin" element={<Admin />} />}
        <Route path="/confidentality" element={<Confidentalite />} />
        <Route path="/legal-notice" element={<MentionLegale />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
