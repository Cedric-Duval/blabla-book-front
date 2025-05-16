import './Book.scss';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import type { IBooks } from '../@types/books';
import api from '../features/axiosApi';

interface BookProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<React.SetStateAction<IBooks | null | undefined>>;
  currentBook: IBooks | null | undefined;
}

function Book({ setDisplayModalBook, setCurrentBook, currentBook }: BookProps) {
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState<IBooks | null>(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await api.get(`/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [bookId]);

  return (
    <section id="book-section" className="section">
      <Link to="/books">
        <img
          id="left-arrow"
          src="../Pictures/humbleicons--arrow-left.png"
          alt="left-arrow"
        />
      </Link>
      {book ? (
        <>
          <h2>{book.title}</h2>
          <div id="presentation">
            <div id="presentation-image">
              <img src={`${book.image}`} alt={`${book.title}`} />
            </div>
            <div id="presentation-texts">
              <div id="details">
                {/* <h2>{book.title}</h2> */}
                <p><b>Auteur :</b> {book.author}</p>
                <p><b>Parution :</b> {book.publication_year}</p>
                <p><b>Édition :</b> {book.editor}</p>
                <p><b>ISBN :</b> {book.isbn}</p>
                <p><b>Pages :</b> {book.pages}</p>
                <p className='genre-list'>
                <b>Genres :</b> 
                <ul>
                    {book.Genres.map((genre) => (
                      <li key={genre.id}> {genre.name}</li>
                    ))}
                </ul>
                </p>
              </div>
            </div>
          </div>
          <div id="summary">
            <hr />
            <h3>Résumé:</h3>
            <p>{book.summary}</p>

            <button
              type="button"
              className="button-add"
              onClick={() => setDisplayModalBook(true)}
            >
              <Link to="">
                <img
                  src="../Pictures/ic--outline-plus.png"
                  id="add-button"
                  alt="add-button"
                />
              </Link>
            </button>
          </div>
        </>
      ) : (
        <p>Chargement.... </p>
      )}
    </section>
  );
}

export default Book;
