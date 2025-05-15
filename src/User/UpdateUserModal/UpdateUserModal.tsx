import './UpdateUserModal.scss'


interface iUpdateUserProps {
    closeUpdateUserModal: () => void;
    setDisplayUpdateUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateUserModal({
    closeUpdateUserModal,
}: iUpdateUserProps) {


    return (
        <div className='hidden-background'>
            <div className='update-modal'>
                <button
                    type="button"
                    onClick={closeUpdateUserModal}
                    className="update-modal-closeBtn"
                >
                    <img
                        className="update-modal-closeBtn-img"
                        src="../public/Pictures/gridicons--cross.svg"
                        alt="Fermer la fenêtre"
                    />
                </button>
                <img id='validation-icon' src="./Pictures/check.png" alt="Icone de validation" />
                <div>Vos informations ont bien été mises à jour</div>
            </div>
        </div>
    )

};

export default UpdateUserModal;


