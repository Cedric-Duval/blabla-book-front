import './Books.scss'


function Books() {
    return (


        <section id="books-section" className="section">
            <div className='head-books'>
                <h1>Tous nos livres</h1>
                <input type="text" />
            </div> 


            {/* <div className="books-list">
                <ul >
                            {books.map((book) => {
                                return (
                                    <li key={book.id}>
                                        <a href="/test">
                                            <figure>
                                                <div id="book-img">
                                                    <img
                                                        src={book.image} alt="book-image"
                                                    />
                                                    <button type='button'> + </button>
                                                </div>
                                                <hgroup>
                                                    <figcaption>{book.title}</figcaption>
                                                    <h5>{book.author}</h5>
                                                </hgroup>

                                            </figure>
                                        </a>
                                    </li>
                                )
                            })}

                        </ul>
                    </div> */}
        </section>


    )
}

export default Books;