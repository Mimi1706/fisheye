// ATTENDS QUE LE CONTENU SE CHARGE
function sendData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
}

// DÉCLENCHE LA LIGHTBOX UNE FOIS QUE LE CONTENU EST CHARGÉ
async function asyncCall() {
    await sendData();

    const lightbox = document.querySelector('.lightbox');
    const lightboxContent = document.querySelector('.lightbox-content')
    const lightboxImages = document.querySelectorAll('.media-content');

    lightboxImages.forEach(media => {
        media.addEventListener('click', e => {

            lightbox.classList.add('active');
            unloadScrollBars()

            // Ajout le titre sous l'image/la vidéo
            let medialAlt = media.dataset.name;
            lightboxContent.innerHTML += medialAlt;

            // Ajout de l'image ou de la vidéo
            if(/\.jpe?g$/i.test(media.src)){
                var lightboxMedia = document.createElement('img')
            } else {
                var lightboxMedia = document.createElement('video')
                lightboxMedia.controls = true;
            }

            lightboxMedia.src = media.src

            lightboxContent.appendChild(lightboxMedia)
        })
    })
}
  
asyncCall();

// BOUTON DE FERMETURE DE LA LIGHTBOX
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content')

function closelightbox(){
    document.querySelector('.lightbox').classList.remove('active');
    reloadScrollBars()
    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }
}

// FONCTION POUR CACHER LA BARRE DE SCROLL
function unloadScrollBars() {
    document.body.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie 
  }

//FONCTION POUR RECHARGER LA BARRE DE SCROLL
function reloadScrollBars() {
    document.body.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie 
  }     