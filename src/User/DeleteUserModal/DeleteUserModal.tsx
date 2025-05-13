import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './DeleteUserModal.scss'

interface iDeleteUserProps {
    closeDeleteUserModal: () => void;
    setDisplayDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}



function DeleteUserModal({
    closeDeleteUserModal,
    setDisplayDeleteUserModal
}: iDeleteUserProps) {

    async function handleDeleteUserDatas(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log(form);


        try {
            await api.delete('/user', {
                data: {
                    currentPassword: formData.get('current-password'),
                    confirmPassword: formData.get('confirm-password'),
                }
            });

        setDisplayDeleteUserModal(false);


        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className='hidden-background' onClick={closeDeleteUserModal}>
            <div className='update-modal' onClick={(event) => event.stopPropagation()}>
                <img id='validation-icon'src="./Pictures/caution.png" alt="Icone de validation" />
                <div>Attention, la suppression de votre compte est définitive. Êtes vous bien sûr de vouloir continuer ?
                    Veuillez saisir votre mot de passe pour confirmer la suppression.
                </div>
                <form className='delete-user-form' onSubmit={handleDeleteUserDatas}>
                    <label htmlFor="current-password">
                        Mot de passe actuel
                    </label>
                    <input 
                    type="password" 
                    name="current-password" 
                    id="current-password" />
                    <label htmlFor="confirm-password">
                        Confirmer le mot de passe
                    </label>
                    <input 
                    type='password'
                    name='confirm-password'
                    id='confirm-password' 
                    />
                    <button className='delete-user-button' type='submit'>
                        Supprimer mon compte
                    </button>
                </form>
            </div>
        </div>
    )


}

export default DeleteUserModal;
