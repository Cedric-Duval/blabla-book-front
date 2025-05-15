import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './ConfirmDeleteBookModal.scss'

interface iConfirmDeleteProps {
    closeConfirmDeleteBookModal: () => void;
}

function ConfirmDeleteBookModal({
    closeConfirmDeleteBookModal,
}: iConfirmDeleteProps) {



    return (
        <div className='hidden-background' onClick={closeConfirmDeleteBookModal}>
            <div className='update-modal'>
                <img id='validation-icon'src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Ce livre a bien été supprimé de la base de données.
                </p>
            </div>
        </div>
    )

}

export default ConfirmDeleteBookModal;