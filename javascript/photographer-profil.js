// Récupère l'id du profil dans l'URL
let photographerId = (new URL(document.location)).searchParams.get('id');

// Récupère le fichier JSON grâce à un lien
const fetchData = async () => {
   return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
   .then(function(response){
      return response.json();
   }) 

   // Génère le profil correspondant à l'id dans l'URL
   .then (function(dataJson){
      let allPhotographers = dataJson.photographers;
      let photographerBanner = document.getElementById('photographer-banner');

      for(let i in allPhotographers){

         if(`${allPhotographers[i].id}` == photographerId){
            photographerBanner.innerHTML += 

            `
               <img src="images/portraits/${allPhotographers[i].portrait}"></img>

               <h1>${allPhotographers[i].name}</h1>
               <p class="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
               <p class="tagline">${allPhotographers[i].tagline}</p>
               <ul class="filter">${allPhotographers[i].tags.map(tag => `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
            `;
         }

      }
   })

   // Message d'erreur s'il y a un problème fetch
   .catch (function(){
      console.log("Erreur fetch !");
   })
} 

fetchData();

//BOUTON D'OUVERTURE DU FORMULAIRE 
function openForm(displayStyle){
   formWindow.style.display = displayStyle;
   formBg.style.display = 'block';
   document.body.scrollTop = 0; // For Safari
   document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

