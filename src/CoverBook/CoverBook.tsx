import { Link } from 'react-router';
import './CoverBook.scss';
import type { IBooks } from '../@types/books';
import type { ILibrary } from '../@types/books';

interface CoverBookProps {
  book: IBooks;
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<React.SetStateAction<IBooks | null | undefined>>
}

function CoverBook({
  book,
  setDisplayModalLibrary,
  setCurrentBook,
}: CoverBookProps) {
  return (
    <>
      <li key={book.id} className="books-list-li library-menu-list">
        <Link to={`/book/${book.id}`}>
          <figure>
            <div id="book-img">
              <button
                className="test-btn"
                type="button"
                onClick={(event) => {
                  setDisplayModalLibrary(true);
                  event.preventDefault();
                  setCurrentBook(book);
                }}
              >
                {' '}
                ...{' '}
              </button>
              <img src={book.image} alt="book-image" /> 
              {!book.LibraryBook.read && <span id="read-notRead"><img src="../public/Pictures/toRead.svg" alt="livre à lire" title="à lire" /></span>}
              {book.LibraryBook.read && <span id="read-notRead"><img src="../public/Pictures/tick.svg" alt="livre lu" title="livre lu" /></span>}

            </div>
            <hgroup>
              <figcaption>{book.title}</figcaption>
              <h5>{book.author}</h5>
            </hgroup>
          </figure>
        </Link>
      </li>
    </>
  );
}

export default CoverBook;
