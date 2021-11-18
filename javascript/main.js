let photographersSection = document.getElementById("photographers");

const fetchData = async () => {
   return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
   .then(function(response){
      return response.json();
   }) 
   .then (function(dataJson){
      let allPhotographers = dataJson.photographers;

      for(let i in allPhotographers){

         let portfolioName = allPhotographers[i].name.replace(/[\W_]/g, "");

         photographersSection.innerHTML += 

         `
         <div>
            <a href="photographers/${portfolioName}.html" title="${allPhotographers[i].name}">
            <img src="images/portraits/${allPhotographers[i].portrait}"></img>
            </br><h2>${allPhotographers[i].name}</h2></a>
            <p class="location">${allPhotographers[i].city}, ${allPhotographers[i].country}</p>
            <p class="tagline">${allPhotographers[i].tagline}</p>
            <p class="price">${allPhotographers[i].price}€/jour</p>
         </div>
         
         `;
      }
      return photographersSection;
   })
   .catch (function(){
      console.log("erreur fetch");
   })
} 

fetchData();