import './ConfirmAddBookModal.scss'

interface IConfirmAddProps {
    closeConfirmAddBookModal: () => void;
}

function ConfirmAddBookModal({
    closeConfirmAddBookModal,
}: IConfirmAddProps) {



    return (
        <div className='hidden-background'>
            <div className='update-modal'>
                <button
                    type="button"
                    onClick={closeConfirmAddBookModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        src="../public/Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="update-modal-img"
                    />
                </button>
                <img id='validation-icon' src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Ce livre a bien été ajouté dans la base de données.
                </p>
            </div>
        </div>
    )

}

export default ConfirmAddBookModal;