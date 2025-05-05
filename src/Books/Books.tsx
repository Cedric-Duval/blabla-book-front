import { useEffect, useState } from 'react';
import './Books.scss';
import { Link } from 'react-router';
import type { IBooks } from '../@types/books';
import api from '../features/axiosApi';

function Books() {
  // État pour afficher tous les livres
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  // État pour gérer la recherche (titre + auteur)
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await api.get('/books');
        setAllBooks(response.data);
      } catch (_error) {}
    };
    getAllBooks();
  }, []);

    // Fonction pour gérer le changement dans la barre de recherche, elle met à jour l'état searchTerm à chaque changement dans le champ de recherche.
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filtrer les livres en fonction du titre ou de l'auteur taper dans la barre de recherche
    const filteredBooks = allBooks.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (


        <section id="books-section" className="section books-section">
            <div className='head-books'>
                <h1>Tous nos livres</h1>
                <input
                    type="text"
                    placeholder="Recherche parmi nos livres"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {/* Si aucun livre ne correspond a la recherche effectuer, on fais apparaitre un message d'erreur */}
            {filteredBooks.length === 0 && <p className="no-results">Aucun livre ne correspond à votre recherche.</p>}

            <div className="books-list">
                <ul className='books-list-ul' >
                    {filteredBooks.map((books) => {
                        return (
                            <li key={books.id} className='books-list-li'>
                                <Link to={`/book/${books.id}`}>
                                    <figure>
                                        <div id="book-img">
                                            <img
                                                src={books.image} alt="book-image"
                                            />
                                            <button type='button'> ... </button>
                                        </div>
                                        <hgroup>
                                            <figcaption>{books.title}</figcaption>
                                            <h5>{books.author}</h5>
                                        </hgroup>

                                    </figure>
                                </Link>
                            </li>
                        )
                    })}

  // Filtrer les livres en fonction du titre ou de l'auteur taper dans la barre de recherche
  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section id="books-section" className="section">
      <div className="head-books">
        <h1>Tous nos livres</h1>
        <input
          type="text"
          placeholder="Recherche parmi nos livres"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {/* Si aucun livre ne correspond a la recherche effectuer, on fais apparaitre un message d'erreur */}
      {filteredBooks.length === 0 && (
        <p className="no-results">
          Aucun livre ne correspond à votre recherche.
        </p>
      )}

      <div className="books-list">
        <ul className="books-list-ul">
          {filteredBooks.map((books) => {
            return (
              <li key={books.id} className="books-list-li">
                <Link to={`/book/${books.id}`}>
                  <figure>
                    <div id="book-img">
                      <img src={books.image} alt="book-image" />
                      <button type="button"> ... </button>
                    </div>
                    <hgroup>
                      <figcaption>{books.title}</figcaption>
                      <h5>{books.author}</h5>
                    </hgroup>
                  </figure>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Books;
