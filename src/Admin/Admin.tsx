import { NavLink } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import api from '../features/axiosApi';


import './Admin.scss'


function Admin (){

    // Permet de prévisualiser l'image lors de l'ajout d'un livre
    const [imagePresentation, setImagePresentation] = useState("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg")



    async function addBook(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);

            await api.post('/admin/book', {
                title: formData.get('title'),
                image: formData.get('image'),
                author: formData.get('author'),
                publication_year: Number(formData.get('parution')), 
                editor: formData.get('editor'), 
                isbn: formData.get('isbn'), 
                pages: Number(formData.get('pages')),
                // genre1: formData.get('genre1'),
                // genre2: formData.get('genre2'),
                summary: formData.get('summary'),
              });
            console.log(formData);
            console.log(formData.get('title'));
            
        } catch (error) {
            console.log(error);
        }
    }


     

    return (
        <section className="admin-page-section section">
            
            <div className="admin-container">

                <div className="admin-header">
                    <h1>Page administrateur</h1>
                    <ul className='admin-header-list'>
                        <li>
                            <NavLink to="" className="admin-header-list-link">Ajouter un livre</NavLink>
                        </li>
                        <li>
                            <NavLink to="" className="admin-header-list-link">Modifier un livre</NavLink>
                        </li>
                        <li>
                            <NavLink to="" className="admin-header-list-link">Supprimer un livre</NavLink>
                        </li>
                        
                    </ul>
                </div>

                <form onSubmit={addBook}>
                    <div className='book-modification-selection'>
                        
                    </div>
                    <div className='book-modification-presentation'>
                        <div className="book-modification-presentation-image">
                            <img src={imagePresentation} alt="" />
                        </div>
                        <div className="book-modification-presentation-texts">
                            <div className="book-modification-details"> 
                            <label htmlFor="title">Nom du livre:</label> 
                            <input type="text" name="title" placeholder="Don Quichotte" required />

                                <label htmlFor="image">URL image:</label> 
                                <input type="text" name="image" placeholder='https://www. --- image-du-livre.jpg' value={imagePresentation} onChange={e => setImagePresentation(e.target.value)} required />

                                <label htmlFor="author">Auteur:</label> 
                                <input type="text" name="author" placeholder='Prénom Nom' required />
                                
                                <label htmlFor="parution">Parution:</label> 
                                <input type="text" name="parution" placeholder='Année (ex: 1964)' required />
                                
                                <label htmlFor="editor">Edition:</label> 
                                <input type="text" name="editor" placeholder="Hachette, Gallimard, Editis, ..." required />
                                
                                <label htmlFor="isbn">ISBN:</label> 
                                <input type="text" name="isbn" placeholder="10 à 13 chiffres" required />
                                
                                <label htmlFor="pages">Pages:</label> 
                                <input type="text" name="pages" placeholder='Nombre de pages (ex: 361)' required />                        
                                
                                <label htmlFor="genre1">1er genre:</label> 
                                {/* <input type="text" name="name" placeholder='Roman -- non fonctionnel' required /> */}
                                <select name="genre1">
                                    <option value="">Choisir le genre principal</option>
                                </select>

                                <label htmlFor="genre2">2ème genre:</label> 
                                <select name="genre1">
                                    <option value="">Choisir le genre secondaire</option>
                                </select>

                                <label htmlFor="summary">Résumé:</label> 
                                <textarea name="summary" placeholder='Description' required />
                            

                                <button type="submit">Valider</button>
                            </div>
                        </div>
                    </div>    

                </form>




            </div>
      </section>
    )
}


export default Admin ; 