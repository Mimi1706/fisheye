// Récupère l'id du profil dans l'URL
let photographerIdUrl = (new URL(document.location)).searchParams.get('id');

// Récupère le fichier JSON grâce à un lien
const fetchData = async () => {
   return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
   .then(function(response){
      return response.json();
   }) 

   // Génère le profil correspondant à l'id dans l'URL
   .then (function(dataJson){
      let allPhotographers = dataJson.photographers;
      let allMedia = dataJson.media;
      
      let photographerBanner = document.getElementById('photographer-banner');
      let allMediaContent = document.getElementById('media-content');

      // Vérifie l'identité du photographe et génère sa bannière
      for(let i in allPhotographers){

         if(`${allPhotographers[i].id}` == photographerIdUrl){
            photographerBanner.innerHTML += 
            `
               <img src="content/portraits/${allPhotographers[i].portrait}"></img>

               <h1>${allPhotographers[i].name}</h1>
               <p class="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
               <p class="tagline">${allPhotographers[i].tagline}</p>
               <ul class="filter">${allPhotographers[i].tags.map(tag => `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
            `;
         }

         // Génère le contenu media du photographe
         for(let x in allMedia){

            if(`${allPhotographers[i].id}` == photographerIdUrl && `${allPhotographers[i].id}` == `${allMedia[x].photographerId}`){

               // Vérifie si le media est une image de format jpg
               if(/\.jpe?g$/i.test(`${allMedia[x].image}`)){
                  allMediaContent.innerHTML +=
                  `
                     <div class="media-piece">
                     <img src="content/media/${allPhotographers[i].id}/${allMedia[x].image}"></img>
                     <div class="info">
                     <h2>${allMedia[x].title}</h2>
                     <div id="likes-info" ><span id="nb-likes">${allMedia[x].likes}</span>
                     <span id="heart">&#9829</span></div>
                     </div>
                     </div>
                  `;

               // Vérifie si le media est une vidéo 
               } else {
                  allMediaContent.innerHTML +=
                  `
                     <div class="media-piece">
                     <video><source src="content/media/${allPhotographers[i].id}/${allMedia[x].video}"></video>
                     <div class="info">
                     <h2>${allMedia[x].title}</h2>
                     <div id="likes-info" ><span id="nb-likes">${allMedia[x].likes}</span>
                     <span id="heart">&#9829</span></div>
                     </div>
                     </div>
                  `;
               }
            } 
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

