import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
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
  currentLibraries: ILibrary[];
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
}

function PersonalLibrary({
  setDisplayModalLibrary,
  setCurrentBook,
  myLibraries,
  setMyLibraries,
  currentLibraries,
  setCurrentLibraries,
}: PersonalLibraryProps) {
  const [librariesStatus, setLibrariesStatus] = useState('all');
  const [displayFilter, setDisplayFilter] = useState(true);
  const [currentGenres, setCurrentGenres] = useState([]);

  // ------------- FONCTION DE RECUPERATION DES BIBLIOTHEQUES ----------------------

  useEffect(() => {
    const getmyLibraries = async () => {
      try {
        const response = await api.get('/libraries/books');
        setMyLibraries(response.data);
        setCurrentLibraries(response.data);
        genresFilter(response.data);
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
      setCurrentLibraries((previousLibraries) => [
        ...previousLibraries,
        { ...newLibrary, Books: [] },
      ]);

      form.reset();
    } catch (_error) {}
  }

  // -------------- FONCTIONS DE FILTRE -----------------------------
  function handleFilterLibraries(event: React.ChangeEvent<HTMLSelectElement>) {
    const libraryId = event.target.value;
    if (libraryId === 'all') {
      setCurrentLibraries(myLibraries);
      return;
    }
    const filteredLibrary = [
      myLibraries.find((library) => library.id === Number(libraryId)),
    ];
    setCurrentLibraries(filteredLibrary);
  }

  function handleFilterGenres(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedGenre = event.target.value;

    if (selectedGenre === 'all') {
      setCurrentLibraries(myLibraries);
      return;
    }

    const filteredLibrary = myLibraries.map((library) => {
      const filteredBooks = library.Books.filter((book) =>
        book.Genres.some((genre) => genre.name === selectedGenre),
      );

      return {
        ...library,
        Books: filteredBooks,
      };
    });

    setCurrentLibraries(filteredLibrary);
  }

  function genresFilter(libraries) {
    const allGenres = libraries.flatMap((library) =>
      library.Books.flatMap((book) => book.Genres.map((genre) => genre.name)),
    );

    //Set => rend les valeurs uniques --- sort => tri par ordre alphabétique
    const uniqueGenres = [...new Set(allGenres)].sort();

    setCurrentGenres(uniqueGenres);
  }

  return (
    <section className="section personal-library">
      <div className="personal-library-header">
        <h1 className="personal-library-header-titre">Mes bibliothèques</h1>

        <ul className="personal-library-header-list">
          <NavLink
            className={
              librariesStatus === 'all'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('all');
            }}
          >
            <li>Tous</li>
          </NavLink>
          <NavLink
            className={
              librariesStatus === 'read'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('read');
            }}
          >
            <li>Lus</li>
          </NavLink>
          <NavLink
            className={
              librariesStatus === 'toRead'
                ? 'personal-library-header-list-link selected-status'
                : 'personal-library-header-list-link'
            }
            to=""
            onClick={(event) => {
              event.preventDefault();
              setLibrariesStatus('toRead');
            }}
          >
            <li>A lire</li>
          </NavLink>
          <button
            className="personal-library-header-list-btn"
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setDisplayFilter(!displayFilter);
            }}
          >
            ...
          </button>
        </ul>
        {displayFilter && (
          <div className="personal-library-header-filter">
            <div className="personal-library-header-filter-libraries">
              <p className="filter-label">Filtrer par bibliothèque :</p>
              <select
                onClick={(event) => event.stopPropagation}
                onChange={(event) => handleFilterLibraries(event)}
              >
                <option value="all">Toutes</option>
                {myLibraries.map((library) => (
                  <option key={library.id} value={library.id}>
                    {library.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="personal-library-header-filter-genres">
              <p className="filter-label">Filtrer par genre :</p>
              <select
                onClick={(event) => event.stopPropagation}
                onChange={(event) => handleFilterGenres(event)}
              >
                <option value="all">Tous</option>
                {currentGenres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

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
        )}
      </div>

      {currentLibraries.map((library) => {
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
              <li className="books-list-li library-menu-list">
                <Link to="/books">
                  <figure>
                    <div className="addbook-box">
                      <p className="addbook-box-btn">+</p>
                      <h5 className="addbook-box-text">Ajouter un livre</h5>
                      <div />
                    </div>
                  </figure>
                </Link>
              </li>
            </ul>
          </div>
        );
      })}
    </section>
  );
}

export default PersonalLibrary;
