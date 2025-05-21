import axios from 'axios';
import api from '../../features/axiosApi';
import './DeleteUserModal.scss';
import type { IUserUpdateError } from '../../@types/user';

interface iDeleteUserProps {
    closeDeleteUserModal: () => void;
    setDisplayDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    setDisplayConfirmDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
    errors: Record<string, string>;
    setErrors: React.Dispatch<React.SetStateAction<IUserUpdateError>>;
}



function DeleteUserModal({
    closeDeleteUserModal,
    setDisplayDeleteUserModal,
    setDisplayConfirmDeleteUserModal,
    errors,
    setErrors
}: iDeleteUserProps) {

    async function handleDeleteUserDatas(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);


        try {
            await api.delete('/user', {
                data: {
                    currentPassword: formData.get('current-password'),
                    confirmPassword: formData.get('confirm-password'),
                }
            });

        setDisplayDeleteUserModal(false);
        setDisplayConfirmDeleteUserModal(true);

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
        <div className='hidden-background' /* onClick={closeDeleteUserModal} */>
            <div className='delete-modal' onClick={(event) => event.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
            <button
                    type="button"
                    onClick={closeDeleteUserModal}
                    className="delete-modal-closeBtn"
                >
                    <img
                        src="../Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="delete-modal-closeBtn-img"
                    />
                </button>
                <img id='caution-icon'src="../Pictures/caution.png" alt="Icone de validation" />
                <p className='delete-user-message'>
                    Attention, la suppression de votre compte est définitive. Êtes vous bien sûr de vouloir continuer ?
                    Veuillez saisir votre mot de passe pour confirmer la suppression.
                </p>
                <form className='delete-user-form' onSubmit={handleDeleteUserDatas}>
                    <label htmlFor="current-password">
                        Mot de passe actuel <em>*</em>
                    </label>
                    <input 
                    type="password" 
                    name="current-password" 
                    id="current-password" 
                    />
                    {errors.password && (
                        <p className="register-form-error">{errors.password}</p>
                    )}
                    <label htmlFor="confirm-password">
                        Confirmer le mot de passe <em>*</em>
                    </label>
                    <input 
                    type='password'
                    name='confirm-password'
                    id='confirm-password'
                    />
                    {errors.confirmPassword && (
                        <p className="register-form-error">{errors.confirmPassword}</p>
                    )}
                    <button className='delete-user-button' type='submit'>
                        Supprimer mon compte
                    </button>
                </form>
            </div>
        </div>
    )


}

export default DeleteUserModal;
