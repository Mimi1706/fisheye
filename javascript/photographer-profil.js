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
      let allMediaContent = document.getElementById('media-section');
      let stickyInfos = document.getElementById('sticky-infos');

      // Vérifie l'identité du photographe et génère sa bannière
      for(let i in allPhotographers){

         if(`${allPhotographers[i].id}` == photographerIdUrl){
            photographerBanner.innerHTML += 
            `
               <img class="media-section" src="content/portraits/${allPhotographers[i].portrait}"></img>

               <h1>${allPhotographers[i].name}</h1>
               <p class="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
               <p class="tagline">${allPhotographers[i].tagline}</p>
               <ul class="filter">${allPhotographers[i].tags.map(tag => `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
            `;

            // Ajout du prix dans le sticky-infos
            let stickyDayPrice = document.getElementById('day-price');
            stickyDayPrice.innerHTML += allPhotographers[i].price + "€ / jour";

            // Ajout du prénom dans contact
            let contactMe = document.getElementById('Photographer-Name');
            contactMe.innerHTML += allPhotographers[i].name;
         }

         // Génère le contenu media du photographe
         for(let x in allMedia){

            if(`${allPhotographers[i].id}` == photographerIdUrl && `${allPhotographers[i].id}` == `${allMedia[x].photographerId}`){

               // Vérifie si le media est une image de type jpg
               if(/\.jpe?g$/i.test(`${allMedia[x].image}`)){
                  allMediaContent.innerHTML +=
                  `
                     <div class="media-piece">
                     <img class="media-content" data-name="${allMedia[x].title}" src="content/media/${allPhotographers[i].id}/${allMedia[x].image}"></img>
                     <div class="info">
                     <h2 id="media-content-title">${allMedia[x].title}</h2>
                     <div id="likes-info" ><span class="nb-likes">${allMedia[x].likes}</span>
                     <span id="heart">&#9829</span></div>
                     </div>
                     </div>
                  `;

               // Vérifie si le media est une vidéo 
               } else {
                  allMediaContent.innerHTML +=
                  `
                     <div class="media-piece">
                     <video class="media-content" data-name="${allMedia[x].title}" src="content/media/${allPhotographers[i].id}/${allMedia[x].video}"></video>
                     <div class="info">
                     <h2 id="media-content-title">${allMedia[x].title}</h2>
                     <div id="likes-info" ><span class="nb-likes">${allMedia[x].likes}</span>
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
   unloadScrollBars();
   document.getElementById('contact').style.display = 'none';
}

// FONCTION POUR CACHER LA BARRE DE SCROLL
function unloadScrollBars() {
   document.body.style.overflow = 'hidden';  // firefox, chrome
   document.body.scroll = "no"; // ie 
 }

// FENETRE MINIATURE D'INFORMATIONS LIKES
// ATTENDS QUE LE CONTENU SE CHARGE
function sendData() {
   return new Promise(resolve => {
   setTimeout(() => {
      resolve();
   }, 1000);
   });
}

// CHARGE LES INFORMATIONS
async function asyncCall() {
   await sendData();

   // CALCUL DES LIKES
   let allLikes = document.querySelectorAll('.nb-likes');
   let sum = 0;

   for(let x=0; x < allLikes.length; x++){

      sum += parseFloat(allLikes[x].innerHTML)
   }

   // CRÉATION DE LA FENETRE STICKY
   let stickyAllLikes = document.getElementById('all-likes');

   stickyAllLikes.innerHTML += sum + "&#x2665;";

   console.log(stickyInfos.innerHTML)


}
 
asyncCall();
