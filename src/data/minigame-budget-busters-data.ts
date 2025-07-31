
export interface Tank {
    id: string;
    label: string;
    amount: number;
    capacity: number;
    color: string;
    isNeeds?: boolean;
    isSavings?: boolean;
    locked?: boolean;
  }
  
  export interface SurpriseExpense {
    description: string;
    cost: number;
  }

  export interface GameConfig {
    timer: number;
    tanks: Tank[];
    surpriseExpenses: SurpriseExpense[];
  }
  
  export const gameConfig: GameConfig = {
    timer: 60, // Longer game time for continuous play
    tanks: [
        { id: 'needs', label: 'Needs', amount: 500, capacity: 500, color: 'bg-red-500', isNeeds: true, locked: false },
        { id: 'wants', label: 'Wants', amount: 300, capacity: 300, color: 'bg-purple-500' },
        { id: 'savings', label: 'Savings', amount: 200, capacity: 200, color: 'bg-blue-500', isSavings: true },
    ],
    surpriseExpenses: [
      {
        description: 'Your phone screen cracked!',
        cost: 150,
      },
      {
        description: 'Emergency vet visit for your dog!',
        cost: 300,
      },
      {
        description: 'Last-minute concert tickets with a friend!',
        cost: 200,
      },
      {
        description: 'Your laptop needs an urgent repair for school!',
        cost: 450,
      },
      {
        description: 'Surprise car trouble! Needs new tires.',
        cost: 600,
      },
      {
        description: 'Your favorite artist dropped new merch!',
        cost: 100,
      },
      {
        description: 'Your friend is raising money for a charity run.',
        cost: 50,
      },
      {
        description: 'The sink in your apartment is leaking and needs a plumber.',
        cost: 250,
      }
    ],
  };
