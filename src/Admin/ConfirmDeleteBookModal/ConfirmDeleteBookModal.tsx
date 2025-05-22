import './ConfirmDeleteBookModal.scss'

interface iConfirmDeleteProps {
    closeConfirmDeleteBookModal: () => void;
}

function ConfirmDeleteBookModal({
    closeConfirmDeleteBookModal,
}: iConfirmDeleteProps) {



    return (
        <div className='hidden-background'>
            <div className='update-modal'>
            <button
                    type="button"
                    onClick={closeConfirmDeleteBookModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        src="../Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="update-modal-img"
                    />
                </button>
                <img id='validation-icon'src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Ce livre a bien été supprimé de la base de données.
                </p>
            </div>
        </div>
    )

}

export default ConfirmDeleteBookModal;