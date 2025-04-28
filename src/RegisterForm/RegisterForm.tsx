import { Link } from 'react-router';
import './RegisterForm.scss';

function RegisterForm() {
  return (
    <div className="hidden-background">
      <div className="register">
        <form className="register-form" method="post">
          <p className="register-form-title">Rejoindre BlaBla Book</p>
          <label className="register-form-label" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="register-form-input"
            type="email"
            id="email"
            name="email"
          />
          <label className="register-form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="firstname"
            name="firstname"
          />
          <label className="register-form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="name"
            name="name"
          />
          <label className="register-form-label" htmlFor="cgv">
            Mot de passe
          </label>
          <input
            className="register-form-input"
            type="password"
            id="cgv"
            name="cgv"
          />
          <div className="register-form-div">
            <input
              className="register-form-input"
              type="checkbox"
              id="password"
              name="password"
            />
            <label className="register-form-label" htmlFor="password">
              Conditions générales
            </label>
          </div>
          <button className="register-form-button" type="button">
            S'inscrire
          </button>
          <Link to="#" className="register-form-redirection">
            Déjà inscrit ? Se connecter
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
