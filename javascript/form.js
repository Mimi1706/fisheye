// FORMULAIRE
const closeBtn = document.getElementsByClassName('close-btn');
const formWindow = document.getElementById('form');
const formBg = document.getElementById('form-bg');

    //BOUTON DE FERMETURE 
    function closeForm(displayStyle){
        formWindow.style.display = displayStyle;
        formBg.style.display = 'none';
    }

    //CHAMPS DU FORMULAIRE
    function firstName() {
        const firstName = document.getElementById('firstName-field');
        const isValueValid = firstName.value.trim().length >= 2 && firstName.value.match(/^[A-Za-z]+$/);

        if (isValueValid) {

            return firstName;

        } else {
            firstName.style.border = '5px solid #901C1C';
            firstName.style.color = 'black';
        }
    }

    function lastName() {
        const lastName = document.getElementById('lastName-field');
        const isValueValid = lastName.value.trim().length >= 2 && lastName.value.match(/^[A-Za-z]+$/);

        if (isValueValid) {

            return lastName;

        } else {
            lastName.style.border = '5px solid #901C1C';
            lastName.style.color = 'black';
        }
    }

    function email() {
        const email = document.getElementById('email-field').value;
        const validMail = /\S+@\S+\.\S+/;
        
        if (validMail.test(email)){

            return email;
            
        } else {
            document.getElementById('email-field').style.border = '5px solid #901C1C';
            document.getElementById('email-field').style.color = 'black';
        }
    }

    function message() {
        const message = document.getElementById('message-field');
        const isValueValid = message.value.trim().length >= 5;

        if (isValueValid) {

            return message;

        } else {
            message.style.border = '5px solid #901C1C';
            message.style.color = 'black';
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