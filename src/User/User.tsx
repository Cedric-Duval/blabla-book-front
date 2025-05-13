import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './User.scss';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal';
import DeleteUserModal from './DeleteUserModal/DeleteUserModal';


interface IUserProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function User({ user, setUser }: IUserProps) {
    const [errors, setErrors] = useState({});
    const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false);
    const [displayDeleteUserModal, setDisplayDeleteUserModal] = useState(false);


  async function getUser() {
    try {
      const response = await api.get('/user');
      setUser(response.data);
    } catch (_error) {}
  }

  useEffect(() => {
    getUser();
  }, []);

  function closeUpdateUserModal() {
    setDisplayUpdateUserModal(false);
  }

  function openDeleteUserModal() {
    setDisplayDeleteUserModal(true);
  }

  function closeDeleteUserModal() {
    setDisplayDeleteUserModal(false);
  }

  async function handleUserDatasUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log(form);

    try {
      await api.patch('/user', {
        name: formData.get('name'),
        firstname: formData.get('firstname'),
        email: formData.get('email'),
        currentPassword: formData.get('current-password'),
        newPassword: formData.get('new-password'),
        confirmPassword: formData.get('confirm-password'),
      });
      
      getUser();
      setDisplayUpdateUserModal(true);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.data.errors) {
          const zodErrors = error.response.data.errors;
          const formattedErrors: { [key: string]: string } = {};
          for (const error of zodErrors) {
            formattedErrors[error.field] = error.error;
          }
          setErrors(formattedErrors);
        }
      }
  }

  if (!user) {
    return <div>Chargement de vos données...</div>;
  }

  return (
    <div id="user-profile">
      {displayUpdateUserModal && (
        <UpdateUserModal
          closeUpdateUserModal={closeUpdateUserModal}
          setDisplayUpdateUserModal={setDisplayUpdateUserModal}
        />
      )}
      {displayDeleteUserModal && (
        <DeleteUserModal
          closeDeleteUserModal={closeDeleteUserModal}
          setDisplayDeleteUserModal={setDisplayDeleteUserModal}
        />
      )}
      <section id="user-data-section">
        <form onSubmit={handleUserDatasUpdate}>
          <p id="user-update-form-title">Mes informations</p>
          <label className="user-update-form-label" htmlFor="name">
            Nom
          </label>
          <input
            className="user-update-form-input"
            type="text"
            id="name"
            name="name"
            defaultValue={user.name}
          />
          <label className="user-update-form-label" htmlFor="firstname">
            Prénom
          </label>
          <input
            className="user-update-form-input"
            type="text"
            id="firstname"
            name="firstname"
            defaultValue={user.firstname}
          />
          <label className="user-update-form-label" htmlFor="email">
            Email
          </label>
          <input
            className="user-update-form-input"
            type="email"
            id="email"
            name="email"
            defaultValue={user.email}
          />
          <label className="user-update-form-label" htmlFor="old-password">
            Mot de passe actuel
          </label>
          <input
            className="user-update-form-input"
            type="password"
            id="current-password"
            name="current-password"
          />
          {errors.password && (
            <p className="register-form-error">{errors.password}</p>
          )}
          <label className="user-update-form-label" htmlFor="new-password">
            Nouveau mot de passe
          </label>
          <input
            className="user-update-form-input"
            type="password"
            id="new-password"
            name="new-password"
          />
          <label className="user-update-form-label" htmlFor="renew-password">
            Confirmer le mot de passe
          </label>
          <input
            className="user-update-form-input"
            type="password"
            id="confirm-password"
            name="confirm-password"
          />
          {errors.confirmPassword && (
            <p className="register-form-error">{errors.confirmPassword}</p>
          )}
          <button className="user-update-form-button" type="submit">
            Modifier
          </button>
          <button type="button" className="user-delete-button" onClick={openDeleteUserModal}>
            Supprimer mon compte
          </button>
        </form>
      </section>

      {/* Affichage des librairies du User */}
      <section id="user-libraries-section">
        <p id="user-libraries-section-title">Mes bibliothèques</p>

        <ul id="libraries-list">
          {user?.Libraries &&
            user?.Libraries.map((Library) => {
              return (
                <li key={Library.id}>
                  <Link to={`/myLibrary`}>
                    <figure>
                      {Library.Books[0]?.image && (
                        <div className="book-img">
                          <img src={Library.Books[0].image} alt="book-image" />
                        </div>
                      )}
                      <figcaption className="library-name">
                        {Library.name}
                      </figcaption>
                    </figure>
                  </Link>
                  <button className="library-update" type="submit">
                    Modifier
                  </button>
                  <button type="button" className="library-delete">
                    Supprimer
                  </button>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
}

export default User;
