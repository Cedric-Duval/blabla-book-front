import { useState } from 'react';
import type { IBooks, ILibrary } from '../@types/books';
import api from '../features/axiosApi';
import './ModalLibrary.scss';

type IModalLibraryProps = {
  closeModalLibrary: () => void;
  currentBook: IBooks | null | undefined;
  setMyLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
  myLibraries: ILibrary[];
  setCurrentLibraries: React.Dispatch<React.SetStateAction<ILibrary[]>>;
};

function ModalLibrary({
  closeModalLibrary,
  currentBook,
  setMyLibraries,
  myLibraries,
  setCurrentLibraries,
}: IModalLibraryProps) {
  const [menuDeroulant, setMenuDeroulant] = useState(false);

  async function editBookStatus() {
    const response = await api.patch(
      `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`,
    );
    setMyLibraries(response.data);
    setCurrentLibraries(response.data);
    closeModalLibrary();
  }

  // ------------ FONCTION DE SUPPRESSION D'UN LIVRE D'UNE BIBLIOTHEQUE -----------------

  async function deleteBookFromLibrary() {
    try {
      const response = await api.delete(
        `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}`,
      );
      setMyLibraries(response.data);
      setCurrentLibraries(response.data);
      closeModalLibrary();
    } catch (error) {
      console.error('Erreur lors de la suppression du livre', error);
    }
  }

  // ------------ FONCTION DE CHANGEMENT DE BIBLIOTHEQUE ------------------

  async function changeLibrary(newLibraryId: number) {
    try {
      const response = await api.patch(
        `/library/${currentBook?.LibraryBook.library_id}/book/${currentBook?.id}/newLibrary/${newLibraryId}`,
      );
      setMyLibraries(response.data);
      setCurrentLibraries(response.data);
      closeModalLibrary();
    } catch (error) {
      console.error('Erreur lors du changement de bibliothèque', error);
    }
  }

  return (
    <div className="hidden-background" /* onClick={closeModalLibrary} */>
      <div className="library">
        <button
          type="button"
          onClick={closeModalLibrary}
          className="library-closeBtn"
        >
          <img
            src="../public/Pictures/gridicons--cross.svg"
            alt="Fermer la fenêtre"
          />
        </button>

        <ul className="library-menu">
          <li
            className={
              currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            } >
            <button type="button"
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
              <p className="library-menu-li-text">Livre lu</p>
            </button>
          </li>
          <li
            className={
              !currentBook?.LibraryBook.read
                ? 'library-menu-li selected'
                : 'library-menu-li'
            } >
            <button type="button"
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
            </button>
          </li>
          <li
            className="library-menu-li" >
            <button type="button"
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
            </button>
          </li>
          <li
            className="library-menu-li">
            <button type="button"
              onClick={(event) => {
                event.stopPropagation();
                setMenuDeroulant(!menuDeroulant);
              }}
            >
              <img
                className="library-menu-li-img"
                src="../public/Pictures/material-symbols--change-circle-rounded.svg"
                alt=""
              />
              <p className="library-menu-li-text">Changer de bibliothèque</p>
            </button>
            {menuDeroulant && (
              <button
                type="button"
                className="library-change"
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  onChange={(e) => {
                    const newLibraryId = Number.parseInt(e.target.value);
                    changeLibrary(newLibraryId);
                  }}
                >
                  <option value="">Choisir une bibliothèque</option>
                  {myLibraries
                    .filter(
                      (lib) => lib.id !== currentBook?.LibraryBook.library_id,
                    )
                    .map((library) => (
                      <option key={library.id} value={library.id}>
                        {library.name}
                      </option>
                    ))}
                </select>
              </button>
            )}

          </li>
        </ul>
      </div>
    </div>
  );
}

export default ModalLibrary;
