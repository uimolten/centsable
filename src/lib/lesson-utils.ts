
import type { Unit } from '@/types/learn';

/**
 * Checks if all activities within a given unit are marked as 'completed'.
 * @param unit The learning unit to check.
 * @returns `true` if all activities in the unit are completed, otherwise `false`.
 */
export function isUnitCompleted(unit: Unit): boolean {
  if (!unit || !unit.activities || unit.activities.length === 0) {
    return false;
  }
  return unit.activities.every(activity => activity.state === 'completed');
}
