import './Navbar.scss';
import { Link } from 'react-router';

interface INavbarProps {
  setDisplayRegisterForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({
  setDisplayRegisterForm,
  isLogged,
  setDisplayLoginForm,
}: INavbarProps) {
  return (
    <nav className="navbar">
      <div id="logo">
        <Link to="">
          <img src="../Pictures/Logo.png" alt="" className="header-logo" />
        </Link>
      </div>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Recherche par titre, auteur, ISBN ..."
      />
      <div id="menu">
        <ul className="hidden">
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
            <li>
              <Link to="#" className="button-connect">
                Profil
              </Link>
            </li>
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
      <Link to="" className="burger-menu">
        <img
          src="../public/Pictures/iconamoon--menu-burger-horizontal-fill.svg"
          alt=""
        />
      </Link>
    </nav>
  );
}

export default Navbar;
