import { useEffect, useState, } from 'react';
import { Link, NavLink } from 'react-router';
import '../Books/Books.scss'
import './PersonalLibrary.scss'
import type { ILibrary } from '../@types/books';
import CoverBook from '../coverBook/coverBook';
import api from '../features/axiosApi';

interface PersonalLibraryProps {
    setDisplayModalLibrary: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentBook: React.Dispatch<React.SetStateAction<ILibrary | null | undefined>>;
}


function PersonalLibrary({ setDisplayModalLibrary, setCurrentBook }: PersonalLibraryProps) {
    const [myLibraries, setMyLibraries] = useState<ILibrary[]>([]);
    const [librariesStatus, setLibrariesStatus] = useState('all');


    function handleReadBooks() {

        //console.log(myLibraries[1].Books[0].LibraryBook.read);

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
                    <NavLink to="" onClick={(event) => {
                        event.preventDefault();
                        setLibrariesStatus('all');
                    }}><li>Tous</li></NavLink>
                    <NavLink to="" onClick={(event) => {
                        event.preventDefault();
                        setLibrariesStatus('read');
                    }}><li>Lus</li></NavLink>
                    <NavLink to="" onClick={(event) => {
                        event.preventDefault();
                        setLibrariesStatus('toRead');
                    }}><li>A lire</li></NavLink>
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

                            {librariesStatus === 'all' && library.Books.map((book) => {
                                return (
                                    <CoverBook key={book.id} book={book} setDisplayModalLibrary={setDisplayModalLibrary} setCurrentBook={setCurrentBook} />
                                )
                            })}

                            {librariesStatus === 'read' && library.Books.map((book) => {
                                if (book.LibraryBook.read) {
                                    return (
                                        <CoverBook key={book.id} book={book} setDisplayModalLibrary={setDisplayModalLibrary} setCurrentBook={setCurrentBook} />
                                    )
                                }
                            })}

                            {librariesStatus === 'toRead' && library.Books.map((book) => {
                                if (!book.LibraryBook.read) {
                                    return (
                                        <CoverBook key={book.id} book={book} setDisplayModalLibrary={setDisplayModalLibrary} setCurrentBook={setCurrentBook} />
                                    )
                                }
                            })}

                        </ul>
                    </div>
                )
            })}
        </section>

    )
}

export default PersonalLibrary;

//console.log(myLibraries[1].Books[0].LibraryBook.read);

// for (const library of myLibraries) {
//   const readBooks = library.Books.filter((book) => book.LibraryBook.read);
//   console.log(readBooks);
// }