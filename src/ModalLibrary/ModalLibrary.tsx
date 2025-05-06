import type { ILibrary } from '../@types/books';
import './ModalLibrary.scss'

type IModalLibraryProps = {
    closeModalLibrary: () => void;
    currentBook: ILibrary | null | undefined;
}

function ModalLibrary({ closeModalLibrary, currentBook}: IModalLibraryProps) {

    
    

    return (
        <div className="hidden-background" onClick={closeModalLibrary}>
            <div className='library'>
                <div onClick={closeModalLibrary} className='library-closeBtn'><img src="../public/Pictures/gridicons--cross.svg" alt="close-button" /></div>
                <ul className='library-menu'>
                    <li className='library-menu-li'> <img className="library-menu-li-img"  src="../public/Pictures/ph--book-open.svg" alt=""/><p className='library-menu-li-text'>Livre lus</p></li>
                    <li className='library-menu-li'><img className="library-menu-li-img"  src="../public/Pictures/tdesign--time.svg" alt="" /><p className='library-menu-li-text'>A lire </p></li>
                    <li className='library-menu-li'><img className="library-menu-li-img"  src="../public/Pictures/stash--star-duotone.svg" alt="" /><p className='library-menu-li-text'>Noter</p></li>
                    <li className='library-menu-li'><img className="library-menu-li-img"  src="../public/Pictures/mdi--dialogue-outline.svg" alt="" /><p className='library-menu-li-text'>Laisser un avis</p></li>        
                </ul>
            </div>
        </div>
    )
}

export default ModalLibrary;
