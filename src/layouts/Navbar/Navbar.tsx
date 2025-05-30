import type { IUser } from '../../@types/user';
import './Navbar.scss';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import type { IBooks } from '../../@types/books';
import api from '../../utils/axiosApi';

interface INavbarProps {
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  user: IUser | undefined;
}

function Navbar({
  setDisplayRegisterForm,
  setDisplayLoginForm,
  isLogged,
  setIsLogged,
  setUser,
  user,
}: INavbarProps) {
  const [menuBurger, setMenuBurger] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<IBooks[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm.trim().length < 1) {
        setSearchResults([]);
        return;
      }

      try {
        const res = await api.get('/books');

        const filtered = res.data.filter(
          (book: IBooks) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toString().includes(searchTerm.toLowerCase()) ||
            book.editor.toLowerCase().includes(searchTerm.toLowerCase()),
        );
        setSearchResults(filtered.slice(0, 5));
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, [searchTerm]);

  const closeMenuBurger = () => {
    setMenuBurger(false);
  };

  return (
    <nav className="navbar">
      <div id="logo">
        <Link to="">
          <img src="../Pictures/Logo2.png" alt="" className="header-logo" />
        </Link>
      </div>
      {isLogged ? (
        <div className="search-container">
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Recherche par titre, auteur, ISBN ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm.length > 0 && searchResults.length > 0 && (
            <ul className="search-result">
              {searchResults.map((book) => (
                <Link
                  to={`/book/${book.id}`}
                  key={book.id}
                  className="book-result"
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                  }}
                >
                  {book.title} — {book.author}
                </Link>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <h1 className="title-blablabook">BlaBla Book</h1>
      )}

      <div id="menu">
        <ul className={menuBurger ? '' : 'hidden'}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive && isLogged ? 'active' : ''
              }
              onClick={closeMenuBurger}
            >
              Accueil
            </NavLink>
          </li>

          <li>
            <NavLink
              to={isLogged ? '/books' : '#'}
              className={({ isActive }) =>
                isActive && isLogged ? 'active' : ''
              }
              onClick={(e) => {
                if (!isLogged) {
                  e.preventDefault();
                  setDisplayLoginForm(true);
                }
                closeMenuBurger();
              }}
            >
              Livres
            </NavLink>
          </li>

          <li>
            <NavLink
              to={isLogged ? '/myLibrary' : '#'}
              className={({ isActive }) =>
                isActive && isLogged ? 'active' : ''
              }
              onClick={(e) => {
                if (!isLogged) {
                  e.preventDefault();
                  setDisplayLoginForm(true);
                }
                closeMenuBurger();
              }}
            >
              Bibliothèque
            </NavLink>
          </li>
          {isLogged ? (
            <>
              <li>
                <NavLink
                  to="/user" /* className="button-connect" */
                  className={({ isActive }) => (isActive ? 'active' : '')}
                  onClick={closeMenuBurger}
                >
                  Profil
                </NavLink>
              </li>
              {isLogged && user?.admin && (
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? 'active' : '')}
                    onClick={closeMenuBurger}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li>
                <Link
                  to="/"
                  className="button-connect"
                  onClick={() => {
                    localStorage.removeItem('token');
                    setIsLogged(false);
                    setUser(undefined);
                    closeMenuBurger();
                  }}
                >
                  Déconnexion
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="#"
                  className="button-connect"
                  onClick={() => {
                    setDisplayLoginForm(true);
                    closeMenuBurger();
                  }}
                >
                  Se connecter
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="create-account"
                  onClick={() => {
                    setDisplayRegisterForm(true);
                    closeMenuBurger();
                  }}
                >
                  Créer un compte
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <Link
        to="#"
        className="burger-menu"
        onClick={(e) => {
          e.preventDefault();
          setMenuBurger(!menuBurger);
        }}
      >
        {!menuBurger && <img src="../Pictures/burgerMenu.svg" alt="Menu" />}
        {menuBurger && <img src="../Pictures/burgerCross.svg" alt="Menu" />}
      </Link>
    </nav>
  );
}

export default Navbar;
