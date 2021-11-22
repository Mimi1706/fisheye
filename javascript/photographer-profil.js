// Récupère le fichier JSON grâce à un lien
let photographersProfil = document.getElementById("photographer-profil");

const fetchData = async () => {
    return await fetch("https://raw.githubusercontent.com/Mimi1706/HanNguyen_6_021121/main/javascript/fisheye.json")
    .then(function(response){
       return response.json();
    }) 
 
    // Génère les profils des photographes avec un template
    .then (function(dataJson){
       let allPhotographers = dataJson.photographers;
 
       for(let i in allPhotographers){
 
        photographersProfil.innerHTML += 
 
          `
            
          
          `;
       }
       return photographersProfil;
    })
 
    // Message d'erreur s'il y a un problème 
    .catch (function(){
       console.log("Erreur fetch !");
    })
 } 
 
 fetchData();

