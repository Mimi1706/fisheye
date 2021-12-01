// Attends que le contenu se charge
function sendData() {
    return new Promise(resolve => {
    setTimeout(() => {
       resolve();
    }, 1000);
    });
}
 
// Charge les informations
async function asyncCall() {
await sendData();

    let allMediaPieces = document.querySelectorAll('.media-piece');
    let allMediaSection = document.querySelector('#media-section')

    let selectFilters = document.getElementById("select-filters");
    selectFilters.addEventListener('change', checkSelection);


    function checkSelection() {

        // Réorganise par ordre de popularité
        if(selectFilters.options[0].selected==true){

            let arrayOfLikes = [];

            for(let mediaPiece of allMediaPieces){    

                arrayOfLikes.push(mediaPiece);

                arrayOfLikes
                .sort((a,b)=>b.childNodes[3].childNodes[3].childNodes[0].textContent-a.childNodes[3].childNodes[3].childNodes[0].textContent)
                .forEach(mediaPiece=>allMediaSection.appendChild(mediaPiece));
                
            }
        
        // Réorganise par ordre d'ancienneté
        } else if(selectFilters.options[1].selected==true){

            let arrayOfLikes = [];

            for(let mediaPiece of allMediaPieces){    

                arrayOfLikes.push(mediaPiece);

                arrayOfLikes
                .sort((a,b)=>{ 
                    return new Date(a.childNodes[1].dataset.date).valueOf() - new Date(b.childNodes[1].dataset.date).valueOf();
                })
                .forEach(mediaPiece=>allMediaSection.appendChild(mediaPiece));

                
            }

        // Réorganise par ordre alphabétique
        } else if(selectFilters.options[2].selected==true){

            let arrayOfLikes = [];

            for(let mediaPiece of allMediaPieces){    

                arrayOfLikes.push(mediaPiece);

                arrayOfLikes.sort((a, b) => {
                    if (a.childNodes[3].childNodes[1].innerHTML.toLowerCase() < b.childNodes[3].childNodes[1].innerHTML.toLowerCase()) {
                        return -1;
                    } else if (a.childNodes[3].childNodes[1].innerHTML.toLowerCase() > b.childNodes[3].childNodes[1].innerHTML.toLowerCase()) {
                        return 1;
                    }
                });
                arrayOfLikes.forEach(mediaPiece=>allMediaSection.appendChild(mediaPiece));
                
            }
        }
    }
}


asyncCall()