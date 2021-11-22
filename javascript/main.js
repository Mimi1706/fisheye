let photographersSection = document.getElementById("photographers");

// Récupère le fichier JSON grâce à un lien
const fetchData = async () => {
   return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
   .then(function(response){
      return response.json();
   }) 

   // Génère les profils des photographes avec un template
   .then (function(dataJson){
      let allPhotographers = dataJson.photographers;

      for(let i in allPhotographers){

         photographersSection.innerHTML += 

         `
         <div class="${allPhotographers[i].tags.join(" ")} photographer">
            <a href="photographers.html" title="${allPhotographers[i].name}">
            <img src="images/portraits/${allPhotographers[i].portrait}"></img>
            </br><h2>${allPhotographers[i].name}</h2></a>
            <p class="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
            <p class="tagline">${allPhotographers[i].tagline}</p>
            <p class="price">${allPhotographers[i].price}€/jour</p>
            <ul class="filter">${allPhotographers[i].tags.map(tag => `<li data-filter="${tag}">#${tag}</li>`).join(" ")}</ul> 
         </div>
         
         `;
      }
      return photographersSection;
   })

   // Message d'erreur s'il y a un problème 
   .catch (function(){
      console.log("Erreur fetch !");
   })
} 

fetchData();

// Ajoute leur classe respectives aux filtres de navigation
let listOfFilters = document.querySelectorAll('nav button');

function addFiltersValue(){
   for(let i=0; listOfFilters[i]; i++){
      let filterName = listOfFilters[i].innerHTML.substring(1);
      let filterNameSmall = filterName.toLowerCase();
      listOfFilters[i].classList.add(filterNameSmall);
   }   
}

addFiltersValue();

// Matcher les profils des photographes selon leurs tags
let listOfPhFilters = document.getElementsByClassName('photographer');

function matchFilters(thisFilter){
   for(let i=0; i<listOfPhFilters.length;i++){
      if(listOfPhFilters[i].className.indexOf(thisFilter)==-1) {
         listOfPhFilters[i].classList.add('hidden');
      } 
   }
}

// Actionne les fonctions selon si le filtre est actif ou non
listOfFilters.forEach(filterButton => filterButton.addEventListener('click', 
function() {
   this.classList.toggle('active');

   let activeFilters = document.querySelectorAll('.active');

   if (filterButton.classList.contains('active')){
      for(let x=0; listOfPhFilters.length>x; x++){

         if (listOfPhFilters[x].className.indexOf(filterButton.classList[0])==-1){
            listOfPhFilters[x].classList.add('hidden');
         }
      }
      
   } else {
      
      for(let x=0; listOfPhFilters.length>x; x++){

         if (listOfPhFilters[x].className.indexOf(activeFilters)){
            listOfPhFilters[x].classList.remove('hidden');
         } 
      }
   }
}));
