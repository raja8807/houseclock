import { dummyItems } from '../data/dummyItems';

// In-memory data store
let items = [...dummyItems];

const SIMULATED_DELAY = 500; // ms
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
    // --- ITEMS ---
    fetchItems: async () => {
        await delay(SIMULATED_DELAY);
        return [...items];
    },

    addItem: async (newItem) => {
        await delay(SIMULATED_DELAY);
        const item = {
            id: Math.random().toString(36).substr(2, 9),
            status: 'safe',
            maintenanceTasks: [],
            ...newItem,
        };
        items = [item, ...items];
        return item;
    },

    deleteItem: async (itemId) => {
        await delay(SIMULATED_DELAY);
        items = items.filter((i) => i.id !== itemId);
        return itemId;
    },

    updateItem: async (updatedItem) => {
        await delay(SIMULATED_DELAY);
        items = items.map((i) => (i.id === updatedItem.id ? { ...i, ...updatedItem } : i));
        return updatedItem;
    },

    // --- MAINTENANCE (Nested in Items) ---
    // No fetchMaintenance needed, it's part of fetchItems now

    addMaintenance: async (newTask) => {
        await delay(SIMULATED_DELAY);

        const task = {
            id: Math.random().toString(36).substr(2, 9),
            status: 'upcoming',
            ...newTask,
        };

        // Find the item and add the task to it
        items = items.map(item => {
            if (item.id === task.itemId) {
                return {
                    ...item,
                    maintenanceTasks: [task, ...item.maintenanceTasks]
                };
            }
            return item;
        });

        return task;
    },

    deleteMaintenance: async ({ itemId, taskId }) => {
        await delay(SIMULATED_DELAY);
        items = items.map(item => {
            if (item.id === itemId) {
                return {
                    ...item,
                    maintenanceTasks: item.maintenanceTasks.filter(t => t.id !== taskId)
                };
            }
            return item;
        });
        return { itemId, taskId };
    },

    updateMaintenance: async (updatedTask) => {
        await delay(SIMULATED_DELAY);
        items = items.map(item => {
            if (item.id === updatedTask.itemId) {
                return {
                    ...item,
                    maintenanceTasks: item.maintenanceTasks.map(t =>
                        t.id === updatedTask.id ? updatedTask : t
                    )
                };
            }
            return item;
        });
        return updatedTask;
    },
};
