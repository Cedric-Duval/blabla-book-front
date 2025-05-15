import { useEffect, useState } from 'react';
import './Books.scss';
import { Link } from 'react-router';
import type { IBooks } from '../@types/books';
import Loader from '../Loader/Loader';
import api from '../features/axiosApi';

interface BooksProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
}

function Books({ setDisplayModalBook, setCurrentBook }: BooksProps) {
  // État pour afficher tous les livres
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);
  // État pour gérer la recherche (titre + auteur)

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState<number>(18);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/books');
        setAllBooks(response.data);
        setIsLoading(false);
      } catch (_error) {}
    };
    getAllBooks();
  }, []);

  // Fonction pour gérer le changement dans la barre de recherche, elle met à jour l'état searchTerm à chaque changement dans le champ de recherche.
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setVisibleCount(18); // Réinitialise la pagination lors d'une recherche
  };

  // Filtrer les livres en fonction du titre ou de l'auteur taper dans la barre de recherche
  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return <Loader />;
  }

  const visibleBooks = filteredBooks.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 18, filteredBooks.length));
  };

  const handleShowLess = () => {
    setVisibleCount((prev) => Math.max(18, prev - 18));
  };

  return (
    <section id="books-section" className="section books-section">
      <div className="head-books">
        <h1>Tous nos livres</h1>
        <input
          type="text"
          placeholder="Recherche parmi nos livres"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Si aucun livre ne correspond à la recherche effectuée, on fait apparaître un message d'erreur */}
      {filteredBooks.length === 0 && (
        <p className="no-results">
          Aucun livre ne correspond à votre recherche.
        </p>
      )}

      <div className="books-list">
        <ul className="books-list-ul">
          {visibleBooks.map((books, index) => (
            <li
              key={books.id}
              className="books-list-li animated-book"
              style={{
                animationDelay: `${index * 70}ms`,
              }}
            >
              <Link to={`/book/${books.id}`}>
                <figure>
                  <div id="book-img">
                    <img src={books.image} alt="book-image" />
                    <button
                      className="test-btn"
                      type="button"
                      onClick={(event) => {
                        setDisplayModalBook(true);
                        event.preventDefault();
                        setCurrentBook(books);
                        console.log(books);
                      }}
                    >
                      ...
                    </button>
                  </div>
                  <hgroup>
                    <figcaption>{books.title}</figcaption>
                    <h5>{books.author}</h5>
                  </hgroup>
                </figure>
              </Link>
            </li>
          ))}
        </ul>

        <div className="show-buttons-container">
          {visibleCount < filteredBooks.length && (
            <button
              type="button"
              className="show-more-btn"
              onClick={handleShowMore}
            >
              Afficher plus
            </button>
          )}
          {visibleCount > 18 && (
            <button
              type="button"
              className="show-less-btn"
              onClick={handleShowLess}
            >
              Afficher moins
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
export default Books;
