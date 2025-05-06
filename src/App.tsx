import './App.scss';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import type { IUser } from './@types/user';
import Book from './Book/Book';
import Books from './Books/Books';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import LoginForm from './LoginForm/LoginForm';
import Navbar from './Navbar/Navbar';
import PersonalLibrary from './PersonalLibrary/PersonalLibrary';
import RegisterForm from './RegisterForm/RegisterForm';
import Error from './Error404/Error404';
import api from './features/axiosApi';
import Confidentalite from './Confidentalité/Confidentalite';
import MentionLegale from './MentionLegales/MentionLegale';
import Contact from './Contact/Contact';
import User from './User/User';

function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [user, setUser] = useState<IUser | undefined>();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    async function getUser() {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (_error) {}
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
          <Books />
        } />
        <Route path="/book/:id" element={
          <Book />
        } />
        <Route path="/myLibrary" element={
          <PersonalLibrary />
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
        <Route path="/legal-notice" element ={
          <MentionLegale />
        } />

        <Route path="/contact" element ={
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
