import type { IUser } from '../@types/user';
import './Navbar.scss';
import { Link } from 'react-router';
import { useState } from 'react';

interface INavbarProps {
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function Navbar({
  setDisplayRegisterForm,
  setDisplayLoginForm,
  isLogged,
  setIsLogged,
  setUser,
}: INavbarProps) {

  const [menuBurger, setMenuBurger] = useState(false);


  return (
    <nav className="navbar">
      <div id="logo">
        <Link to="">
          <img src="../Pictures/Logo.png" alt="" className="header-logo" />
        </Link>
      </div>
      {isLogged ? (
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Recherche par titre, auteur, ISBN ..."
        />
      ) : (
        <h1 className="title-blablabook">BlaBla Book</h1>
      )}

      <div id="menu">
        <ul className={menuBurger ? '' : 'hidden'}>
          <li>
            <Link to="/">Accueil</Link>
          </li>

          <li>
            <Link to="/books">Livres</Link>
          </li>

          <li>
            <Link to="/myLibrary">Bibliothèque</Link>
          </li>
          {isLogged ? (
            <>
              <li>
                <Link to="#" className="button-connect">
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="button-connect"
                  onClick={() => {
                    setIsLogged(false);
                    setUser(undefined);
                  }}
                >
                  Se déconnecter
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
        <img
          src="../public/Pictures/iconamoon--menu-burger-horizontal-fill.svg"
          alt="Menu"
        />
      </Link>
    </nav>
  );
}

export default Navbar;
