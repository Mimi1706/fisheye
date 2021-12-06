// BESOIN DES ÉLÉMENTS DOM
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

    let mediaSection = document.getElementById('media-section');
    let allmedia = Array.from(mediaSection.querySelectorAll('.media-content'))

    class lightbox {

        static init () {

            console.log(allmedia)

            const gallery = allmedia.map(media => media)

            allmedia.forEach(media => media.addEventListener('click', e => {
                const mediaName = media.dataset.name
                new lightbox(media, mediaName, gallery)
                unloadScrollBars()
            }))
        }

        constructor (media, mediaName,gallery) {
            this.element = this.buildDOM(media)
            this.addMedia(media, mediaName)
            document.body.appendChild(this.element)

            this.gallery = gallery

            this.onKeyUp = this.onKeyUp.bind(this)
            document.addEventListener('keyup', this.onKeyUp)
        }

        // Fonction pour fermer la lightbox (souris)
        close(e) {
            e.preventDefault()
            reloadScrollBars()
            this.element.parentElement.removeChild(this.element)
            document.removeEventListener('keyup', this.onKeyUp)
        }

        // Fonction pour [fermer/suivant/précédent] de la lightbox (clavier)
        onKeyUp(e) {
            if (e.key == 'Escape'){
                this.close(e)
                reloadScrollBars()
            } else if (e.key == 'ArrowLeft') {
                this.previous(e)
            } else if (e.key == 'ArrowRight') {
                this.next(e)
            }
        }

        // Fonction pour aller au media suivant
        previous (e) {
            e.preventDefault()
            let currentIndex = this.gallery.findIndex(thisIndex => thisIndex == this.media)
            if(currentIndex == 0) {
                currentIndex = this.gallery.length
            }
            this.addMedia(this.gallery[currentIndex - 1])
        }

        // Fonction pour aller au media suivant
        next (e) {
            e.preventDefault()
            let currentIndex = this.gallery.findIndex(thisIndex => thisIndex == this.media)
            if(currentIndex == this.gallery.length - 1) {
                currentIndex = -1
            }
            this.addMedia(this.gallery[currentIndex + 1])
        }

        // Ajoute le media à l'intérieur du conteneur
        addMedia (media, mediaName) {
            this.media = null;
            var lightboxContent = this.element.querySelector('.lightboxMedia')
            var lightboxTitle = this.element.querySelector('#lightbox-media-title')
            lightboxContent.innerHTML = '';
            this.media = media
            mediaName = this.media.dataset.name
            var cloneMedia = media.cloneNode(true);
            lightboxContent.appendChild(cloneMedia)
            lightboxTitle.innerHTML= mediaName;
        }

        buildDOM (media) {
            const dom = document.createElement('div')
            dom.classList.add('lightbox')
            JSON.stringify(media)
            
            // Crée le conteneur pour le media
            dom.innerHTML = `
        
                <div class="lightboxContent"><div class="lightboxMedia"></div>
                <h1 id="lightbox-media-title"></h1></div>
                
                <button id="lightbox-previous-button">Précédent</button>
                <button id="lightbox-next-button">Suivant</button>
        
                <button onclick="closelightbox()" id="lightbox-close-button">Fermer</button>
    
            `

            // Aria-labels
            document.getElementById('main-content').setAttribute('aria-hidden', 'true');
            document.getElementById('header').setAttribute('aria-hidden', 'true');
            document.getElementById('infos-window').setAttribute('aria-hidden', 'true');

            dom.querySelector('#lightbox-close-button').addEventListener('click', this.close.bind(this))
            dom.querySelector('#lightbox-previous-button').addEventListener('click', this.previous.bind(this))
            dom.querySelector('#lightbox-next-button').addEventListener('click', this.next.bind(this))
            
            return dom
        }

    }

    lightbox.init()

}

asyncCall();


function closelightbox(){

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