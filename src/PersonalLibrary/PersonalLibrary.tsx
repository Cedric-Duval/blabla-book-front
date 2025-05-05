import { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router';
import '../Books/Books.scss'
import './PersonalLibrary.scss'
import axios from 'axios';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import api from '../features/axiosApi';


function PersonalLibrary() {

    const userId = 1;
    const [displayDropdownMenu, setDisplayDropdownMenu] = useState(null);


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


// -------------- FONCTION DE CREATION DE BIBLITOTHEQUE -----------------------------

    async function handleLibraryCreation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newLibraryName = formData.get('newLibraryName') as string;

        try {
            const response = await api.post('http://localhost:3000/library', {
                name: newLibraryName,
            });

            console.log('Bibliothèque créée :', response.data);

            form.reset();
        } catch (error) {
            console.error('Erreur lors de la création de la bibliothèque :', error);
        }
    }



    // Si on clique sur le bouton du dropdown menu, celui-ci s'affiche avec le livre et librarie
    function displayMenu(event) {
        // event.preventDefault();
        event.stopPropagation();

        //console.log(event);
        console.log("Library id : " + event.target.dataset.libraryid + ", book id : " + event.target.dataset.id);
        const bookId = Number(event.target.dataset.id);
        const libraryId = Number(event.target.dataset.libraryid);

        setDisplayDropdownMenu({ bookId, libraryId })
    }

    // Fermer le dropdown menu si on clique ailleurs
    // useEffect(() => {
    //     function handleClickOutside() {
    //         setDisplayDropdownMenu(null);
    //     }
    //     if (displayDropdownMenu !== null) {
    //         document.addEventListener('click', handleClickOutside);
    //     }
    //     return () => {
    //         document.removeEventListener('click', handleClickOutside);
    //     };
    // }, [displayDropdownMenu]);




    return (



        <section id="personalLibrary-section" className="section books-section">

            {/* Le DropdownMenu de myLibrary */}
            {displayDropdownMenu && (<DropdownMenu />)}



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

                <form onSubmit={handleLibraryCreation}>
                    <input
                        type="text"
                        id="newLibraryName"
                        name="newLibraryName"
                        placeholder="Créer une bibliothèque"
                        required
                    />
                    <button type="submit">Créer</button>
                </form>
            </div>


            {myLibraries.map((library) => {
                return (

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
                                        <button type='button' data-id={book.id} data-libraryid={library.id} onClick={displayMenu}> ... </button>


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

export default PersonalLibrary;