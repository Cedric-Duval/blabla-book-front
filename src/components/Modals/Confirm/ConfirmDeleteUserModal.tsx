import './Confirm.scss';

interface iConfirmDeleteProps {
  closeConfirmDeleteUserModal: () => void;
}

function ConfirmDeleteUserModal({
  closeConfirmDeleteUserModal,
}: iConfirmDeleteProps) {
  return (
    <div
      className="hidden-background" /*  onClick={closeConfirmDeleteUserModal} */
    >
      <div className="confirm-modal">
        <button
          type="button"
          onClick={closeConfirmDeleteUserModal}
          className="confirm-modal-closeBtn"
        >
          <img
            src="../Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
            className="confirm-modal-closeBtn-img"
          />
        </button>
        <img
          className="confirm-modal-caution-icon"
          src="../Pictures/check.png"
          alt="Icone de validation"
        />
        <p className="confirm-modal-message">
          Votre compte a bien été supprimé. <br />
          Merci d'avoir utilisé BlaBla Book !
        </p>
      </div>
    </div>
  );
}

export default ConfirmDeleteUserModal;
