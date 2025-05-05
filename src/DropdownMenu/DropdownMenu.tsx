import './DropdownMenu.scss'
import { Link } from 'react-router';


function DropdownMenu({ libraryId, bookId }) {


    return (
        <div id="context-menu" className="context-menu hidden-background">
            <div className='register'>
                <ul className='context-menu-ul'>
                    <li><Link to="#"><img src="../public/Pictures/ph--book-open.svg" alt=""/></Link><p>Livre {bookId} lu / non lu</p></li>
                    <li><Link to="#"><img src="../public/Pictures/tdesign--time.svg" alt="" /></Link><p>A lire {libraryId}</p></li>
                    <li><Link to="#"><img src="../public/Pictures/stash--star-duotone.svg" alt="" /></Link><p>Noter</p></li>
                    <li><Link to="#"><img src="../public/Pictures/mdi--dialogue-outline.svg" alt="" /></Link><p>Laisser un avis</p></li>        
                </ul>
                <Link to="#" className='cloneBtn-personnalLibrary'><img src="../public/Pictures/gridicons--cross.svg" alt="close-button" /></Link>

            </div>
        </div>
    )
}

export default DropdownMenu;
