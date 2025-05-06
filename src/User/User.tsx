import { useEffect, useState } from 'react';
import './User.scss'
import type { IBooks } from '../@types/books';
import type { ILibraries } from '../@types/libraries';
import type { IUser } from '../@types/user';
import api from '../features/axiosApi';
import axios from 'axios';
import { Link } from 'react-router';

interface IUserProps {
    user?: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
}



function UserPage({
    user,
    setUser
}: IUserProps) {

    console.log(user);
    console.log(user?.Libraries);
    user?.Libraries?.forEach((library) => {
        console.log(`Books in Library ${library.name}:`, library.Books);
      });

return (
    <div id='user-profile'>
        <section id='user-data-section'>
            <form action="">
                <p id='user-update-form-title'>Mes informations</p>
                <label className='user-update-form-label' htmlFor="name">
                    Nom
                </label>
                <input className='user-update-form-input'
                    type="text"
                    id='name'
                    name='name'
                    defaultValue={user.name}
                />
                <label className='user-update-form-label' htmlFor="firstname">
                    Prénom
                </label>
                <input className='user-update-form-input' 
                    type="text"
                    id='firstname'
                    name='firstname'
                    defaultValue={user.firstname}
                />
                <label className='user-update-form-label' htmlFor="email">
                    Email
                </label>
                <input className='user-update-form-input' 
                    type="email"
                    id='email'
                    name='email'
                    defaultValue={user.email}

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
            <p id='user-libraries-section-title'>Mes bibliothèques</p>

            <ul id='libraries-list'>
                {user?.Libraries.map((Library) => {
                    return (
                        <li key={Library.id}>
                            <Link to={`/library/${Library.id}`}>
                                <figure>
                                    <div id="book-img">
                                        <img
                                            src={Library.Books[0].image} alt="book-image"
                                        />
                                    </div>
                                    <hgroup>
                                        <figcaption>{Library.name}</figcaption>
                                    </hgroup>
                                </figure>
                            </Link>
                        </li>
                    )
                })}

            </ul>

        </section>



    </div>

)




};


export default UserPage;