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
    let dateFilter = document.getElementById("filter-date");
    let popularityFilter = document.getElementById("filter-popularity");
    let titleFilter = document.getElementById("filter-title");


    for(let mediaPiece of allMediaPieces){

        // Filtre de date
        dateFilter.addEventListener('click', e => {
            
            let allDates = mediaPiece.childNodes[1].dataset.date;
            console.log(allDates)

        })   

        // Filtre de popularité
        popularityFilter.addEventListener('click', e => {

            let allLikes = mediaPiece.childNodes[3].childNodes[3].childNodes[0].innerHTML;
            console.log(allLikes)

        }) 

        // Filtre de titre
        titleFilter.addEventListener('click', e => {

            let allTitles = mediaPiece.childNodes[3].childNodes[1].innerHTML;
            console.log(allTitles)

        }) 
    }
}


asyncCall()