import './Error404.scss'

function Error (){
    return (
      <section id="error-page">

        {/* <iframe  
          src="https://www.youtube.com/embed/qlI241B1QNM?&loop=1&playlist=qlI241B1QNM&autoplay=1&mute=1&playsinline=1&controls=0" 
          frameborder="0" 
          allowfullscreen
          allow="autoplay; encrypted-media; picture-in-picture"
          title="youtube-video">
        </iframe> */}

        <div className="error-content">
          <h1>404</h1>
          <h2>Oups ! Page introuvable</h2>
          <p>La page que vous cherchez n’existe pas.</p>
          <a href="/" className="back-button">Retour à l’accueil</a>
        </div>
      </section>

    )
}

export default Error;