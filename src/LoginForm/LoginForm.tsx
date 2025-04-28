import { Link } from 'react-router';
import './LoginForm.scss';
import axios from 'axios';

interface iRegisterFormProps {
  closeLoginForm: () => void;
  setUser: React.Dispatch<React.SetStateAction<undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginForm({
  closeLoginForm,
  setUser,
  setIsLogged,
}: iRegisterFormProps) {
  async function handleSubmitLogin(event) {
    event.preventDefault();
    const formDatas = new FormData(event.target);
    try {
      const httpResponse = await axios.post(
        'http://localhost:3000/login',
        formDatas,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setUser(httpResponse.data.user);
      setIsLogged(true);
      closeLoginForm();
    } catch (error) {
      console.error("Erreur lors de l'identification", error);
    }
  }

  return (
    <div className="hidden-background" onClick={closeLoginForm}>
      <div className="login" onClick={(event) => event.stopPropagation()}>
        <form className="login-form" method="post" onSubmit={handleSubmitLogin}>
          <p className="login-form-title">Connexion</p>
          <label className="login-form-label" htmlFor="email">
            Adresse mail
          </label>
          <input
            className="login-form-input"
            type="email"
            id="email"
            name="email"
          />
          <label className="login-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="login-form-input"
            type="password"
            id="password"
            name="password"
          />
          <button className="login-form-button" type="submit">
            Se connecter
          </button>
          <Link to="#" className="login-form-redirection">
            Pas encore inscrit ? Se créer un compte
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
