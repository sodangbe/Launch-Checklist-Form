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

    if (isNaN(cargoMassNumber)) {
     
      alert("The cargo mass must be a number");

    }else  if (isNaN(fuelLevelNumber)) {
      //console.log(fuelLevel.value)
      alert("The fuel level must be a number");
    } else if (pilotName.value === "" ||copilotName.value === "" ||fuelLevel.value === "" ||cargoMass.value === ""){
      
      alert("All fields are required!");
      
    }
   
    if (checkFuel(fuelLevelNumber)) {
      p.style.visibility = "visible";
      fL.innerHTML = "There is not enough fuel for the journey";
      lS.innerHTML = "Shuttle not ready for launch";
      lS.style.color = "red";
    } else {
      lS.innerHTML = "Shuttle is ready for launch";
    }
    
    if (checkCargoMass(cargoMassNumber)) {
      p.style.visibility = "visible";
      fL.innerHTML = "There is too much mass for the shuttle to take off.";
      lS.innerHTML = "Shuttle not ready for launch";
      lS.style.color = "red";
    } else {
      lS.innerHTML = "Shuttle is ready for launch";
    }
  });

  async function getPlanets() {
   let url = "https://handlers.education.launchcode.org/static/planets.json";
   try {
     let res = await fetch(url);
     return await res.json();
   } catch (error) {
     console.log(error);
   }
}

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
