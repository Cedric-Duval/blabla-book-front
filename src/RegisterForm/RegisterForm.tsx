import { Link } from 'react-router';
import './RegisterForm.scss';
import axios from 'axios';
import api from '../features/axiosApi';
import { useState } from 'react';
import type { IRegisterError } from '../@types/user';

interface IRegisterFormProps {
  closeRegisterForm: () => void;
  setDisplayLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function RegisterForm({
  closeRegisterForm,
  setDisplayLoginForm,
}: IRegisterFormProps) {
  const [errors, setErrors] = useState<IRegisterError>({} as IRegisterError);

  async function handleSubmitRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formDatas = new FormData(event.currentTarget);
    try {
      await api.post('/register', formDatas, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      closeRegisterForm();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IRegisterError = {
          email: '',
          password: '',
          firstname:'',
          name:''
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IRegisterError] = error.message;
        }
        setErrors(formattedErrors);
      }
    }
  }

  return (
    <div className="hidden-background" /* onClick={closeRegisterForm} */ >
      <div className="register" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
      <button
          type="button"
          onClick={closeRegisterForm}
          className="register-closeBtn"
        >
          <img
            src="../Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
          />
        </button>
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
          {errors.email && (
            <p className="register-form-error">{errors.email}</p>
          )}

          <label className="register-form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="firstname"
            name="firstname"
          />
          {errors.firstname && (
            <p className="register-form-error">{errors.firstname}</p>
          )}

          <label className="register-form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="register-form-input"
            type="text"
            id="name"
            name="name"
          />
          {errors.name && <p className="register-form-error">{errors.name}</p>}

          <label className="register-form-label" htmlFor="password">
            Mot de passe
          </label>
          <input
            className="register-form-input"
            type="password"
            id="password"
            name="password"
          />
          {errors.password && (
            <p className="register-form-error">{errors.password}</p>
          )}

          <div className="register-form-div">
            <input
              className="register-form-input"
              type="checkbox"
              id="cgv"
              name="cgv"
              required
            />
            <label className="register-form-label" htmlFor="cgv">
              Conditions générales
            </label>
          </div>
          <button className="register-form-button" type="submit">
            S'inscrire
          </button>
          <Link
            to="#"
            className="register-form-redirection"
            onClick={() => {
              closeRegisterForm();
              setDisplayLoginForm(true);
            }}
          >
            Déjà inscrit ? Se connecter
          </Link>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
