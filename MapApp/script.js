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

let map;
let mapEvent;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker(coords)
      .addTo(map)
      .bindPopup("Your position")
      .openPopup();

    map.on('click', function(mapE) {
      mapEvent=mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    })
  },
  function () {
    alert("Could not get position,");
  }
);

form.addEventListener('submit', function(e){
  e.preventDefault()
  const lat = mapEvent.latlng.lat
  const lng = mapEvent.latlng.lng
  L.marker([lat, lng]).addTo(map)
    .bindPopup(L.popup({
      maxWidth:250,
      minWidth:100,
      autoClose:false,
      closeOnClick:false,
      className:'running-popup',
    }))
    .setPopupContent('Workout')
    .openPopup();
  inputDistance.value=''
  inputDuration.value=''
  inputCadence.value=''
  form.classList.add('hidden')
})