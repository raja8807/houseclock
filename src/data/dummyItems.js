export const dummyItems = [
    {
        id: '1',
        name: 'Central Air Conditioner',
        category: 'HVAC',
        purchaseDate: '2023-05-10',
        warrantyDuration: 60, // 5 Years
        returnWindow: null,
        // status removed, calculated dynamically
        expiryDate: '2028-05-10',
        maintenanceTasks: [
            {
                id: '101',
                itemId: '1',
                title: 'Replace AC Filter',
                frequency: 'Every 3 Months',
                lastDone: '2025-10-01',
                nextDue: '2026-01-01',
                status: 'urgent',
            },
        ],
    },
    {
        id: '2',
        name: 'Smoke & Carbon Monoxide Alarms',
        category: 'Safety',
        purchaseDate: '2022-08-20',
        warrantyDuration: 120, // 10 Years
        returnWindow: null,
        expiryDate: '2032-08-20',
        maintenanceTasks: [
            {
                id: '102',
                itemId: '2',
                title: 'Test Smoke & CO Alarms',
                frequency: 'Monthly',
                lastDone: '2026-01-01',
                nextDue: '2026-02-01',
                status: 'upcoming',
            },
        ],
    },
    {
        id: '3',
        name: 'Water Heater',
        category: 'Plumbing',
        purchaseDate: '2021-03-15',
        warrantyDuration: 72, // 6 Years
        returnWindow: null,
        expiryDate: '2027-03-15',
        maintenanceTasks: [
            {
                id: '103',
                itemId: '3',
                title: 'Flush Water Heater',
                frequency: 'Yearly',
                lastDone: '2025-02-10',
                nextDue: '2026-02-10',
                status: 'upcoming',
            },
        ],
    },
    {
        id: '4',
        name: 'Clothes Dryer',
        category: 'Appliances',
        purchaseDate: '2024-01-05',
        expiryDate: '2026-01-25',
        warrantyDuration: 24, // 2 Years
        returnWindow: '2024-02-05',
        maintenanceTasks: [
            {
                id: '104',
                itemId: '4',
                title: 'Clean Dryer Vent',
                frequency: 'Every 6 Months',
                lastDone: '2025-08-01',
                nextDue: '2026-02-01',
                status: 'upcoming',
            },
        ],
    },
    {
        id: '5',
        name: 'Refrigerator',
        category: 'Appliances',
        purchaseDate: '2023-11-18',
        warrantyDuration: 36, // 3 Years
        returnWindow: '2023-12-18',
        expiryDate: '2026-11-18',
        maintenanceTasks: [
            {
                id: '105',
                itemId: '5',
                title: 'Replace Refrigerator Water Filter',
                frequency: 'Every 6 Months',
                lastDone: '2025-09-15',
                nextDue: '2026-03-15',
                status: 'upcoming',
            },
        ],
    },
];
