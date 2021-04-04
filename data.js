export const cities = [
    {
        id: 1,
        name: 'Guadalajara'
    }, 
    {
        id: 2,
        name: 'Tijuana'
    },
    {
        id: 3,
        name: 'Culiacan'
    },
    {
        id: 4,
        name: 'Toluca'
    },
    {
        id: 5,
        name: 'Merida'
    }
];

export const vehicles = [
    {
        id: 1,
        name: 'Bicicleta',
        price: 4
    },
    {
        id: 2,
        name: 'Moto',
        price: 6
    },
    {
        id: 3,
        name: 'Cuatrimoto',
        price: 15
    },
    {
        id: 4,
        name: 'Carro de golf',
        price: 18
    }
];

export const findVehicleByName = (name) => vehicles.find(vehicle => vehicle.name === name);

export const findCityById = (id) => cities.find(city => city.id === id);