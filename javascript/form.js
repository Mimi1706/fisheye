// FORMULAIRE
const formWindow = document.getElementById('form');
const formBg = document.getElementById('form-bg');

// Bouton d'ouverture du formulaire
function openForm(displayStyle){
    formWindow.style.display = displayStyle;
    formBg.style.display = 'block';
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    unloadScrollBars();
    document.getElementById('contact').style.display = 'none';
    document.addEventListener('keyup', this.onKeyUp)

    // Ajoute des Aria-hidden pour ne pas cibler les éléments suivants:
    document.getElementById('main-content').setAttribute('aria-hidden', 'true');
    document.getElementById('header').setAttribute('aria-hidden', 'true');
    document.getElementById('infos-window').setAttribute('aria-hidden', 'true');
 }
 
// Fonction pour cacher la barre de scroll (utilisée lors de l'ouverture du formulaire)
 function unloadScrollBars() {
    document.body.style.overflow = 'hidden';  // firefox, chrome
    document.body.scroll = "no"; // ie 
}

// Bouton de fermeture
function closeForm(){
    formWindow.style.display = 'none';
    formBg.style.display = 'none';
    reloadScrollBars()
    document.getElementById('contact').style.display = 'block';

    document.removeEventListener('keyup', this.onKeyUp)

    // Enlève les aria-hidden pour pouvoir cibler les éléments suivants:
    document.getElementById('main-content').removeAttribute('aria-hidden', 'true');
    document.getElementById('header').removeAttribute('aria-hidden', 'true');
    document.getElementById('infos-window').removeAttribute('aria-hidden', 'true');
}

const closeBtn = document.querySelector('#close-btn');
closeBtn.addEventListener('click', this.closeForm.bind(this))

// Fonction de fermeture pour le clavier (touche ESC)
function onKeyUp(e) {
    if (e.key == 'Escape'){
        closeForm()
    }
}

// Fonction pour afficher la barre de scroll (utilisée lors de la fermeture du formulaire)
function reloadScrollBars() {
    document.body.style.overflow = 'auto';  // firefox, chrome
    document.body.scroll = "yes"; // ie 
    }     

// Champs du formulaire

// Champ du prénom
function firstName() {
    const firstName = document.getElementById('firstName-field');
    const isValueValid = firstName.value.trim().length >= 2 && firstName.value.match(/^[A-Za-z]+$/);

    // Si le prénom contient deux caractères et est écrit en caractères autorisés -> valide
    if (isValueValid) {
        firstName.style.border = 'none';
        firstName.style.color = 'black';
        return firstName;

    } else {
        firstName.style.border = '3px solid #901C1C';
        firstName.style.color = 'black';
    }
}

// Champ du nom
function lastName() {
    const lastName = document.getElementById('lastName-field');
    const isValueValid = lastName.value.trim().length >= 2 && lastName.value.match(/^[A-Za-z]+$/);

    // Si le nom contient deux caractères et est écrit en caractères autorisés -> valide
    if (isValueValid) {
        lastName.style.border = 'none';
        lastName.style.color = 'black';
        return lastName;

    } else {
        lastName.style.border = '3px solid #901C1C';
        lastName.style.color = 'black';
    }
}

// Champ du mail
function email() {
    const email = document.getElementById('email-field').value;
    const validMail = /\S+@\S+\.\S+/;
    
    // Si l'email est écrit au bon format -> valide
    if (validMail.test(email)){
        document.getElementById('email-field').style.border = 'none';
        document.getElementById('email-field').style.color = 'black';
        return email;
        
    } else {
        document.getElementById('email-field').style.border = '3px solid #901C1C';
        document.getElementById('email-field').style.color = 'black';
    }
}

// Champ du message
function message() {
    const message = document.getElementById('message-field');
    const isValueValid = message.value.trim().length >= 5;

    // Si le message contient au moins 5 caractères -> valide
    if (isValueValid) {
        message.style.border = 'none';
        message.style.color = 'black';
        return message;

    } else {
        message.style.border = '3px solid #901C1C';
        message.style.color = 'black';
    }
}

// Bouton d'envoi des champs
const form = document.querySelector('#form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    // On excécute une fois toutes les fonctions des champs au vouton d'envoi
    firstName();
    lastName();
    email();
    message();

    // Constante qui inclue toutes les fonctions validées
    const isFormValid = () => firstName() && lastName() && email() && message();

    // Envoi des informations dans la console si la constante est validée
    if (isFormValid()) {
        console.log('Prénom:',document.getElementById('firstName-field').value);
        console.log('Nom:',document.getElementById('lastName-field').value);
        console.log('Email:',document.getElementById('email-field').value);
        console.log('Votre message:',document.getElementById('message-field').value);

        // Efface tous les champs du formulaire
        form.reset();
    } else {
        console.log('formulaire non valide')
    }
});