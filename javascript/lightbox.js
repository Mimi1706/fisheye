// Attends que le contenu se charge
function sendData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
}

// La lightbox est fonctionnelle une fois que le contenu de la page est chargé
async function asyncCall() {
    await sendData();

    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content')
    const lightboxImages = document.querySelectorAll('.media-content');

    // Ouvre la lightbox au clic sur un média
    lightboxImages.forEach(media => {
        media.addEventListener('click', e => {

            // Aria-labels
            document.getElementById('main-content').setAttribute('aria-hidden', 'true');
            document.getElementById('header').setAttribute('aria-hidden', 'true');
            document.getElementById('infos-window').setAttribute('aria-hidden', 'true');

            lightbox.classList.add('active');
            unloadScrollBars()

            // Ajoute l'image ou la vidéo dans la lightbox
            if(/\.jpe?g$/i.test(media.src)){
                var lightboxMedia = document.createElement('img')
            } else {
                var lightboxMedia = document.createElement('video')
                lightboxMedia.controls = true;
            }

            // Donne la source du media à la lightbox 
            lightboxMedia.src = media.src;

            // Ajoute le titre sous l'image ou la vidéo
            let medialAlt = media.dataset.name;
            lightboxContent.innerHTML += medialAlt;

            // Ajoute le titre à l'image ou la vidéo
            lightboxMedia.setAttribute('aria-label', medialAlt);

            // Ajout le media dans la lightbox
            lightboxContent.appendChild(lightboxMedia)
        })
    })
}
  
asyncCall();

// Bouton de la fermeture de la lightbox
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content')

function closelightbox(){
    document.querySelector('.lightbox').classList.remove('active');
    reloadScrollBars()
    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }

    // Aria-labels
    document.getElementById('main-content').setAttribute('aria-hidden', 'false');
    document.getElementById('header').setAttribute('aria-hidden', 'false');
    document.getElementById('infos-window').setAttribute('aria-hidden', 'false');
}

// Fonction pour cacher la barre de scroll (utilisée lors du clic sur un média)
function unloadScrollBars() {
    document.body.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie 
  }

// Fonction pour afficher la barre de scroll (utilisée lors de la fermeture de la lightbox)
function reloadScrollBars() {
    document.body.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie 
  }     