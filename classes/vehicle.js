import { findVehicleByName } from '../data.js';

export class Vehicle {
    constructor(name){        
        this.name = name;
        this.id = findVehicleByName(name).id
        this.price = findVehicleByName(name).price;
    }

    calcFee = (quantity, hours) => this.price * quantity * hours;
}