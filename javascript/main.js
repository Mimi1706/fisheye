let photographersSection = document.getElementById("photographers");

const fetchData = async () => {
   return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
   .then(function(response){
      return response.json();
   }) 
   .then (function(dataJson){
      let allPhotographers = dataJson.photographers;

      for(let i in allPhotographers){

         photographersSection.innerHTML += 

         `
         <div>
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
   .catch (function(){
      console.log("Erreur fetch !");
   })
} 

fetchData();