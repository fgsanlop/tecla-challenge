import Rental from './classes/rental.js';
import { cities, vehicles } from './data.js';

//Two digits if necessary
const twoDigits = (value) => (value < 10) ? `0${value}` : value ;

//DOM and time
const rentalForm = document.querySelector('#rental-form');
const citySelect = document.querySelector('#city-no');
const vehicleSelect = document.querySelector('#vehicle-no');
const quantity = document.querySelector('#vehicle-quan');
const hours = document.querySelector('#hours');
const test = document.querySelector('#test');

//Filling cities/vehicles select element with JSON data
cities.forEach(city => {
    let option = document.createElement('option');
    option.value = city.id;
    option.innerHTML = city.name;
    citySelect.appendChild(option);
});

vehicles.forEach(vehicle => {
    let option = document.createElement('option');
    option.value = vehicle.name;
    option.innerHTML = vehicle.name;
    vehicleSelect.appendChild(option);
});

//Save rental in localStorage
rentalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rental = new Rental(citySelect.value, vehicleSelect.value, quantity.value, hours.value);
    
    const today = new Date();
    const y = twoDigits(today.getFullYear());;
    const M = twoDigits(today.getMonth());
    const d = twoDigits(today.getDate());
    const h = twoDigits(today.getHours())
    const m = twoDigits(today.getMinutes());
    const s = twoDigits(today.getSeconds())

    const key = `${y}${M}${d}${h}${m}${s}`;
    localStorage.setItem(key, JSON.stringify(rental));  
    
    rentalForm.reset();
});


//**********************************Filtering by cities********************************************** 
let rentals = new Array();

Object.keys(localStorage).forEach(key => {
    rentals.push(JSON.parse(localStorage.getItem(key)));
});
console.warn(rentals);

//Filtrar por ciudad
let rentalsByCity = new Array();
const filterById = (id) => rentals.filter(rental => rental.city === String(id));

cities.forEach(city => {
    rentalsByCity.push(filterById(city.id));  
});

console.log(rentalsByCity)


/*
console.log(rentals);

let city1 = rentals.filter(rental => rental.city === '1');
console.log(city1.sort( (a, b) => a.fee - b.fee ));
//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

city1.forEach((ele) => {
    test.innerHTML += ele.city + " - " + ele.vehicle + " - " + ele.fee + "<br>"
})
*/