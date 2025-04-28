import './Book.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios'

function Book() {

  const params = useParams();
  const bookId = params.id;
  console.log(bookId);

  const [book, setBook] = useState<IBook[]>([]);

    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/book/${bookId}`,
                );
                setBook(response.data);
            } catch (_error) {
            }
        };
        getBook();
    }, []);

    console.log(book);
    




  return (
    <section id="book">
        <h1>{book.title}</h1>
        <div id="main">
            <img src={`${book.image}`} alt={`${book.title}`}/>
            <div id="details">
                <h2>{book.title}</h2>
                <p>{book.author}</p>
                <p>{book.publication_year}</p>
                <p>{book.editor}</p>
                <p>{book.isbn}</p>
                <p>{book.pages} pages</p>
                <h3>Résumé:</h3>
                <p>{book.summary}</p>
                <button>Bouton</button>

            </div>
        </div>
    </section>
  )
}

export default Book







