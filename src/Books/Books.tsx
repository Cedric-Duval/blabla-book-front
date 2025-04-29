import { useEffect, useState } from 'react';
import './Books.scss';
import type { IBooks } from '../@types/books';
import api from '../features/axiosApi';

function Books() {
  const [allBooks, setAllBooks] = useState<IBooks[]>([]);

  useEffect(() => {
    const getAllBooks = async () => {
      try {
        const response = await api.get('/books');
        setAllBooks(response.data);
      } catch (_error) {}
    };
    getAllBooks();
  }, []);

  return (
    <section id="books-section" className="section">
      <div className="head-books">
        <h1>Tous nos livres</h1>
        <input type="text" placeholder="Recherche parmis vos livres" />
      </div>

      <div className="books-list">
        <ul>
          {allBooks.map((books) => {
            return (
              <li key={books.id}>
                <a href="/test">
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
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Books;
