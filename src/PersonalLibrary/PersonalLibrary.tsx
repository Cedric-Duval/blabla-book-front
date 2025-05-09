import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import '../Books/Books.scss';
import './PersonalLibrary.scss';
import type { IBooks, ILibrary } from '../@types/books';
import CoverBook from '../CoverBook/CoverBook';
import api from '../features/axiosApi';

interface PersonalLibraryProps {
  setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentBook: React.Dispatch<
    React.SetStateAction<IBooks | null | undefined>
  >;
  myLibraries: ILibrary[];
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
}

function PersonalLibrary({
  setDisplayModalLibrary,
  setCurrentBook,
  myLibraries,
  setMyLibraries,
}: PersonalLibraryProps) {
  const [librariesStatus, setLibrariesStatus] = useState('all');

  // ------------- FONCTION DE RECUPERATION DES BIBLIOTHEQUES ----------------------

  useEffect(() => {
    const getmyLibraries = async () => {
      try {
        const response = await api.get('/libraries/books');
        setMyLibraries(response.data);
      } catch (error) {
        error;
      }
    };
    getmyLibraries();
  }, []);

  // -------------- FONCTION DE CREATION DE BIBLITOTHEQUE -----------------------------

  async function handleLibraryCreation(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const newLibraryName = formData.get('newLibraryName') as string;

    try {
      const response = await api.post('/library', {
        name: newLibraryName,
      });
      const newLibrary = response.data;

      setMyLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);

      form.reset();
    } catch (_error) {}
  }

  return (
    <section className="section personal-library">
      <div className="personal-library-header">
        <h1 className="personal-library-header-titre">Mes bibliothèques</h1>

        <ul className="personal-library-header-list">
          <NavLink
            className="personal-library-header-list-link"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('all');
            }}
          >
            <li>Tous</li>
          </NavLink>
          <NavLink
            className="personal-library-header-list-link"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('read');
            }}
          >
            <li>Lus</li>
          </NavLink>
          <NavLink
            className="personal-library-header-list-link"
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('toRead');
            }}
          >
            <li>A lire</li>
          </NavLink>
        </ul>
        <div className="personal-library-header-filter">
          <form onSubmit={handleLibraryCreation}>
            <input
              type="text"
              id="newLibraryName"
              name="newLibraryName"
              placeholder="Créer une bibliothèque"
              required
            />
            <button type="submit">Créer</button>
          </form>
        </div>
      </div>

      {myLibraries.map((library) => {
        return (
          <div
            className="books-list personal-library-libraries"
            key={library.id}
          >
            <h3 className="library-title">{library.name}</h3>
            <ul className="books-list-ul">
              {librariesStatus === 'all' &&
                library.Books.map((book) => {
                  return (
                    <CoverBook
                      key={book.id}
                      book={book}
                      setDisplayModalLibrary={setDisplayModalLibrary}
                      setCurrentBook={setCurrentBook}
                    />
                  );
                })}

              {librariesStatus === 'read' &&
                library.Books.map((book) => {
                  if (book.LibraryBook.read) {
                    return (
                      <CoverBook
                        key={book.id}
                        book={book}
                        setDisplayModalLibrary={setDisplayModalLibrary}
                        setCurrentBook={setCurrentBook}
                      />
                    );
                  }
                })}

              {librariesStatus === 'toRead' &&
                library.Books.map((book) => {
                  if (!book.LibraryBook.read) {
                    return (
                      <CoverBook
                        key={book.id}
                        book={book}
                        setDisplayModalLibrary={setDisplayModalLibrary}
                        setCurrentBook={setCurrentBook}
                      />
                    );
                  }
                })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

export default PersonalLibrary;
