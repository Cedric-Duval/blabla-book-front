import './App.scss';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IBooks, ILibrary } from './@types/books';
import type { IUser } from './@types/user';
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
  const [user, setUser] = useState<IUser | undefined>();
  const [isLogged, setIsLogged] = useState(false);
  const [currentBook, setCurrentBook] = useState<IBooks | null>();
  const [myLibraries, setMyLibraries] = useState<ILibrary[]>([]);


  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUser() {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (_error) { }
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
    setDisplayModalLibrary(false)
  }

  function closeModalBook() {
    setDisplayModalBook(false)
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
          myLibraries={myLibraries} />)}

      {displayModalBook && (
        <ModalBooks
          closeModalBook={closeModalBook}
          currentBook={currentBook}
          setMyLibraries={setMyLibraries} 
          myLibraries={myLibraries} />)}

      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        setDisplayLoginForm={setDisplayLoginForm}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUser={setUser}
      />
      <Routes>

        <Route path="/" element={
          <Homepage setDisplayRegisterForm={setDisplayRegisterForm}
            isLogged={isLogged}
            setDisplayLoginForm={setDisplayLoginForm}
            user={user} />
        } />
        <Route path="/books" element={
          <Books 
          setDisplayModalBook={setDisplayModalBook}
          setCurrentBook={setCurrentBook}
           />
        } />
        <Route path="/book/:id" element={
          <Book />
        } />
        <Route path="/myLibrary" element={
          <PersonalLibrary
            setDisplayModalLibrary={setDisplayModalLibrary}
            setCurrentBook={setCurrentBook}
            myLibraries={myLibraries}
            setMyLibraries={setMyLibraries}
             />
        } />

        <Route path="/user" element={
          <User
            user={user}
            setUser={setUser}
          />
        } />

        <Route path="/confidentality" element ={
          <Confidentalite />
        } />
        <Route path="/legal-notice" element={
          <MentionLegale />
        } />

        <Route path="/contact" element={
          <Contact />
        } />

        <Route path="*" element={
          <Error />
        } />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
