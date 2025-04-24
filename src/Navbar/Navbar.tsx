import './Navbar.scss'

function Navbar (){
    return (

        <nav className="navbar">
            <div id="logo">
               
                <a href=""><img src="../Pictures/Logo.png" alt="" className='header-logo' /></a>
            </div>
            <input
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Recherche par titre, auteur, ISBN ..."/>
            <div id="menu">
                <ul className="hidden">
                
                    <li><a href="#">Accueil</a></li>
                
                    <li><a href="#">Livres</a></li>
                    
                    <li><a href="#">Bibliothèque</a></li>
                    <li><a href="#" className="button-connect">Se connecter</a></li>
                    <li><a href="#" className="create-account">Créer un compte</a></li>
                </ul>
            </div>
            <a href="" className="burger-menu"><img src="../public/Pictures/iconamoon--menu-burger-horizontal-fill.svg" alt=""/></a>
        </nav>

    )
}

export default Navbar;