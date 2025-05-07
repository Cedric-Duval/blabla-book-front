import type { IBooks, ILibrary } from '../@types/books';
import api from '../features/axiosApi';
import './ModalLibrary.scss';

type IModalLibraryProps = {
  closeModalLibrary: () => void;
  currentBook: IBooks | null | undefined;
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
};

function ModalLibrary({
  closeModalLibrary,
  currentBook,
  setMyLibraries,
}: IModalLibraryProps) {
  async function editBookStatus() {
    const response = await api.patch(
      `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`,
    );
    setMyLibraries(response.data);
  }

  // ------------ FONCTION DE SUPPRESSION D'UN LIVRE D'UNE BIBLIOTHEQUE -----------------

  async function deleteBookFromLibrary() {
    try {
      const response = await api.delete(
        `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`
      );
      setMyLibraries(response.data);
      closeModalLibrary();
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  }

  return (
    <div className="hidden-background" onClick={closeModalLibrary}>
      <div className="library">
        <div onClick={closeModalLibrary} className="library-closeBtn">
          <img
            src="../public/Pictures/gridicons--cross.svg"
            alt="close-button"
          />
        </div>
        <ul className="library-menu">
          <li
            className={
              currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            }
            onClick={(event) => {
              if (!currentBook.LibraryBook.read) {
                editBookStatus();
                return;
              }
              event.stopPropagation();
            }}
          >
            {' '}
            <img
              className="library-menu-li-img"
              src="../public/Pictures/ph--book-open.svg"
              alt=""
            />
            <p className="library-menu-li-text">Livre lus</p>
          </li>
          <li
            className={
              !currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            }
            onClick={(event) => {
              if (currentBook.LibraryBook.read) {
                editBookStatus();
                return;
              }
              event.stopPropagation();
            }}
          >
            {' '}
            <img
              className="library-menu-li-img"
              src="../public/Pictures/tdesign--time.svg"
              alt=""
            />
            <p className="library-menu-li-text">A lire </p>
          </li>
          <li
            className="library-menu-li"
            onClick={(event) => {
              event.stopPropagation();
              deleteBookFromLibrary();
            }}
          >
            <img
              className="library-menu-li-img"
              src="../public/Pictures/tabler--trash.svg"
              alt=""
            />
            <p className="library-menu-li-text">Supprimer</p>
          </li>
          <li className="library-menu-li">
            <img
              className="library-menu-li-img"
              src="../public/Pictures/mdi--dialogue-outline.svg"
              alt=""
            />
            <p className="library-menu-li-text">Laisser un avis</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalLibrary;
