
# Blabla Book Front

## Présentation

Blabla Book est une plateforme de gestion de bibliothèques personnelles en ligne créée par une association fictive de passionnés de lecture.

## Procédure d'initialisation

### Création d'un repo local

```bash
git clone <cle_ssh_du_repo>
```

Se positionner dans le dossier de votre repo local et l'ouvrir

```bash
cd blabla-book-front
code .
```

### Installer les modules

Dans un terminal positionné dans le projet blabla-book-back :

```bash
npm install
```

Installer l'extension Biome ou vérifier que votre extension Biome soit active.
(l'extension peut avoir besoin d'être désactivée puis ré-activée pour fonctionner correctement)

### Création des variables d'environnement

Créer un fichier `.env` à la racine du projet en vous basant sur le fichier `.env.development.example`

Pensez à remplacer les informations par :

- `le port de fonctionnement de l'application Vite React pour le Front`
- `Le protocole, l'url et le port de fonctionnement du serveur Node/Express pour l'utilisation d'AxiosAPI`

### Fin de l'initialisation

## Démarrage du serveur avec Vite
### En développement

```bash
npm run dev
```

Démarrer le serveur Node en Back puis accéder au lien de l'application React par défaut http://localhost:5173/



 
 