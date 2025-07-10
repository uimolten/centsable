
interface GameItem {
  id: number;
  text: string;
  category: 'Need' | 'Want';
}

export const savingsSorterItems: GameItem[] = [
  { id: 1, text: 'Groceries', category: 'Need' },
  { id: 2, text: 'Video Game', category: 'Want' },
  { id: 3, text: 'Rent/Mortgage Payment', category: 'Need' },
  { id: 4, text: 'Concert Tickets', category: 'Want' },
  { id: 5, text: 'Utility Bill', category: 'Need' },
  { id: 6, text: 'Designer Hoodie', category: 'Want' },
  { id: 7, text: 'Gas for Car', category: 'Need' },
  { id: 8, text: 'Boba Tea', category: 'Want' },
  { id: 9, text: 'Phone Bill', category: 'Need' },
  { id: 10, text: 'Netflix Subscription', category: 'Want' },
  { id: 11, text: 'Prescription Medicine', category: 'Need' },
  { id: 12, text: 'Eating Out at a Restaurant', category: 'Want' },
  { id: 13, text: 'Car Insurance', category: 'Need' },
  { id: 14, text: 'New Phone Case', category: 'Want' },
  { id: 15, text: 'Public Transport Pass', category: 'Need' },
  { id: 16, text: 'Impulse Buy at Checkout', category: 'Want' },
  { id: 17, text: 'Childcare', category: 'Need' },
  { id: 18, text: 'Movie Tickets', category: 'Want' },
  { id: 19, text: 'Basic Clothing', category: 'Need' },
  { id: 20, text: 'A Second Game Console', category: 'Want' },
];
