import './App.scss';
import { useState } from 'react';
import { Route, Routes } from 'react-router';
import Books from './Books/Books';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import Navbar from './Navbar/Navbar';
import RegisterForm from './RegisterForm/RegisterForm';

function App() {
  const [displayRegisterForm, setDisplayRegisterForm] = useState(false);
  return (
    <div className="app">
      {displayRegisterForm && <RegisterForm />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/books" element={<Books />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
