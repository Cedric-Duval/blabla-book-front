import { useEffect, useState } from 'react';
import './User.scss'
import type { IUser } from '../@types/user';
import api from '../features/axiosApi';
import axios from 'axios';
import { Link } from 'react-router';





function UserPage() {

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const httpResponse = await api.get('/user');
       
                setUserData(httpResponse.data);
                console.log(userData);
    
            } catch (error) {
                console.error("Erreur lors de la récupération des informations utilisateur:", error);
            };
        };

        fetchUserData();
    }, []);

return (
    <div>
        <section id='user-data-section'>
            <form action="">
                <p className='user-update-form-title'>Mes informations</p>
                <label className='user-update-form-label' htmlFor="name">
                    Nom
                </label>
                <input className='user-update-form-input'
                    type="text"
                    id='name'
                    name='name'
                    defaultValue={userData.name}
                />
                <label className='user-update-form-label' htmlFor="firstname">
                    Prénom
                </label>
                <input className='user-update-form-input' 
                    type="text"
                    id='firstname'
                    name='firstname'
                    defaultValue={userData.firstname}
                />
                <label className='user-update-form-label' htmlFor="email">
                    Email
                </label>
                <input className='user-update-form-input' 
                    type="email"
                    id='email'
                    name='email'
                    defaultValue={userData.email}

                />
                <label className='user-update-form-label' htmlFor="old-password">
                    Mot de passe actuel
                </label>
                <input className='user-update-form-input' 
                    type="password"
                    id='old-password'
                    name='old-password' 
                />
                <label className='user-update-form-label' htmlFor="new-password">
                    Nouveau mot de passe
                </label>
                <input className='user-update-form-input' 
                    type="password"
                    id='new-password'
                    name='new-password' 
                />
                <label className='user-update-form-label' htmlFor="renew-password">
                    Ressaisir le nouveau mot de passe
                </label>
                <input className='user-update-form-input' 
                    type="password"
                    id='renew-password'
                    name='renew-password' 
                />
                <button className='user-update-form-button' type='submit'>
                    Modifier
                </button>
                <button className='user-delete-button'>
                    Supprimer mon compte
                </button>
            </form>

        </section>



        <section id='user-libraries-section'>
            <p>Mes bibliothèques</p>

            <Link to='/library/:id'>
            </Link>

        </section>



    </div>

)




};


export default UserPage;