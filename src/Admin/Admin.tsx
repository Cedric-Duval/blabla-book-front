import { NavLink } from 'react-router';
import { useState, useEffect } from 'react';
import api from '../features/axiosApi';
import type { IBooks } from '../@types/books';


import './Admin.scss'


function Admin (){

    // Menu pour choisir l'action à effectuer par l'admin
    const [adminChoice, setAdminChoice] = useState('add-book');


    // Permet de prévisualiser l'image lors de l'ajout d'un livre
    const [imagePresentation, setImagePresentation] = useState("https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg");
    

    const [allBooks, setAllBooks] = useState<IBooks[]>([]); 

    const [currentBookIDtoUpdate, setCurrentBookIDtoUpdate] = useState(null);
    const [updateBookState, setUpdateBookState] = useState({
        "image":"https://m.media-amazon.com/images/I/6155jsTHk1L._SL1499_.jpg", 
        "title": "", 
        "author": "",
        "publication_year": "", 
        "editor": "", 
        "isbn": "", 
        "pages": "",
        // genre1: "",
        // genre2: "",
        "summary": "", 
    });




    useEffect(() => {
        const getAllBooks = async () => {
        try {
            const response = await api.get('/books');
            setAllBooks(response.data);
        } catch (_error) { }
        };
        getAllBooks();
    }, []);


    // Fonctionnalité d'ajout d'un livre
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
            console.log("Ajout du livre suivant: " + formData.get('title'));
            
        } catch (error) {
            console.log(error);
        }
    }

    
    async function updateBook(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            const form = event.currentTarget;
            const formData = new FormData(form);

            // console.log(event);
            // console.log(formData);
 
            console.log(currentBookIDtoUpdate);
            

            await api.patch(`/admin/book/${currentBookIDtoUpdate}`, {
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


              
              
            console.log("Modification du livre: " + formData.get('title'));
            
        } catch (error) {
            console.log(error);      
        }
    }

    async function deleteBook(event: React.FormEvent<HTMLFormElement>) {
        try {
            event.preventDefault();

            
            console.log(event);
            
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
                            <NavLink to="" className="admin-header-list-link" onClick={(event) => {
                                event.preventDefault();
                                setAdminChoice('add-book');
                                }}>Ajouter un livre</NavLink>
                        </li>
                        <li>
                            <NavLink to="" className="admin-header-list-link"  onClick={(event) => {
                                event.preventDefault();
                                setAdminChoice('update-book');
                                }}>Modifier un livre</NavLink>
                        </li>
                        <li>
                            <NavLink to="" className="admin-header-list-link"  onClick={(event) => {
                                event.preventDefault();
                                setAdminChoice('delete-book');
                                }}>Supprimer un livre</NavLink>
                        </li>
                        
                    </ul>
                </div>

                {adminChoice === "add-book" && 
                <form onSubmit={addBook}>
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
                                <textarea name="summary" placeholder='Description du livre' required />
                            

                                <button type="submit">Valider</button>
                            </div>
                        </div>
                    </div>    

                </form>}

                {adminChoice === "update-book" && 
                
                <form onSubmit={updateBook}>
                    <div className='book-modification-selection'>
                    {/* <label htmlFor="book-to-update">Choisir le livre à modifier:</label>  */}
                            <select name="book-to-update" className='book-to-update' onChange={e => {
                                const selectedId = e.target.value;
                                const selectedBook = allBooks.find(book => String(book.id) === selectedId);
                                if (selectedBook) {
                                // On adapte ici pour ne garder que les propriétés attendues par updateBookState
                                setUpdateBookState({
                                    image: selectedBook.image || "",
                                    title: selectedBook.title || "",
                                    author: selectedBook.author || "",
                                    publication_year: selectedBook.publication_year || "",
                                    editor: selectedBook.editor || "",
                                    isbn: selectedBook.isbn || "",
                                    pages: selectedBook.pages || "",
                                    summary: selectedBook.summary || "",
                                });
                                setCurrentBookIDtoUpdate(selectedId);
                                } else {
                                // Si rien n'est sélectionné, on réinitialise
                                setUpdateBookState({
                                    image: "https://m.media-amazon.com/images/I/6155jsTHk1L._SL1499_.jpg",
                                    title: "",
                                    author: "",
                                    publication_year: "",
                                    editor: "",
                                    isbn: "",
                                    pages: "",
                                    summary: "",
                                });
                                }
                            }}>
                                <option value="">Choisir le livre à modifier:</option>
                                {allBooks.map((book) => {
                                    // console.log(book); 
                                    return (
                                        <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
                                        
                                    );
                                })}


                            </select>
                    </div>
                    
                    <div className='book-modification-presentation'>
                        <div className="book-modification-presentation-image">
                            <img src={updateBookState.image} alt="" />
                        </div>
                        <div className="book-modification-presentation-texts">
                            <div className="book-modification-details"> 
                            <label htmlFor="title">Nom du livre:</label> 
                            <input type="text" name="title" placeholder="Don Quichotte" value={updateBookState.title} onChange={e =>
                                    setUpdateBookState(prev => ({ ...prev, title: e.target.value }))
                                } required />

                                <label htmlFor="image">URL image:</label> 
                                <input type="text" name="image" placeholder='https://www. --- image-du-livre-à-modifier.jpg' value={updateBookState.image} 
                                    onChange={e => 
                                        setUpdateBookState(prevBook => ({ ...prevBook, image: e.target.value  }))
                                    } required />

                                <label htmlFor="author">Auteur:</label> 
                                <input type="text" name="author" placeholder='Prénom Nom' value={updateBookState.author}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, author: e.target.value }))
                                    } required />
                                
                                <label htmlFor="parution">Parution:</label> 
                                <input type="text" name="parution" placeholder='Année (ex: 1964)' value={updateBookState.publication_year}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, publication_year: e.target.value }))
                                    } required />
                                
                                <label htmlFor="editor">Edition:</label> 
                                <input type="text" name="editor" placeholder="Hachette, Gallimard, Editis, ..." value={updateBookState.editor}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, editor: e.target.value }))
                                    } required />
                                
                                <label htmlFor="isbn">ISBN:</label> 
                                <input type="text" name="isbn" placeholder="10 à 13 chiffres" value={updateBookState.isbn}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, isbn: e.target.value }))
                                    } required />
                                
                                <label htmlFor="pages">Pages:</label> 
                                <input type="text" name="pages" placeholder='Nombre de pages (ex: 361)' value={updateBookState.pages}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, pages: e.target.value }))
                                    } required />                      
                                
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
                                <textarea name="summary" placeholder='Description du livre' value={updateBookState.summary}
                                    onChange={e =>
                                        setUpdateBookState(prev => ({ ...prev, summary: e.target.value }))
                                    } required />
                            

                                <button type="submit">Valider</button>
                            </div>
                        </div>
                    </div>    

                    </form>
                
                }  

                {adminChoice === "delete-book" && 
                        <div className='book-modification-selection'>
                            
                        </div>
                }




            </div>
      </section>
    )
}


export default Admin ; 