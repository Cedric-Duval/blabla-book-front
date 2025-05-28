import './Confirm.scss';

interface IConfirmAddProps {
  closeConfirmAddBookModal: () => void;
}

function ConfirmAddBookModal({ closeConfirmAddBookModal }: IConfirmAddProps) {
  return (
    <div className="hidden-background">
      <div className="confirm-modal">
        <button
          type="button"
          onClick={closeConfirmAddBookModal}
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
          Ce livre a bien été ajouté dans la base de données.
        </p>
      </div>
    </div>
  );
}

export default ConfirmAddBookModal;
