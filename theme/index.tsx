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

export interface Reservation {
    id: string; // Identifiant unique de la réservation
    car: Car; // Voiture réservée
    agency: Agency; // Agence où la réservation est effectuée
    customerName: string; // Nom du client ayant réservé
    customerContact: string; // Contact du client (e.g., téléphone ou email)
    startDate: Date; // Date et heure de début de la réservation
    endDate: Date; // Date et heure de fin de la réservation
    status: "upcoming" | "current" | "completed" | "cancelled"; // Statut de la réservation
}

export const reservations: Reservation[] = [
    {
        id: "res-001",
        car: cars[0],
        agency: agencies.find(agency => agency.city === "Nanterre")!,
        customerName: "Jean Dupont",
        customerContact: "jean.dupont@example.com",
        startDate: new Date("2024-12-28T09:00:00"),
        endDate: new Date("2024-12-28T12:00:00"),
        status: "upcoming",
    },
    {
        id: "res-002",
        car: cars[4],
        agency: agencies.find(agency => agency.city === "Gennevilliers")!,
        customerName: "Marie Curie",
        customerContact: "marie.curie@example.com",
        startDate: new Date("2024-12-25T14:00:00"),
        endDate: new Date("2024-12-25T16:30:00"),
        status: "completed",
    },
    {
        id: "res-003",
        car: cars[8],
        agency: agencies.find(agency => agency.city === "Pau")!,
        customerName: "Albert Einstein",
        customerContact: "albert.einstein@example.com",
        startDate: new Date("2024-12-28T10:00:00"),
        endDate: new Date("2024-12-28T13:00:00"),
        status: "current",
    },
    {
        id: "res-004",
        car: cars[2],
        agency: agencies.find(agency => agency.city === "Nanterre")!,
        customerName: "Isaac Newton",
        customerContact: "isaac.newton@example.com",
        startDate: new Date("2024-12-29T09:30:00"),
        endDate: new Date("2024-12-29T11:30:00"),
        status: "cancelled",
    },
    {
        id: "res-005",
        car: cars[6],
        agency: agencies.find(agency => agency.city === "Avignon")!,
        customerName: "Galileo Galilei",
        customerContact: "galileo.galilei@example.com",
        startDate: new Date("2024-12-31T14:00:00"),
        endDate: new Date("2024-12-31T15:00:00"),
        status: "upcoming",
    },
    {
        id: "res-006",
        car: cars[9],
        agency: agencies.find(agency => agency.city === "Boulogne-sur-mer")!,
        customerName: "Nikola Tesla",
        customerContact: "nikola.tesla@example.com",
        startDate: new Date("2024-12-25T10:30:00"),
        endDate: new Date("2024-12-25T12:00:00"),
        status: "completed",
    },
    {
        id: "res-007",
        car: cars[5],
        agency: agencies.find(agency => agency.city === "Gennevilliers")!,
        customerName: "Ada Lovelace",
        customerContact: "ada.lovelace@example.com",
        startDate: new Date("2024-12-27T11:00:00"),
        endDate: new Date("2024-12-27T14:00:00"),
        status: "current",
    },
    {
        id: "res-008",
        car: cars[7],
        agency: agencies.find(agency => agency.city === "Pau")!,
        customerName: "Alan Turing",
        customerContact: "alan.turing@example.com",
        startDate: new Date("2024-12-30T09:00:00"),
        endDate: new Date("2024-12-30T11:30:00"),
        status: "upcoming",
    }
];
