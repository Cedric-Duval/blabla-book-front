import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import '../Books/Books.scss'
import './PersonalLibrary.scss'
import axios from 'axios';

import DropdownMenu from '../DropdownMenu/DropdownMenu';


function Books() {

    const userId = 1;


    const [myLibraries, setMyLibraries] = useState([]);
    useEffect(() => {
        const getmyLibraries = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/user/${userId}/libraries/books`,
                );
                setMyLibraries(response.data);
                // console.log(response.data);
                // console.log(response.data[0]);
                // console.log(response.data[0].Books);

            } catch (error) {
                console.log(error);
                
            }
        };
        getmyLibraries();
    }, []);
    // Ajouter manuellement une bibliothèque pour le user 1
    // INSERT INTO "library" ("name", "user_id") VALUES ('nom bibliothèque', 1);
 


    async function handleLibraryCreation(formData) {
        const formDataValue = formData.get('newLibraryName') as string;
        try {
            console.log(formDataValue);

            // Requête POST axios avec :
            // library_id: libraryId,
            // book_id: bookId,
            
        } catch (error) {
            console.log(error);
            
        }
    }

  
    const [displayDropdownMenu, setDisplayDropdownMenu] = useState(null);

    // Ouvre le dropdown menu si on clique sur le bouton 
    function displayMenu(event) {
            // event.preventDefault();
            event.stopPropagation();

            //console.log(event);
            console.log("Library id : " + event.target.dataset.libraryId + ", book id : " + event.target.dataset.id);
            const bookId = Number(event.target.dataset.id);
        
            setDisplayDropdownMenu(bookId)
    }

    // Fermer le dropdown menu si on clique ailleurs
    useEffect(() => {
        function handleClickOutside() {
            setDisplayDropdownMenu(null);
        }
        if (displayDropdownMenu !== null) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [displayDropdownMenu]);
    



    return (
        
        <section id="books-section" className="section">


            <div className='head-books'>
                <h1>Ma bibliothèque</h1>
                <input type="text"
                placeholder="Recherche parmis vos livres" />
            </div> 

            <div id="library-choice">
                <ul>
                    <NavLink to=""><li>Tous</li></NavLink>
                    <NavLink to=""><li>Lus</li></NavLink>
                    <NavLink to=""><li>A lire</li></NavLink>
                </ul>
                <form action={handleLibraryCreation} >
                    <input type="text" id="newLibraryName" name="newLibraryName" placeholder='Créer une bibliothèque' />
                    <button type="submit">Créer</button>
                </form>
            </div>


            {myLibraries.map((library) => {
                return(

                    <div className="books-list" key={library.id}>

                        <h3 className='library-title'>{library.name}</h3>
                        <ul className='books-list-ul'>
                            {library.Books.map((book) => {
                                return (
                                    <li key={book.id} className='books-list-li'>

                                        
                                        <Link to={`/book/${book.id}`}>
                                            <figure>
                                                <div id="book-img">
                                                    <img
                                                        src={book.image} alt="book-image"
                                                    />
                                                    
                                                </div>
                                                <hgroup>
                                                    <figcaption>{book.title}</figcaption>
                                                    <h5>{book.author}</h5>
                                                </hgroup>

                                            </figure>
                                        </Link>
                                        <button type='button' data-id={book.id} data-libraryId={library.id} onClick={displayMenu}> ... </button>
                                        {displayDropdownMenu === book.id && (<DropdownMenu />)}
                                    </li>
                                )
                            })}

                        </ul>
                    </div> 
                )
            })}
        </section>
    )
}

export default Books;