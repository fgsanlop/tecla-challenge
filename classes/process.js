const twoDigits = (value) => (value < 10) ? `0${value}` : value ;

export default class Process {
    constructor(rentalForm, citySelect, vehicleSelect, quantity, hours){
        this.rentalForm = rentalForm;
        this.citySelect = citySelect;
        this.vehicleSelect = vehicleSelect;
        this.quantity = quantity;
        this.hours = hours;
    }

    /* This does not work :c
    fillSelect = (element, ...data) => {
        data.forEach(item => {
            let option = document.createElement('option');
            option.value = item.id;
            option.innerHTML = item.name;
            element.appendChild(option);
        })
    }
    */

    //Save rental onject as JSON in localStorage
    saveRental = (rental) => {
        const today = new Date();
        const y = twoDigits(today.getFullYear());;
        const M = twoDigits(today.getMonth());
        const d = twoDigits(today.getDate());
        const h = twoDigits(today.getHours())
        const m = twoDigits(today.getMinutes());
        const s = twoDigits(today.getSeconds())

        const key = `${y}${M}${d}${h}${m}${s}`;
        localStorage.setItem(key, JSON.stringify(rental));        
    }   

    //Return rentals array to sort
    rentalsToArray = () => {
        let rentals = new Array();

        Object.keys(localStorage).forEach(key => {
            let object = JSON.parse(localStorage.getItem(key));
            object.id = key;
            rentals.push(object);
        });
        
        return rentals;
    }

    //Function to filter rentals by city, this is used to make a new array
    rentalsByCity = (id) => this.rentalsToArray().filter(rental => rental.city === String(id));

    //Function to filter rentals by city, this is used to make a new array
    rentalsByVehicle = (name, ...array) => array.filter(rental => rental.vehicle === String(name));
   
    //Total fee, all cities
    totalFee = () => {
        let totalFee = 0;
        this.rentalsToArray().forEach(item => totalFee += item.fee);
        return totalFee;
    }

}