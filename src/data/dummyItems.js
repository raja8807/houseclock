export const dummyItems = [
    {
        id: '1',
        name: 'MacBook Pro M3',
        category: 'Electronics',
        purchaseDate: '2025-01-15',
        warrantyDuration: '12 Months',
        returnWindow: '2025-01-29',
        status: 'safe', // safe, warning, urgent
        expiryDate: '2026-01-15',
    },
    {
        id: '2',
        name: 'Dyson Air Purifier',
        category: 'Home Appliances',
        purchaseDate: '2024-11-20',
        warrantyDuration: '24 Months',
        returnWindow: '2024-12-04',
        status: 'safe',
        expiryDate: '2026-11-20',
    },
    {
        id: '3',
        name: 'IKEA Sofa',
        category: 'Furniture',
        purchaseDate: '2023-06-10',
        warrantyDuration: '10 Years',
        returnWindow: 'N/A',
        status: 'safe',
        expiryDate: '2033-06-10',
    },
    {
        id: '4',
        name: 'AirPods Pro',
        category: 'Electronics',
        purchaseDate: '2025-01-10',
        warrantyDuration: '12 Months',
        returnWindow: '2025-01-24',
        status: 'upcoming', // Simulate upcoming expiry or return window close
        expiryDate: '2026-01-10',
    },
    {
        id: '5',
        name: 'Coffee Maker',
        category: 'Kitchen',
        purchaseDate: '2024-01-25',
        warrantyDuration: '12 Months',
        returnWindow: 'Expired',
        status: 'urgent', // Warranty expiring soon
        expiryDate: '2025-01-25',
    },
];
