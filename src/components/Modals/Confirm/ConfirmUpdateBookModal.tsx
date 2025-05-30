import './Confirm.scss';

interface iConfirmUpdateProps {
  closeConfirmUpdateBookModal: () => void;
}

function ConfirmUpdateBookModal({
  closeConfirmUpdateBookModal,
}: iConfirmUpdateProps) {
  return (
    <div className="hidden-background">
      <div className="confirm-modal">
        <button
          type="button"
          onClick={closeConfirmUpdateBookModal}
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
          src="./Pictures/check.png"
          alt="Icone de validation"
        />
        <p className="confirm-modal-message">
          Ce livre a bien été modifié dans la base de données.
        </p>
      </div>
    </div>
  );
}

export default ConfirmUpdateBookModal;
