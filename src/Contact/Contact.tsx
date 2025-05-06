import './Contact.scss'


function Contact (){
    return (
        <section id="contact-page-section">
          <div className="contact-container">
            <h1>Contactez-nous</h1>
            <p>Vous souhaitez nous poser une question, proposer une idée ou signaler un problème ?</p>
            <p>Écrivez-nous à l’adresse suivante :</p>
            
            <p className="contact-email">
              <a href="mailto:contact@blablabook.fr">📧 contact@blablabook.fr</a>
            </p>
        
            <p>Nous nous efforçons de répondre dans les meilleurs délais. Merci pour votre message !</p>
          </div>
      </section>
    )
}


export default Contact ; 