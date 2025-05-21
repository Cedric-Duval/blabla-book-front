import './ConfirmUpdateBookModal.scss'

interface iConfirmUpdateProps {
    closeConfirmUpdateBookModal: () => void;
}

function ConfirmUpdateBookModal({
    closeConfirmUpdateBookModal,
}: iConfirmUpdateProps) {



    return (
        <div className='hidden-background'>
            <div className='update-modal'>
                <button
                    type="button"
                    onClick={closeConfirmUpdateBookModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        src="../Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="update-modal-img"
                    />
                </button>
                <img id='validation-icon' src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Ce livre a bien été modifié dans la base de données.
                </p>
            </div>
        </div>
    )

}

export default ConfirmUpdateBookModal;