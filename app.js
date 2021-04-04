import Rental from './classes/rental.js';
import { cities, vehicles } from './data.js';
import Process from './classes/process.js';
import { City } from './classes/city.js';

//DOM
const rentalForm = document.querySelector('#rental-form');
const citySelect = document.querySelector('#city-no');
const vehicleSelect = document.querySelector('#vehicle-no');
const quantity = document.querySelector('#vehicle-quan');
const hours = document.querySelector('#hours');
const table1 = document.querySelector('#table1 tbody');
const tables = document.querySelector('#tables');
const table2 = document.querySelector('#table2 tbody');
const clearButton = document.querySelector('#clear');

const process = new Process(rentalForm,citySelect,vehicleSelect,quantity,hours);

//Fill select elements
cities.forEach(city => {
    let option = document.createElement('option');
    option.value = city.id;
    option.innerHTML = city.name;
    process.citySelect.appendChild(option);
});

vehicles.forEach(vehicle => {
    let option = document.createElement('option');
    option.value = vehicle.name;
    option.innerHTML = vehicle.name;
    process.vehicleSelect.appendChild(option);
});

const validateEmptyRentals = (dividend, divisor) => {
    if(divisor == 0)
        return 0;    
    else
        return ((dividend/divisor)*100).toFixed(2);
}
//Rentals filtered by city, a new array including total fees
const totalFeeByCity = () => {
    const rentalsByCities = new Array();
    let totalFee = process.totalFee();
    cities.forEach(city => {    
        const group = process.rentalsByCity(city.id);    
        let total = 0;
        group.forEach(item => total += item.fee); 
        const cityObj = new City(city.id);
        const toPush = {
            city: cityObj.id,
            name: cityObj.name,
            fee: total,
            percent: validateEmptyRentals(total, totalFee)
        }
        rentalsByCities.push(toPush);
    });

    rentalsByCities.sort((a, b) => a.fee - b.fee);
    //https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    return rentalsByCities;
}

const feeByVehicles = (city) => {
    const rentalsByCitiesVehicles = new Array();

    const group1 = process.rentalsByCity(city);
    let total = 0;
    vehicles.forEach(vehicle => {        
        const group2 = process.rentalsByVehicle(vehicle.name, ...group1);    
        const cityObj = new City(city);
        group2.forEach(item => total += item.fee); 
        const toPush = {
            vehicle: vehicle.name,
            city: cityObj.name,       
            fee: total
        }        
        rentalsByCitiesVehicles.push(toPush);
        total = 0;
    })

    return rentalsByCitiesVehicles;
}

//Function used to print table every time user click the submit button from rentalForm
const printTable1 = () => {
    table1.innerHTML = null;
    let lowest = true;
    totalFeeByCity().forEach((item) => {
        if(lowest) {
            table1.innerHTML += `
            <tr class='table-active'>
                <td>${item.city} <span class="badge badge-dark badge-pill">!</span></th>
                <td>${item.name}</td>
                <td>$ ${item.fee}</td>
                <td>${item.percent} %</td>
            </tr>   
            `;
            lowest = false;
        }
        else 
            table1.innerHTML += `
            <tr>
                <td>${item.city}</th>
                <td>${item.name}</td>
                <td>$ ${item.fee}</td>
                <td>${item.percent} %</td>
            </tr>   
            `;
    });        
}

const printTable2 = () => {
    tables.innerHTML = null;
    let data = '';
    cities.forEach(city => {
        const feeByVehiclesData = feeByVehicles(city.id);
        const start = `
        <div class="col-lg-4 mb-4">
            <div class="card border-info">
                <div class="card-header">
                    ${city.name}
                </div>               
                <div class="card-body">
                    <table id="table1" class="table">
                        <thead>
                            <tr>
                                <th>Vehículo</th>
                                <th>Total</th>
                            </tr>
                        </thead>    
                        <tbody>                            
        `;
        const end = ` 
                        </tbody>                        
                    </table>               
                </div>     
            </div>
        </div>                        
        `;
        for(let i=0; i<vehicles.length; i++) {
            data += `<tr><td>${feeByVehiclesData[i].vehicle}</td><td>$ ${feeByVehiclesData[i].fee}</td></tr>`
        }   

        tables.innerHTML += `${start}${data}${end}`

        data = '';
        
    });        
}

const printTable3 = () => {
    const rentals = process.rentalsToArray();
    rentals.sort((a, b) => b.id - a.id);
    
    table2.innerHTML = null;
    
    rentals.forEach((item) => {
        table2.innerHTML += `
        <tr>
            <td><small>${item.id}</small></th>
            <td><small>${item.city}</small></td>
            <td><small>${item.vehicle}</small></td>
            <td><small>${item.quantity}</small></td>
            <td><small>${item.hours}</small></td>
            <td><small>$ ${item.fee}</small></td>
        </tr>   
        `;
    });   
}

printTable1();
printTable2();
printTable3();

//Save rental in localStorage and update tables
rentalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rental = new Rental(process.citySelect.value, process.vehicleSelect.value, process.quantity.value, process.hours.value);
    process.saveRental(rental);  
    rentalForm.reset();
    printTable1();
    printTable2();
    printTable3();
});

clearButton.addEventListener('click', () => {
    localStorage.clear();
    printTable1();
    printTable2();
    printTable3();
});

