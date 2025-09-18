import { units, DEV_MODE_UNLOCK_ALL } from './learn-data';

describe('learn-data', () => {
  it('should have DEV_MODE_UNLOCK_ALL set to false', () => {
    expect(DEV_MODE_UNLOCK_ALL).toBe(false);
  });

  it('should have the correct initial state for activities', () => {
    // The first activity of the first unit should be active
    expect(units[0].activities[0].state).toBe('active');

    // All other activities in the first unit should be locked
    for (let i = 1; i < units[0].activities.length; i++) {
      expect(units[0].activities[i].state).toBe('locked');
    }

    // All activities in other units should be locked
    for (let i = 1; i < units.length; i++) {
      for (let j = 0; j < units[i].activities.length; j++) {
        expect(units[i].activities[j].state).toBe('locked');
      }
    }
  });
});
