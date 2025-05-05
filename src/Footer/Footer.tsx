import { Link } from 'react-router';
import '../Footer/Footer.scss'

function Footer() {
    return (
        <div className="footer">
            <div className="footer-top">
                <Link to="legal-notice">Mentions Légales</Link>
                <Link to="/confidentality"> Confidentialité </Link>
                <a href="#">Cookies</a>
                <a href="#">Contact</a>
            </div>

            <div className="footer-bottom">
                <p>©2025 Blabla Book - Tous droits réservés</p>
            </div>
        </div>
    )
}

export default Footer;