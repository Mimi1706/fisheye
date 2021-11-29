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

            // Ajout le titre sous l'image/la vidéo
            let medialAlt = media.dataset.name;
            lightboxContent.innerHTML += medialAlt;

            // Ajout de l'image ou de la vidéo
            if(/\.jpe?g$/i.test(media.src)){
                var lightboxMedia = document.createElement('img')
            } else {
                var lightboxMedia = document.createElement('video')
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
    while (lightboxContent.firstChild) {
        lightboxContent.removeChild(lightboxContent.firstChild);
    }
}