// Récupère le fichier JSON grâce à un lien
let photographersProfil = document.getElementById("photographer-profil");

const fetchData = async () => {
    return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
    .then(function(response){
       return response.json();
    }) 
 
    // Génère les profils des photographes avec un template
    .then (function(dataJson){
       let allPhotographers = dataJson.photographers;
 
       for(let i in allPhotographers){
 
        photographersProfil.innerHTML += 
 
          `
            
          
          `;
       }
       return photographersProfil;
    })
 
    // Message d'erreur s'il y a un problème 
    .catch (function(){
       console.log("Erreur fetch !");
    })
 } 
 
 fetchData();


// FORMULAIRE
const closeBtn = document.getElementsByClassName('close-btn');
const formWindow = document.getElementById('form');

    //BOUTON DE FERMETURE 
    function closeForm(displayStyle){
        formWindow.style.display = displayStyle;
    }

    //CHAMPS DU FORMULAIRE
    function firstName() {
        const firstName = document.getElementById('firstName-field');
        const isValueValid = firstName.value.trim().length >= 2 && firstName.value.match(/^[A-Za-z]+$/);

        if (isValueValid) {
            firstName.style.backgroundColor = 'white';
            firstName.style.color = 'black';
            return true;

        } else {
            firstName.style.backgroundColor = '#a60000';
            firstName.style.color = 'white';
        }
    }

    function lastName() {
        const lastName = document.getElementById('lastName-field');
        const isValueValid = lastName.value.trim().length >= 2 && lastName.value.match(/^[A-Za-z]+$/);

        if (isValueValid) {
            lastName.style.backgroundColor = 'white';
            lastName.style.color = 'black';
            return true;

        } else {
            lastName.style.backgroundColor = '#a60000';
            lastName.style.color = 'white';
        }
    }

    function email() {
        const email = document.getElementById('email-field').value;
        const validMail = /\S+@\S+\.\S+/;
        
        if (validMail.test(email)){
            document.getElementById('email-field').style.backgroundColor = 'white';
            document.getElementById('email-field').style.color = 'black';
            return true;
            
        } else {
            document.getElementById('email-field').style.backgroundColor = '#a60000';
            document.getElementById('email-field').style.color = 'white';
        }
    }

    function message() {
        const message = document.getElementById('message-field');
        const isValueValid = message.value.trim().length >= 5;

        if (isValueValid) {
            message.style.backgroundColor = 'white';
            message.style.color = 'black';
            return true;

        } else {
            message.style.backgroundColor = '#a60000';
            message.style.color = 'white';
        }
    }

    // BOUTON D'ENVOI DES CHAMPS
    const form = document.querySelector('#form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        firstName();
        lastName();
        email();
        message();

        const isFormValid = () => firstName() && lastName() && email() && message();

        if (isFormValid()) {
            console.log('Prénom:',document.getElementById('firstName-field').value);
            console.log('Nom:',document.getElementById('lastName-field').value);
            console.log('Email:',document.getElementById('email-field').value);
            console.log('Votre message:',document.getElementById('message-field').value);

            form.reset();
        } 
    });

