import './App.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Books from './Books/Books';
import Book from './Book/Book';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import LoginForm from './LoginForm/LoginForm';
import Navbar from './Navbar/Navbar';
import RegisterForm from './RegisterForm/RegisterForm';

function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  const [displayLoginForm, setDisplayLoginForm] = useState(false);
  const [user, setUser] = useState();
  const [isLogged, setIsLogged] = useState(false);

  function closeRegisterForm() {
    setDisplayRegisterForm(false);
  }

  function closeLoginForm() {
    setDisplayLoginForm(false);
  }

  return (
    <div className="app">
      {displayRegisterForm && (
        <RegisterForm closeRegisterForm={closeRegisterForm} />
      )}
      {displayLoginForm && (
        <LoginForm
          closeLoginForm={closeLoginForm}
          setUser={setUser}
          setIsLogged={setIsLogged}
        />
      )}

      <Navbar
        setDisplayRegisterForm={setDisplayRegisterForm}
        isLogged={isLogged}
        setDisplayLoginForm={setDisplayLoginForm}
      />
      <Routes>

        <Route path="/" element={
          <Homepage />
        } />
        <Route path="/books" element={
          <Books />
        } />
        <Route path="/book/:id" element={
          <Book />
        } />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
