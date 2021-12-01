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

      // Vérifie l'identité du photographe et génère sa bannière
      for(let i in allPhotographers){

         if(`${allPhotographers[i].id}` == photographerIdUrl){
            photographerBanner.innerHTML += 
            `
               <h1 aria-label="photographer name ${allPhotographers[i].name}">${allPhotographers[i].name}</h1>
               <p class="location" arial-label="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
               <p class="tagline" arial-label="tagline">${allPhotographers[i].tagline}</p>
               <ul class="filter" arial-label="tags">${allPhotographers[i].tags.map(tag => `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 

               <button id="contact" onclick="openForm('block')">Contactez-moi</button>

               <img src="content/portraits/${allPhotographers[i].portrait}" aria-label="portrait of ${allPhotographers[i].name}"></img>
            `;

            // Ajout du prix dans le infos-window
            let fixedDayPrice = document.getElementById('day-price');
            fixedDayPrice.innerHTML += allPhotographers[i].price + "€ / jour";

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
                     <div class="media-piece" aria-label="picture ${allMedia[x].title}">
                     <img class="media-content" data-name="${allMedia[x].title}" data-date="${allMedia[x].date}" src="content/media/${allPhotographers[i].id}/${allMedia[x].image}"></img>
                     <div class="info">
                     <h2 id="media-content-title" aria-labelledby="title ${allMedia[x].title}">${allMedia[x].title}</h2>
                     <div id="likes-info" aria-label="number of likes"><span class="nb-likes" aria-labelledby="number of likes">${allMedia[x].likes}</span>
                     <span id="heart" aria-labelledby="click to like">&#9825;</span></div>
                     </div>
                     </div>
                  `;

               // Vérifie si le media est une vidéo 
               } else {
                  allMediaContent.innerHTML +=
                  `
                     <div class="media-piece" aria-label="video ${allMedia[x].title}">
                     <video class="media-content" data-name="${allMedia[x].title}" data-date="${allMedia[x].date}" src="content/media/${allPhotographers[i].id}/${allMedia[x].video}"></video>
                     <div class="info">
                     <h2 id="media-content-title" aria-labelledby="title ${allMedia[x].title}">${allMedia[x].title}</h2>
                     <div id="likes-info" aria-label="number of likes"><span class="nb-likes" aria-labelledby="number of likes">${allMedia[x].likes}</span>
                     <span id="heart" aria-labelledby="click to like">&#9825;</span></div>
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

// TOUT CE QUI CONCERNE LES LIKES 
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

   // Calcul des likes
   let allLikes = document.querySelectorAll('.nb-likes');
   let sum = 0;

   for(let x=0; x < allLikes.length; x++){

      sum += parseFloat(allLikes[x].innerHTML)
   }

   // Création de la fenêtre fixed (total likes + prix/jour)
   let fixedAllLikes = document.getElementById('all-likes');
   fixedAllLikes.innerHTML += sum;

   // Animation du coeur de chaque média + mise à jour du total des likes à chaque clic
   let mediaInfos = document.querySelectorAll('#likes-info');
   for (let m in mediaInfos){

      let emptyHeart = mediaInfos[m].childNodes[2];

      emptyHeart.addEventListener('click', e => {
   
         if(emptyHeart.className == 'change'){
            emptyHeart.setAttribute('data-before', '');
            emptyHeart.classList.remove('change');
            mediaInfos[m].childNodes[0].innerText--;
            fixedAllLikes.innerText--;

         } else{
            emptyHeart.setAttribute('data-before', '\u2665');
            emptyHeart.classList.add('change');
            mediaInfos[m].childNodes[0].innerText++;
            fixedAllLikes.innerText++;
         }
     })
   }
} 

asyncCall();

