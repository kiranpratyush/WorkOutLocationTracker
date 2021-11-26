'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Defining the function to get the position Data and display the Map
let map,mapEvent
const displayMap = function (pos) {
  map = L.map('map').setView(
    [pos.coords.latitude, pos.coords.longitude],
    13
  );
  console.log(pos.coords.latitude, pos.coords.longitude);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([pos.coords.latitude, pos.coords.longitude])
    .addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
  // Handdling Click on map
  map.on("click",(e)=>
  { mapEvent =e
    form.classList.remove("hidden")
    inputDistance.focus()
    

  })
};
navigator.geolocation.getCurrentPosition(
  pos => {
    displayMap(pos);
  },
  () => {
    alert('did not get');
  }
);

form.addEventListener('submit',function(e)
{ e.preventDefault()
  // Display the marker
  const {lat:latitude,lng:longitude} = mapEvent.latlng;
    console.log(latitude,longitude)
    L.marker([latitude,longitude])
    .addTo(map)
    .bindPopup(L.popup({
      maxWidth:250,
      minWidth:100,
      autoClose:false,
      closeOnClick:false,
      className:"running-popup"
    }))
    .setPopupContent("Workout")
    .openPopup()

})