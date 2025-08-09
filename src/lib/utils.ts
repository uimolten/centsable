import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCompactNumber(number: number) {
  if (number === null || number === undefined || isNaN(number)) {
    return '0';
  }
  if (number < 1000) {
    return number.toString();
  }
  const formatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
  });
  return formatter.format(number);
}
