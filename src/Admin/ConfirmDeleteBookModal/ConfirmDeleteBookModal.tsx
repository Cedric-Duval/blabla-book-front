import { useCallback, useState } from 'react';
import api from '../../features/axiosApi';
import './ConfirmDeleteBookModal.scss'
import axios from 'axios';
import type { IDeleteBookError } from '../../@types/admin';
import type { IBooks } from '../../@types/books';

interface iConfirmDeleteProps {
    closeConfirmDeleteBookModal: () => void;
    currentBookIDtoUpdate: number | undefined;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setAllBooks: React.Dispatch<React.SetStateAction<IBooks[]>>;

}

function ConfirmDeleteBookModal({
    closeConfirmDeleteBookModal,
    currentBookIDtoUpdate,
    setIsLoading,
    setAllBooks,

}: iConfirmDeleteProps) {

    const [errors, setErrors] = useState<IDeleteBookError>({} as IDeleteBookError);


    async function deleteBook(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);

            await api.delete(`/admin/book/${currentBookIDtoUpdate}`, {
                data: {
                    password: formData.get('current-password'),
                },
            });

            console.log(event);
            getAllBooks();
            closeConfirmDeleteBookModal();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.errors) {
                const zodErrors = error.response.data.errors;
                const formattedErrors: IDeleteBookError = {
                    password: ''
                };
                for (const error of zodErrors) {
                    formattedErrors[error.field as keyof IDeleteBookError] = error.error;
                }
                setErrors(formattedErrors);
            }
        }
    }

    const getAllBooks = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/books');
            setAllBooks(response.data);
            setIsLoading(false);
        } catch (_error) {
            setIsLoading(false);
        }
    }, [setIsLoading, setAllBooks]);


    return (
        <div className='hidden-background'>
            <div className='update-modal'>
                <button
                    type="button"
                    onClick={closeConfirmDeleteBookModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        src="../Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="update-modal-img"
                    />
                </button>
                <img src="../Pictures/caution.png" alt="Icone de validation" className='caution-icon' />
                <p className='delete-user-message'>
                    Êtes vous sûr de vouloir supprimer ce livre ?
                    Veuillez saisir votre mot de passe administrateur pour confirmer la suppression.
                </p>
                <form className='delete-user-form' onSubmit={(event) => {
                    event.preventDefault();
                    deleteBook(event)
                }}>
                    <label htmlFor="current-password">
                        Mot de passe administrateur
                    </label>
                    <input
                        type="password"
                        name="current-password"
                        id="current-password"
                        className='input-delete-book'
                    />
                    {errors.password && (
                        <p className="register-form-error">{errors.password}</p>
                    )}
                    <button className='delete-book-button' type='submit'>
                        Supprimer le livre
                    </button>
                </form>
            </div>
        </div>
    )


}

export default ConfirmDeleteBookModal;