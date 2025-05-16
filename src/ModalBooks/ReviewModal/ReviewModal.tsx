import { useState } from 'react';
import type { IBooks, ILibrary } from '../../@types/books';
import './ReviewModal.scss';
import api from '../../features/axiosApi';

type iReviewModalProps = {
    closeModalBook: () => void;
    setDisplayReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
    displayReviewModal: boolean;
    currentBook: IBooks | null | undefined;
    myLibraries: ILibrary[];
};

function ReviewModal({
    closeModalBook,
    setDisplayReviewModal,
    displayReviewModal,
    currentBook,
    myLibraries
}: iReviewModalProps) {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState<number>(0);


    const hideReviewModal = () => {
        setDisplayReviewModal(false);
    };

    const handleReviewSubmit = async () => {
        if (!currentBook) return;
        try {
            await api.post(`/book/${currentBook.id}/review`, {
                content: reviewText,
                rating,
            });
            setDisplayReviewModal(false);
            setReviewText('');
            setRating(0);
            closeModalBook();
        } catch (error) {
            console.error("Erreur lors de l'envoi de l'avis :", error);
        }
    };

return (
    <div className="hidden-background" /* onClick={closeModalBook} */>
    <div className="library" onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
        <button type="button" onClick={hideReviewModal} className="library-closeBtn">
            <img
                src="../public/Pictures/gridicons--cross.svg"
                alt="close-button"
            />
        </button>
        <div className="review-form">
            <label htmlFor="rating">Note (0 à 5) :</label>
            <input
                type="number"
                id="rating"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
            />
            <label htmlFor="review">Votre avis :</label>
            <textarea
                id="review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
            />
            <button type="button" onClick={handleReviewSubmit}>
                Envoyer
            </button>
         </div>
    </div>
</div>
)





}

export default ReviewModal;