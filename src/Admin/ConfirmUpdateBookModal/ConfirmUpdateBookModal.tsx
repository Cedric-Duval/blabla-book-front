import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './ConfirmUpdateBookModal.scss'

interface iConfirmUpdateProps {
    closeConfirmUpdateBookModal: () => void;
}

function ConfirmUpdateBookModal({
    closeConfirmUpdateBookModal,
}: iConfirmUpdateProps) {



    return (
        <div className='hidden-background' onClick={closeConfirmUpdateBookModal}>
            <div className='update-modal'>
                <img id='validation-icon'src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Ce livre a bien été modifié dans la base de données.
                </p>
            </div>
        </div>
    )

}

export default ConfirmUpdateBookModal;