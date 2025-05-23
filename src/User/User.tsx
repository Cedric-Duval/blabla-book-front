import axios from 'axios';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { useNavigate } from 'react-router';
import type { IUser, IUserUpdateError } from '../@types/user';
import api from '../features/axiosApi';
import './User.scss';
import ConfirmDeleteUserModal from './ConfirmDeleteUserModal/ConfirmDeleteUserModal';
import DeleteLibraryModal from './DeleteLibraryModal/DeleteLibraryModal';
import DeleteUserModal from './DeleteUserModal/DeleteUserModal';
import UpdateUserModal from './UpdateUserModal/UpdateUserModal';
import Loader from '../Loader/Loader';


interface IUserProps {
  user?: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  reviewed: boolean;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
}


function User({
  user,
  setUser,
  setIsLogged,
  reviewed,
  setReviewed
}: IUserProps) {

  const navigate = useNavigate();
  const [errors, setErrors] = useState<IUserUpdateError>({} as IUserUpdateError);
  const [displayUpdateUserModal, setDisplayUpdateUserModal] = useState(false);
  const [displayDeleteUserModal, setDisplayDeleteUserModal] = useState(false);
  const [displayConfirmDeleteUserModal, setDisplayConfirmDeleteUserModal] = useState(false);
  const [displayDeleteLibraryModal, setDisplayDeleteLibraryModal] = useState(false);
  const [libraryId, setLibraryId] = useState<number>();
  const [userSection, setUserSection] = useState<string>('Mes informations');

  // On stocke l’id de la bibliothèque que l'on veut modifier pour afficher le formulaire
  const [editingLibraryId, setEditingLibraryId] = useState<number | null>(null);
  // On stocke la valeur de l’input du formulaire
  const [newLibraryName, setNewLibraryName] = useState('');

  //For fading title animation
  const [displayedSection, setDisplayedSection] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  //For loading page animation
  const [isLoading, setIsLoading] = useState(true);

  const getUser = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/user');
      setUser(response.data);
      setIsLoading(false);
    } catch (_error) { }
  }, [setUser]);

  useEffect(() => {
    if (reviewed !== undefined) {
      getUser();
    }
  }, [getUser, reviewed]);
  
  //Handle fading title animation
  useEffect(() => {
    if(userSection !== displayedSection) {
        setFadeClass('fade-out');
    
        const timeout = setTimeout(() => {
            setDisplayedSection(userSection);
            setFadeClass('');
        }, 200);
    
        return () => clearTimeout(timeout);
    }

  }, [userSection, displayedSection]);

  function closeUpdateUserModal() {
    setDisplayUpdateUserModal(false);
  }

  function openDeleteUserModal() {
    //Empty the errors state to avoid duplicated error messages when the modal pops up
    setErrors({} as IUserUpdateError);
    setDisplayDeleteUserModal(true);
  }

  function closeDeleteUserModal() {
    setDisplayDeleteUserModal(false);
  }

  function openDeleteLibraryModal() {
    setDisplayDeleteLibraryModal(true);
  }

  function closeDeleteLibraryModal() {
    setDisplayDeleteLibraryModal(false);
  }

  //Close the confirmation of user data deletion, disconnect the user and redirect him to the homepage
  function closeConfirmDeleteUserModal() {
    localStorage.removeItem('token');
    setIsLogged(false);
    setUser(undefined);
    setDisplayConfirmDeleteUserModal(false);
    navigate('/');
  }

  async function handleUserDatasUpdate(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrors({} as IUserUpdateError);

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

      form.reset();
      getUser();
      setDisplayUpdateUserModal(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        const zodErrors = error.response.data.errors;
        const formattedErrors: IUserUpdateError = {
          confirmPassword: '',
          password: ''
        };
        for (const error of zodErrors) {
          formattedErrors[error.field as keyof IUserUpdateError] = error.error;
        }
        setErrors(formattedErrors);
      }
    }
  }

  const handleDeleteReview = async (reviewId: number) => {
    try {
        await api.delete(`/review/${reviewId}`);
        setReviewed(prev => !prev)
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'avis :", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }







  async function renameLibrary(event: React.FormEvent<HTMLFormElement>, id: number) {
    try {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);

      // console.log(form);
      // console.log(formData.get('library-rename-input'));

      await api.patch(
        `/library/${id}`,
        {
          name: formData.get('library-rename-input'),
        }
      );
      getUser();


    } catch (error) {
      console.log(error);

    }
  }




  return (
    <section className="user-profile">
      <div className='user-profile-header'>
        <h1 className='user-profile-header-title'>
          Mon profil
        </h1>
        <ul className='user-profile-header-navlink'>
            <NavLink
              className={
                userSection === 'Mes informations'
                  ? 'user-profile-header-list-link selected-status'
                  : 'user-profile-header-list-link'
              }
              to=""
              onClick={(event) => {
                event.preventDefault();
                setErrors({} as IUserUpdateError);
                setUserSection('Mes informations');
              }}
            >
              <li>Mes informations</li>
            </NavLink>
            <NavLink
              className={
                userSection === 'Modifier mon mot de passe'
                  ? 'user-profile-header-list-link selected-status'
                  : 'user-profile-header-list-link'
              }
              to=""
              onClick={(event) => {
                event.preventDefault();
                setErrors({} as IUserUpdateError);
                setUserSection('Modifier mon mot de passe');
              }}
            >
              <li>Modifier mon mot de passe</li>
            </NavLink>
            <NavLink
              className={
                userSection === 'Supprimer mon compte'
                  ? 'user-profile-header-list-link selected-status'
                  : 'user-profile-header-list-link'
              }
              to=""
              onClick={(event) => {
                event.preventDefault();
                setErrors({} as IUserUpdateError);
                setUserSection('Supprimer mon compte');
              }}
            >
              <li>Supprimer mon compte</li>
            </NavLink>
          </ul>
      </div>
      <div className='user-profile-container'>
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
            setDisplayConfirmDeleteUserModal={setDisplayConfirmDeleteUserModal}
            errors={errors}
            setErrors={setErrors}
          />
        )}
        {displayConfirmDeleteUserModal && (
          <ConfirmDeleteUserModal
            closeConfirmDeleteUserModal={closeConfirmDeleteUserModal}
          />
        )}
        {libraryId !== undefined && displayDeleteLibraryModal && (
          <DeleteLibraryModal
            closeDeleteLibraryModal={closeDeleteLibraryModal}
            errors={errors}
            setErrors={setErrors}
            libraryId={libraryId}
            setUser={setUser}
          />
        )}
        <div className="user-data-section">
          <p className={`user-update-form-title fade ${fadeClass}`}>{displayedSection}</p>

          {userSection === 'Mes informations' && (
            <form onSubmit={handleUserDatasUpdate}>
              <label className="user-update-form-label" htmlFor="name">
                Nom
              </label>
              <input
                className="user-update-form-input"
                type="text"
                id="name"
                name="name"
                defaultValue={user?.name}
              />
              <label className="user-update-form-label" htmlFor="firstname">
                Prénom
              </label>
              <input
                className="user-update-form-input"
                type="text"
                id="firstname"
                name="firstname"
                defaultValue={user?.firstname}
              />
              <label className="user-update-form-label" htmlFor="email">
                Email
              </label>
              <input
                className="user-update-form-input"
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email}
              />
              <label className="user-update-form-label" htmlFor="old-password">
                Mot de passe actuel <em>*</em>
              </label>
              <input
                className="user-update-form-input"
                type="password"
                id="old-password"
                name="current-password"
              />
              {errors.password && (
                <p className="register-form-error">{errors.password}</p>
              )}
              <button className="user-update-form-button" type="submit">
                Modifier
              </button>
            </form>
          )}
          {userSection === 'Modifier mon mot de passe' && (
            <form onSubmit={handleUserDatasUpdate}>
              <label className="user-update-form-label" htmlFor="current-password">
                Mot de passe actuel <em>*</em>
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
                Nouveau mot de passe <em>*</em>
              </label>
              <input
                className="user-update-form-input"
                type="password"
                id="new-password"
                name="new-password"
              />
              <label className="user-update-form-label" htmlFor="renew-password">
                Confirmer le mot de passe <em>*</em>
              </label>
              <input
                className="user-update-form-input"
                type="password"
                id="renew-password"
                name="confirm-password"
              />
              {errors.confirmPassword && (
                <p className="register-form-error">{errors.confirmPassword}</p>
              )}
              <button className="user-update-form-button" type="submit">
                Modifier
              </button>
            </form>
          )}
          {userSection === 'Supprimer mon compte' && (
            <button type="button" className="user-delete-button" onClick={openDeleteUserModal}>
              Supprimer mon compte
            </button>
          )}
        </div>

        {/* Affichage des librairies du User */}
        <div id="user-libraries-section">
          <p id="user-libraries-section-title">Mes bibliothèques</p>

          <ul id="libraries-list">
            {user?.Libraries?.map((Library, index) => {
              return (
                <li key={Library.id} 
                  className='animated-library'
                  style={{
                    animationDelay: `${index * 70}ms`,
                  }}
                  >
                  <Link to={'/myLibrary'}>
                    <figure>
                      <div className="book-img">
                      {Library.Books[0]?.image ? (
                          <img src={Library.Books[0].image} alt="book-image" />
                        ) : (
                          <div className='no-book-img'>
                            <p>Il n'y a pas encore de livre dans cette bibliothèque. Ajoutez en un !</p>
                            <p className="addbook-box-btn">
                            <em>+</em> Ajouter
                          </p>
                        </div>
                      )}
                      </div>
                      <figcaption className="library-name">
                        {Library.name}
                      </figcaption>
                    </figure>
                  </Link>
                  {editingLibraryId === Library.id ? (
                    <form onSubmit={(event) => {
                      event.preventDefault();
                      renameLibrary(event, Library.id);
                      setEditingLibraryId(null);
                    }}>
                      <input
                        type="text"
                        name="library-rename-input"
                        placeholder={Library.name}
                        value={newLibraryName}
                        className='library-rename-input'
                        onChange={(e) => setNewLibraryName(e.target.value)}
                        required />
                      <button className="library-rename" type="submit">
                        Valider
                      </button>
                    </form>
                  ) : (
                    <button className="library-update" type="button" onClick={() => {
                      setEditingLibraryId(Library.id);
                      setNewLibraryName(Library.name);
                    }}
                    >
                      Renommer
                    </button>
                  )}

                  <button type="button" className="library-delete" onClick={(event) => {
                    event.stopPropagation();
                    setLibraryId(Library.id)
                    openDeleteLibraryModal();
                  }}>
                    Supprimer
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className='user-reviews-section'>
        <p className="user-reviews-section-title">Mes avis ({user?.Reviews.length})</p>
        {user?.Reviews && user.Reviews.length > 0 && (
            <div className="user-reviews-section-reviews-container">
              <ul>
                {user.Reviews.map((review) => (
                  <div key={review.id} className='user-reviews-section-reviews-container-review-container'>
                    <Link
                    to={`/book/${review.Book.id}`}
                    >
                    <div className='user-reviews-section-reviews-container-review-container-book-img'>                  
                      <img src={review.Book.image} alt="book-image" />
                    </div>
                    </Link>
                    <li className='user-reviews-section-reviews-container-review-container-text-container'>
                      <p><strong>{review.Book.title}</strong></p>
                      <p className='author'>{review.Book.author}</p>
                      <p className='note'><strong className='note-text'>Note :</strong> {review.rating} <span className='star'>★</span></p>
                      <p>{review.content}</p>
                      <p className="review-meta">Posté le {new Date(review.createdAt).toLocaleDateString()}</p>
                      <button type="button" className='reviews-delete-button' onClick={() => handleDeleteReview(review.id)}>
                        <img src="../Pictures/tabler--trash.svg" alt="Review Trash Icon" />
                      </button>
                    </li>
                  </div>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default User;
