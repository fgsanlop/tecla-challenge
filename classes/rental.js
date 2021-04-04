import { Vehicle } from './vehicle.js';

export default class Rental {
    constructor(city, vehicle, quantity, hours){        
        this.city = city;
        this.vehicle = vehicle;
        this.quantity = quantity;
        this.hours = hours;        
        
        const vehicleObj = new Vehicle(String(vehicle));

        this.fee = vehicleObj.calcFee(this.quantity, this.hours);
    }
    
}