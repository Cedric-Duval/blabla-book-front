import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import api from '../features/axiosApi';
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import './UpdateUserModal.scss'


interface iUpdateUserProps {
    closeUpdateUserModal: () => void;
    setDisplayUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateUserModal({
    closeUpdateUserModal,
    setDisplayUpdateUserModal    
}: iUpdateUserProps) {


    return (
        <div className='hidden-background' onClick={closeUpdateUserModal}>
            <div className='update-modal'>
                <img id='validation-icon'src="./Pictures/check.png" alt="Icone de validation" />
                <div>Vos informations ont bien été mises à jour</div>
            </div>
        </div>
    )

};

export default UpdateUserModal;


