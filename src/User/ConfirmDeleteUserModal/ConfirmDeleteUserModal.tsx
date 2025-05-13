import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './ConfirmDeleteUserModal.scss'

interface iConfirmDeleteProps {
    closeConfirmDeleteUserModal: () => void;
}

function ConfirmDeleteUserModal({
    closeConfirmDeleteUserModal,
}: iConfirmDeleteProps) {



    return (
        <div className='hidden-background' onClick={closeConfirmDeleteUserModal}>
            <div className='update-modal'>
                <img id='validation-icon'src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Votre compte a bien été supprimé. <br />
                    Merci d'avoir utilisé BlaBla Book !
                </p>
            </div>
        </div>
    )

}

export default ConfirmDeleteUserModal;