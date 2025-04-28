import './randomBooks.scss';
import axios from 'axios';
import { Link } from 'react-router';


function randomBooks() {
	// console.log(randomBooks);
	
const getRandomBooks = async () => {
	try {
		const response = await axios.get(
			'http://localhost:3000/random-books',
		);
		console.log(response);
	} catch (e) {
		console.log(e);
	}
	

}
getRandomBooks();
 
const test = [];


  return (
  








    
    <section id="random-books-section" className="section">
                <div >
                    <hgroup className='random-books-title'>
                        <h3>Besoin d’inspiration ?</h3>
                        <p>Laisse-toi surprendre par notre sélection du jour.</p>
                    </hgroup>
                    <div>
                        <ul id="random-books-list">

						{randomBooks.map((book) => {
                            <li>
                                <Link to="/book/:id">
                                    <figure>
                                        <img
                                            src="../Pictures/charlottebronte.jpeg" alt="book-image" />
                                        <hgroup>
                                            <figcaption>{book.title}</figcaption>
                                            <h5>{book.author}</h5>
                                        </hgroup>
                                        <button type='button'> + </button>
                                    </figure>
                                </Link>
                            </li> 
						}



                        </ul>
                    </div>
                </div>
            </section>
          
      )
}
    
export default randomBooks
    