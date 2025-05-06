import { useEffect, useState, } from 'react';
import { Link, NavLink } from 'react-router';
import '../Books/Books.scss'
import './PersonalLibrary.scss'
import type { ILibrary } from '../@types/books';
import api from '../features/axiosApi';

interface PersonalLibraryProps {
    setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentBook: React.Dispatch<React.SetStateAction<ILibrary | null | undefined>>;
}


function PersonalLibrary({ setDisplayModalLibrary, setCurrentBook }: PersonalLibraryProps) {
    const [myLibraries, setMyLibraries] = useState<ILibrary[]>([]);
    const [currentLibraries, setCurrentLibrairies] = useState<ILibrary[]>([]);


    function handleReadBooks() {

        console.log(myLibraries[1].Books[0].LibraryBook.read);

        // for (const library of myLibraries) {
        //   const readBooks = library.Books.filter((book) => book.LibraryBook.read);
        //   console.log(readBooks);
        // }

    };

    // ------------- FONCTION DE RECUPERATION DES BIBLIOTHEQUES ----------------------

    useEffect(() => {
        const getmyLibraries = async () => {
            try {
                const response = await api.get('/libraries/books');
                setMyLibraries(response.data);
                setCurrentLibrairies(response.data);

            } catch (_error) {
                _error
            }
        };
        getmyLibraries();
    }, []);


    // -------------- FONCTION DE CREATION DE BIBLITOTHEQUE -----------------------------

    async function handleLibraryCreation(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);
        const newLibraryName = formData.get('newLibraryName') as string;

        try {
            const response = await api.post('/library', {
                name: newLibraryName,
            });
            const newLibrary = response.data;

            setMyLibraries((previousLibraries) => [...previousLibraries, { ...newLibrary, Books: [] }]);

            form.reset();
        } catch (_error) {
        }
    }


    return (
        <section id="personalLibrary-section" className="section books-section">


            <div className='head-books'>
                <h1>Ma bibliothèque</h1>
                <input type="text"
                    placeholder="Recherche parmis vos livres" />
            </div>

            <div id="library-choice">
                <ul>
                    <NavLink to=""><li>Tous</li></NavLink>
                    <NavLink to="" onClick={(event) => {
                        event.preventDefault();
                        handleReadBooks()}}><li>Lus</li></NavLink>
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


            {currentLibraries.map((library) => {
                return (

                    <div className="books-list" key={library.id}>

                        <h3 className='library-title'>{library.name}</h3>
                        <ul className='books-list-ul'>
                            
                            {library.Books.map((book) => {
                                return (
                                    <li key={book.id} className='books-list-li library-menu-list'>


                                        <Link to={`/book/${book.id}`}>
                                            <figure>
                                                <div id="book-img">
                                                    <button className="test-btn" type='button' onClick={(event) => {
                                                        setDisplayModalLibrary(true);
                                                        event.preventDefault();
                                                        setCurrentBook(book);
                                                        console.log(book);
                                                    }}> ... </button>
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