import axios from 'axios';
import api from '../../features/axiosApi';
import './DeleteLibraryModal.scss'
import type { IUser, IUserUpdateError } from '../../@types/user';

interface iDeleteLibraryModalProps {
    closeDeleteLibraryModal: () => void;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<IUserUpdateError>>;
    libraryId: number;
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}

function DeleteLibraryModal({
    closeDeleteLibraryModal,
    errors,
    setErrors,
    libraryId,
    setUser
}: iDeleteLibraryModalProps) {

    async function getUser() {
        try {
          const response = await api.get('/user');
          setUser(response.data);
        } catch (_error) {}
      }

    async function handleDeleteLibrary(
        event: React.FormEvent<HTMLFormElement>,
        id: number,
    ) {
        event.preventDefault();

        setErrors({} as IUserUpdateError)

        const form = event?.currentTarget;
        const formData = new FormData(form);


        try {
          await api.delete(
            `/library/${id}`, {
                data : {
                    currentPassword: formData.get('current-password'),
                }
            }
          ); 

          closeDeleteLibraryModal();
          getUser();

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
    



    return (
        <div className='hidden-background' /* onClick={closeDeleteLibraryModal} */>
        <div className='delete-modal' onClick={(event) => event.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        <button
                    type="button"
                    onClick={closeDeleteLibraryModal}
                    className="delete-modal-closeBtn"
                >
                    <img
                        src="./Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="delete-modal-closeBtn-img"
                    />
                </button>
            <img id='caution-icon'src="../Pictures/caution.png" alt="Icone de validation" />
            <p className='delete-user-message'>
                Êtes vous sûr de vouloir supprimer cette librairie ?
                Veuillez saisir votre mot de passe pour confirmer la suppression.
            </p>
            <form className='delete-user-form' onSubmit={(event) => {
                event.preventDefault();
                handleDeleteLibrary(event, libraryId)
                }}>
                <label htmlFor="current-password">
                    Mot de passe actuel
                </label>
                <input 
                type="password" 
                name="current-password" 
                id="current-password" 
                />
                {errors.password && (
                    <p className="register-form-error">{errors.password}</p>
                )}
                <button className='delete-library-button' type='submit'>
                    Supprimer la librairie
                </button>
            </form>
        </div>
    </div>
    )


}

export default DeleteLibraryModal;