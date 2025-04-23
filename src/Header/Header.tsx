import './Header.scss'

function Header (){
    return (
        <div className="header">           
        <img src="/logo.png" alt="logo" className='header-logo' />
        <input type="text" placeholder="Titre, Auteur, ISBN..."></input>
        <nav>
            <ul>
                <li><a href="#">Accueil</a></li>
                <li><a href="#">Livres</a></li>
                <li><a href="#">Bibliothèque</a></li>
                <li><a href="#" className="button-connect">Se connecter</a></li>
                <li><a href="#" className="create-account">Créer un compte</a></li>
            </ul>
        </nav>
    </div>
    )
}

export default Header;