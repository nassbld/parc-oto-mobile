export interface Agency {
    name: string;
    city: string;
    address: string;
    localisation: [longitude: number, latitude: number];
    opened: {
        [day: string]: [any, any] | null;
    }
}

export const agencies: Agency[] = [
    {
        name: 'Pesaro',
        city: 'Nanterre',
        address: '14 Boulevard de Pesaro',
        localisation: [48.8965061, 2.2212777],
        opened: {
            lundi: ['9:00 - 12:15', '13:45 - 17:15'],
            mardi: ['9:00 - 12:15', '13:45 - 17:15'],
            mercredi: ['9:00 - 12:15', '13:45 - 17:15'],
            jeudi: ['9:00 - 12:15', '13:45 - 17:15'],
            vendredi: ['9:00 - 12:15', '13:45 - 17:15'],
            samedi: null,
            dimanche: null
        }
    },
    {
        name: 'Village',
        city: 'Gennevilliers',
        address: '4 rue du Village',
        localisation: [48.54213, 2.54843],
        opened: {
            lundi: ['9:00 - 12:15', '13:45 - 17:15'],
            mardi: ['9:00 - 12:15', '13:45 - 17:15'],
            mercredi: ['9:00 - 12:15', '13:45 - 17:15'],
            jeudi: ['9:00 - 12:15', '13:45 - 17:15'],
            vendredi: ['9:00 - 12:15', '13:45 - 17:15'],
            samedi: null,
            dimanche: null
        }
    },
    {
        name: 'Ponton',
        city: 'Avignon',
        address: '12 Avenue du Pont d\'Avignon',
        localisation: [48.54213, 2.54843],
        opened: {
            lundi: ['9:00 - 12:15', '13:45 - 17:15'],
            mardi: ['9:00 - 12:15', '13:45 - 17:15'],
            mercredi: ['9:00 - 12:15', '13:45 - 17:15'],
            jeudi: ['9:00 - 12:15', '13:45 - 17:15'],
            vendredi: ['9:00 - 12:15', '13:45 - 17:15'],
            samedi: null,
            dimanche: null
        }
    },
    {
        name: 'Place du marché',
        city: 'Pau',
        address: '2 Place du Marché',
        localisation: [48.54213, 2.54843],
        opened: {
            lundi: ['9:00 - 12:15', '13:45 - 17:15'],
            mardi: ['9:00 - 12:15', '13:45 - 17:15'],
            mercredi: ['9:00 - 12:15', '13:45 - 17:15'],
            jeudi: ['9:00 - 12:15', '13:45 - 17:15'],
            vendredi: ['9:00 - 12:15', '13:45 - 17:15'],
            samedi: null,
            dimanche: null
        }
    },
    {
        name: 'Quai du port',
        city: 'Boulogne-sur-mer',
        address: '95 Quai du Port de Boulogne',
        localisation: [48.54213, 2.54843],
        opened: {
            lundi: ['9:00 - 12:15', '13:45 - 17:15'],
            mardi: ['9:00 - 12:15', '13:45 - 17:15'],
            mercredi: ['9:00 - 12:15', '13:45 - 17:15'],
            jeudi: ['9:00 - 12:15', '13:45 - 17:15'],
            vendredi: ['9:00 - 12:15', '13:45 - 17:15'],
            samedi: null,
            dimanche: null
        }
    }
]

export interface Car {
    agency: string;
    brand: string;
    model: string;
    picture: any;
}

export const cars: Car[] = [
    {
        agency: 'Nanterre',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Nanterre',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Nanterre',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Nanterre',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Gennevilliers',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Gennevilliers',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Pau',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Boulogne-sur-mer',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Boulogne-sur-mer',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Avignon',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
    {
        agency: 'Gennevilliers',
        brand: 'Renault',
        model: 'Kangoo',
        picture: require('../assets/images/kangoo.png')
    },
]