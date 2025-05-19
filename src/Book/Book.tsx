import './Book.scss';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import type { IBooks } from '../@types/books';
import type { IUser } from '../@types/user';
import api from '../features/axiosApi';

interface BookProps {
  setDisplayModalBook: React.Dispatch<React.SetStateAction<boolean>>;
  setReviewed: React.Dispatch<React.SetStateAction<boolean>>;
  reviewed: boolean;
  user: IUser | undefined;
}

function Book({ setDisplayModalBook, setReviewed, reviewed, user }: BookProps) {
  const params = useParams();
  const bookId = params.id;
  const [book, setBook] = useState<IBooks | null>(null);

  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await api.get(`/book/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (reviewed !== undefined) {
      getBook();
    }
  }, [bookId, reviewed]);

  const handleDeleteReview = async (reviewId: number) => {
    try {
      await api.delete(`/review/${reviewId}`);
      setReviewed((prev) => !prev);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis :", error);
    }
  };

  return (
    <section id="book-section" className="section">
      <Link to="/books">
        <img
          id="left-arrow"
          src="../Pictures/humbleicons--arrow-left.png"
          alt="left-arrow"
        />
      </Link>
      {book ? (
        <>
          <h2>{book.title}</h2>
          <div id="presentation">
            <div id="presentation-image">
              <img src={`${book.image}`} alt={`${book.title}`} />
            </div>
            <div id="presentation-texts">
              <div id="details">
                {/* <h2>{book.title}</h2> */}

                <p>
                  <b>Auteur :</b> {book.author}
                </p>
                <p>
                  <b>Parution :</b> {book.publication_year}
                </p>
                <p>
                  <b>Édition :</b> {book.editor}
                </p>
                <p>
                  <b>ISBN :</b> {book.isbn}
                </p>
                <p>
                  <b>Pages :</b> {book.pages}
                </p>
                <div className="genre-list">
                  <b>Genres :</b>
                  <ul>
                    {book.Genres.map((genre) => (
                      <li key={genre.id}> {genre.name}</li>
                    ))}
                  </ul>
                </div>
                {book.Reviews && book.Reviews.length > 0 && (
                  <p className="note">
                    <strong className="note-text">Note moyenne :</strong>
                    {(
                      book.Reviews.reduce(
                        (sum, review) => sum + review.rating,
                        0,
                      ) / book.Reviews.length
                    ).toFixed(1)}
                    <span className="star">★</span>
                  </p>
                )}
              </div>
            </div>
          </div>
          <div id="summary">
            <hr />
            <h3>Résumé:</h3>
            <p>{book.summary}</p>

            <button
              type="button"
              className="button-add"
              onClick={() => setDisplayModalBook(true)}
            >
              <Link to="">
                <img
                  src="../Pictures/ic--outline-plus.png"
                  id="add-button"
                  alt="add-button"
                />
              </Link>
            </button>
          </div>
          {book.Reviews && book.Reviews.length > 0 && (
            <div className="reviews-section">
              <hr />
              <h3 className="reviews-section-title">Avis des lecteurs :</h3>
              <ul>
                {book.Reviews.map((review) => (
                  <div key={review.id} className="reviews-section-container">
                    <li>
                      <p className="note">
                        <strong className="note-text">Note :</strong>{' '}
                        {review.rating} <span className="star">★</span>
                      </p>
                      <p>{review.content}</p>
                      <p className="review-meta">
                        Posté par <b>{review.User.firstname}</b>{' '}
                        <b>{review.User.name}</b> le{' '}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </li>
                      {review.User.id === user?.id && (
                        <button type="button" className='reviews-section-container-delete-button' onClick={() => handleDeleteReview(review.id)}>
                          <img src="../Pictures/tabler--trash.svg" alt="Review Trash Icon" />
                        </button>
                      )}
                  </div>
                ))}
              </ul>
            </div>
          )}
        </>
      ) : (
        <p>Chargement.... </p>
      )}
    </section>
  );
}

export default Book;