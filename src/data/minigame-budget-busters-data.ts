
export interface BudgetTankConfig {
    id: string;
    label: string;
    amount: number;
    capacity: number;
    color: string;
    category: 'Needs' | 'Wants' | 'Savings';
}

export interface ExpenseConfig {
    name: string;
    amount: number;
}

export interface Level {
    level: number;
    time: number;
    initialBudget: BudgetTankConfig[];
    expense: ExpenseConfig;
}

export const levels: Level[] = [
    {
        level: 1,
        time: 30,
        initialBudget: [
            { id: 'rent', label: 'Rent', amount: 200, capacity: 200, color: '#4A90E2', category: 'Needs' },
            { id: 'groceries', label: 'Groceries', amount: 100, capacity: 100, color: '#4A90E2', category: 'Needs' },
            { id: 'games', label: 'Games', amount: 75, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'snacks', label: 'Snacks', amount: 50, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'clothes', label: 'Clothes', amount: 80, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'emergency', label: 'Emergency Fund', amount: 150, capacity: 200, color: '#50E3C2', category: 'Savings' },
        ],
        expense: { name: 'New School Supplies', amount: 50 }
    },
    {
        level: 2,
        time: 25,
        initialBudget: [
            { id: 'rent', label: 'Rent', amount: 200, capacity: 200, color: '#4A90E2', category: 'Needs' },
            { id: 'transport', label: 'Transport', amount: 75, capacity: 75, color: '#4A90E2', category: 'Needs' },
            { id: 'eating-out', label: 'Eating Out', amount: 60, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'movies', label: 'Movies', amount: 40, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'hobbies', label: 'Hobbies', amount: 50, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'goal', label: 'Car Savings', amount: 100, capacity: 200, color: '#50E3C2', category: 'Savings' },
        ],
        expense: { name: 'Car Tire Repair', amount: 200 }
    },
    {
        level: 3,
        time: 20,
        initialBudget: [
            { id: 'rent', label: 'Rent', amount: 250, capacity: 250, color: '#4A90E2', category: 'Needs' },
            { id: 'phone-bill', label: 'Phone Bill', amount: 50, capacity: 50, color: '#4A90E2', category: 'Needs' },
            { id: 'subscriptions', label: 'Subs', amount: 30, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'shopping', label: 'Shopping', amount: 70, capacity: 100, color: '#F5A623', category: 'Wants' },
            { id: 'emergency', label: 'Emergency Fund', amount: 250, capacity: 400, color: '#50E3C2', category: 'Savings' },
            { id: 'goal', label: 'Trip Savings', amount: 100, capacity: 200, color: '#50E3C2', category: 'Savings' },
        ],
        expense: { name: 'Vet Bill for Your Dog', amount: 400 }
    }
];
