import './App.scss';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IBooks, ILibrary } from './@types/books';
import type { IUser } from './@types/user';
import LoginForm from './components/modals/LoginForm/LoginForm';
import ModalBooks from './components/modals/ModalBooks/ModalBooks';
import ModalLibrary from './components/modals/ModalLibrary/ModalLibrary';
import RegisterForm from './components/modals/RegisterForm/RegisterForm';
import ReviewModal from './components/modals/ReviewModal/ReviewModal';
import Footer from './layouts/Footer/Footer';
import Navbar from './layouts/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import Book from './pages/Book/Book';
import Books from './pages/Books/Books';
import Confidentalite from './pages/Confidentalité/Confidentalite';
import Contact from './pages/Contact/Contact';
import Error from './pages/Error404/Error404';
import Homepage from './pages/Homepage/Homepage';
import MentionLegale from './pages/MentionLegales/MentionLegale';
import PersonalLibrary from './pages/PersonalLibrary/PersonalLibrary';
import User from './pages/User/User';
import api from './utils/axiosApi';

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
        setMyLibraries(response.data.Libraries);
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
          setMyLibraries={setMyLibraries}
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
