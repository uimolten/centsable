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
    return Math.floor(number).toString();
  }
  if (number >= 1000 && number < 1000000) {
    return (Math.floor((number / 1000) * 10) / 10).toFixed(1) + 'K';
  }
  if (number >= 1000000 && number < 1000000000) {
    return (Math.floor((number / 1000000) * 10) / 10).toFixed(1) + 'M';
  }
  if (number >= 1000000000) {
    return (Math.floor((number / 1000000000) * 10) / 10).toFixed(1) + 'B';
  }
  return number.toString();
}
