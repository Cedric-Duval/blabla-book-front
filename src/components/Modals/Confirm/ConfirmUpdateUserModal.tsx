import './Confirm.scss';

interface iUpdateUserProps {
  closeUpdateUserModal: () => void;
  setDisplayUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateUserModal({ closeUpdateUserModal }: iUpdateUserProps) {
  return (
    <div className="hidden-background">
      <div className="confirm-modal">
        <button
          type="button"
          onClick={closeUpdateUserModal}
          className="confirm-modal-closeBtn"
        >
          <img
            className="confirm-modal-closeBtn-img"
            src="../Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
          />
        </button>
        <img
          className="confirm-modal-caution-icon"
          src="../Pictures/check.png"
          alt="Icone de validation"
        />
        <p className="confirm-modal-message">
          Vos informations ont bien été mises à jour
        </p>
      </div>
    </div>
  );
}

export default UpdateUserModal;
