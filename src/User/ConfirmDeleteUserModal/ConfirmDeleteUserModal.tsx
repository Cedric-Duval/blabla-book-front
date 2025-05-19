import './ConfirmDeleteUserModal.scss'

interface iConfirmDeleteProps {
    closeConfirmDeleteUserModal: () => void;
}

function ConfirmDeleteUserModal({
    closeConfirmDeleteUserModal,
}: iConfirmDeleteProps) {



    return (
        <div className='hidden-background'/*  onClick={closeConfirmDeleteUserModal} */>
            <div className='update-modal'>
                <button
                    type="button"
                    onClick={closeConfirmDeleteUserModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        src="../public/Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                        className="update-modal-closeBtn-img"
                    />
                </button>
                <img id='validation-icon' src="./Pictures/check.png" alt="Icone de validation" />
                <p className='confirm-delete-message'>
                    Votre compte a bien été supprimé. <br />
                    Merci d'avoir utilisé BlaBla Book !
                </p>
            </div>
        </div>
    )

}

export default ConfirmDeleteUserModal;