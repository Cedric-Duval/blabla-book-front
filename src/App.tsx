
import './App.scss'
import { } from 'react';
import { Route, Routes } from 'react-router';
import Books from './Books/Books';
import Book from './Book/Book';
import Footer from './Footer/Footer';
import Homepage from './Homepage/Homepage';
import Navbar from './Navbar/Navbar';

 
function App() {



  return (
    <div className='app'>
      <Navbar />

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
      <Footer/> 
    </div>
  )
}

export default App;
