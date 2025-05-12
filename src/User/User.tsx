import { useEffect, useState } from 'react';
import './User.scss';
import axios from 'axios';
import { Link } from 'react-router';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import api from '../features/axiosApi';

interface IUserProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function User({ user, setUser }: IUserProps) {
  async function getUser() {
    try {
      const response = await api.get('/user');
      //console.log(response.data);
      setUser(response.data);
    } catch (_error) {}
  }

  useEffect(() => {
    getUser();
  }, [user]);

  async function handleUserDatasUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

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
    } catch (_error) {
      console.log(_error);
    }
  }

  if (!user) {
    return <div>Chargement de vos données...</div>;
  }

  async function deleteLibrary(id) {
    try {
      const response = await api.delete(
        `/library/${id}`
      );      
    } catch (error) {
      console.log(error);
    }
  }

  async function renameLibrary(event: React.FormEvent<HTMLFormElement>, id) {

    
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);

      // console.log(form);
      // console.log(formData.get('library-rename-input'));

      const response = await api.patch(
        `/library/${id}`,
        {
          name: formData.get('library-rename-input'),
        }
      ); 

  
    } catch (error) {
      console.log(error);
      
    }
  }




  return (
    <div id="user-profile">
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
          <button className="user-update-form-button" type="submit">
            Modifier
          </button>
          <button type="button" className="user-delete-button">
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
                  <form onSubmit={(event) => {
                    renameLibrary(event, Library.id)
                  }}>
                    <input
                        type="text"
                        id="library-rename-input"
                        name="library-rename-input"
                        placeholder={Library.name}
                        required/>
                    <button className="library-rename" type="submit">
                      Valider
                    </button>
                  </form>
                  <button className="library-update" type="button">
                    Modifier
                  </button>
                  
                  <button type="button" className="library-delete" onClick={(event) => {
                    event.stopPropagation();
                    deleteLibrary(Library.id);
                    }}>
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
