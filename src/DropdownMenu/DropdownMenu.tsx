import './DropdownMenu.scss'


function DropdownMenu({ libraryId, bookId }) {


    return (
        <div id="context-menu" className="context-menu">
            <ul className='context-menu-ul'>
            <li data-action="option1" className="option">Ajouter / Retirer de la bibliothèque {libraryId}</li>
            <li data-action="option2" className="option">Livre {bookId} lu / non lu</li>
            <li data-action="option3" className="option">Option 3</li> 
            <hr />
            <li data-action="refresh" className="option">Actualiser</li>
            </ul>
        </div>
    )
}

export default DropdownMenu;
