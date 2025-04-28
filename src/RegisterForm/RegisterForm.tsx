import { Link } from 'react-router';
import './RegisterForm.scss';
import axios from 'axios';

interface iRegisterFormProps {
  closeRegisterForm: () => void;
}

function RegisterForm({ closeRegisterForm }: iRegisterFormProps) {
  async function handleSubmitRegister(event) {
    event.preventDefault();
    const formDatas = new FormData(event.target);
    try {
      const httpResponse = await axios.post(
        'http://localhost:3000/register',
        formDatas,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(httpResponse);
      closeRegisterForm();
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur", error);
    }
  }

  return (
    <div className="hidden-background" onClick={closeRegisterForm}>
      <div className="register" onClick={(event) => event.stopPropagation()}>
        <form
          className="register-form"
          method="post"
          onSubmit={handleSubmitRegister}
        >
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
          <label className="register-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="register-form-input"
            type="password"
            id="password"
            name="password"
          />
          <div className="register-form-div">
            <input
              className="register-form-input"
              type="checkbox"
              id="cgv"
              name="cgv"
            />
            <label className="register-form-label" htmlFor="cgv">
              Conditions générales
            </label>
          </div>
          <button className="register-form-button" type="submit">
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
