import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getVersion = () => {
  return "/api/v1";
}

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const formatDateAsString = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-11, so add 1
  const day = String(date.getDate()).padStart(2, '0'); // getDate() returns the day of the month
  const year = date.getFullYear(); // getFullYear() returns the 4-digit year
  
  return `${month}/${day}/${year}`;
}

export const formatCurrency = (amount: number): string => {
  // Ensure amount is a number and format it to include commas
  const formattedAmount = amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });

  // Return the formatted string with peso symbol
  return `₱ ${formattedAmount}`;
}