
export interface Tank {
    id: string;
    label: string;
    amount: number;
    capacity: number;
    color: string;
    locked?: boolean;
    isSavings?: boolean;
  }
  
  export interface SurpriseExpense {
    description: string;
    cost: number;
  }
  
  export interface Level {
    level: number;
    initialIncome: number;
    tanks: Tank[];
    surpriseExpense: SurpriseExpense;
    timer: number;
  }
  
  export const levels: Level[] = [
    {
      level: 1,
      initialIncome: 1000,
      tanks: [
        { id: 'needs', label: 'Needs', amount: 500, capacity: 500, color: 'bg-red-500', locked: true },
        { id: 'wants', label: 'Wants', amount: 300, capacity: 300, color: 'bg-purple-500' },
        { id: 'savings', label: 'Savings', amount: 200, capacity: 200, color: 'bg-blue-500', isSavings: true },
      ],
      surpriseExpense: {
        description: 'Your phone screen cracked!',
        cost: 150,
      },
      timer: 30,
    },
    {
      level: 2,
      initialIncome: 1200,
      tanks: [
        { id: 'needs', label: 'Needs', amount: 600, capacity: 600, color: 'bg-red-500', locked: true },
        { id: 'wants_games', label: 'Wants: Games', amount: 150, capacity: 150, color: 'bg-purple-500' },
        { id: 'wants_food', label: 'Wants: Food', amount: 200, capacity: 200, color: 'bg-pink-500' },
        { id: 'savings_emergency', label: 'Savings: Emergency', amount: 250, capacity: 250, color: 'bg-blue-500', isSavings: true },
      ],
      surpriseExpense: {
        description: 'Emergency vet visit for your dog!',
        cost: 300,
      },
      timer: 25,
    },
    {
      level: 3,
      initialIncome: 1500,
      tanks: [
        { id: 'needs', label: 'Needs', amount: 750, capacity: 750, color: 'bg-red-500', locked: true },
        { id: 'wants_clothes', label: 'Wants: Clothes', amount: 250, capacity: 250, color: 'bg-purple-500' },
        { id: 'savings_car', label: 'Savings: Car', amount: 500, capacity: 500, color: 'bg-blue-500', isSavings: true },
      ],
      surpriseExpense: {
        description: 'Last-minute concert tickets with a friend!',
        cost: 200,
      },
      timer: 20,
    },
    {
      level: 4,
      initialIncome: 2000,
      tanks: [
        { id: 'needs', label: 'Needs', amount: 1000, capacity: 1000, color: 'bg-red-500', locked: true },
        { id: 'wants_gadgets', label: 'Wants: Gadgets', amount: 400, capacity: 400, color: 'bg-purple-500' },
        { id: 'wants_vacation', label: 'Wants: Vacation', amount: 200, capacity: 200, color: 'bg-pink-500' },
        { id: 'savings_emergency', label: 'Savings: Emergency', amount: 400, capacity: 400, color: 'bg-blue-500', isSavings: true },
      ],
      surpriseExpense: {
        description: 'Your laptop needs an urgent repair for school!',
        cost: 450,
      },
      timer: 25,
    },
    {
      level: 5,
      initialIncome: 2500,
      tanks: [
        { id: 'needs', label: 'Needs', amount: 1250, capacity: 1250, color: 'bg-red-500', locked: true },
        { id: 'wants_hobbies', label: 'Wants: Hobbies', amount: 500, capacity: 500, color: 'bg-purple-500' },
        { id: 'savings_downpayment', label: 'Savings: House', amount: 750, capacity: 750, color: 'bg-blue-500', isSavings: true },
      ],
      surpriseExpense: {
        description: 'Surprise car trouble! Needs new tires.',
        cost: 600,
      },
      timer: 20,
    }
  ];
  
