// Write your JavaScript code here!
window.addEventListener("load", function () {
  let form = document.querySelector("form");

  let checkFuel = (value) => {
    if (Number(value) < 10000) {
      return true;
    } else {
      return false;
    }
  };

  let checkCargoMass = (value) => {
    if (Number(value) > 10000) {
      return true;
    } else {
      return false;
    }
  };
  
//   function validate() {
      
//     if( pilotName.value === "" ) {
//        alert( "All fields are required!");
//        document.Name.fofocus() ;
//        return false;
//     }
//     if( copilotName.value === "" ) {
//       alert( "All fields are required!");
//        document.copilotName.focus() ;
//        return false;
//     }
//     if( fuelLevel.value === "" || isNaN( fuelLevel.value) ) {
       
//        alert( "Make sure to enter a valid information for each field" );
//        document.fuelLevel.focus() ;
//        return false;
//     }
//     if(cargoMass.value === "" || isNaN(cargoMass.value) ) {
//       alert( "Make sure to enter a valid information for each field" );
//       document.cargoMass.focus() ;
//       return false;
//     }
//     return( true );
//  }
  async function getPlanets() {
   let url = "https://handlers.education.launchcode.org/static/planets.json";
   try {
     let res = await fetch(url);
     return await res.json();
   } catch (error) {
     console.log(error);
   }
}
  async function renderMissions() {
   let planetsList = await getPlanets();
   let html = "";
   planetsList.forEach((planets) => {
    let htmlSegment =`
   <h2>Mission Destination</h2>
<ol>
   <li>Name: ${planets.name}</li>
   <li>Diameter: ${planets.diameter}</li>
   <li>Star: ${planets.star}</li>
   <li>Distance from Earth: ${planets.distance}</li>
   <li>Number of Moons: ${planets.moons}</li>
</ol>
<img src="${planets.image}">`
 
     html += htmlSegment;
     console.log(htmlSegment)
   });
 
   const container = document.getElementById("missionTarget");
   container.innerHTML= html;
 }
 renderMissions();

  form.addEventListener("submit", function (event) {
    let pilotName = document.querySelector("input[name=pilotName]");
    let copilotName = document.querySelector("input[name=copilotName]");
    let fuelLevel = document.querySelector("input[name=fuelLevel]");
    let cargoMass = document.querySelector("input[name=cargoMass]");
  
    event.preventDefault();

    let cargoMassNumber = parseInt(cargoMass.value);
    let fuelLevelNumber = parseInt(fuelLevel.value);
    let p = document.getElementById("faultyItems");
    let fL = document.getElementById("fuelStatus");
    let lS = document.getElementById("launchStatus");

       
    if( pilotName.value === "" ) {
      alert( "All fields are required!");
      document.Name.focus() ;
      p.style.visibility = "hidden";
      return false;
   }
   if( copilotName.value === "" ) {
     alert( "All fields are required!");
      document.copilotName.focus() ;
      p.style.visibility = "hidden";
      return false;
   }
   if( fuelLevel.value === "" || isNaN( fuelLevel.value) ) {
      
      alert( "Make sure to enter a valid information for each field" );
      document.fuelLevel.focus() ;
      p.style.visibility = "hidden";
      return false;
   }
   if(cargoMass.value === "" || isNaN(cargoMass.value) ) {
     alert( "Make sure to enter a valid information for each field" );
     document.cargoMass.focus() ;
     p.style.visibility = "hidden";
     return false;
   }
   
   
    if (checkFuel(fuelLevelNumber)) {
      p.style.visibility = "visible";
      fL.innerHTML = "There is not enough fuel for the journey";
      lS.innerHTML = "Shuttle not ready for launch";
      lS.style.color = "red";
      return false;

    } else if (checkCargoMass(cargoMassNumber)) {
      p.style.visibility = "visible";
      fL.innerHTML = "There is too much mass for the shuttle to take off.";
      lS.innerHTML = "Shuttle not ready for launch";
      lS.style.color = "red";
      return false;
    } else {
      lS.innerHTML = "Shuttle is ready for launch";
      fL.innerHTML = "The mass is enough for the shuttle to take off.";
      fL.innerHTML = "The fuel is enough for the journey";
      lS.style.color = "green";
      return false;
    }
  });
});


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
