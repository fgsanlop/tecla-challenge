import { findCityById } from '../data.js';

export class City{
    constructor(id){
        this.id = id;
        this.name = findCityById(id).name;
    }
}