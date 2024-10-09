/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios, { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx"
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getVersion = () => {
  return "/api/v1";
}

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

export const formatReleaseStatus = (status: number): string => {
  let finalStatus = '';
  switch (status) {
    case 0: 
      finalStatus = 'Pending';
      break;
    case 1:
      finalStatus = 'Shipped';
      break;
    case 2:
      finalStatus = 'Received';
      break;
    case 3: 
      finalStatus = 'Completed';
      break;
    default:
      finalStatus = '';
      break;
  }
  return finalStatus;
}

interface FetchDataParams {
  url: string;
  query?: Record<string, unknown>; // Renamed from `params` to `query`
  onSuccess: (data: any) => void;
  onError?: (error: AxiosError) => void;
  dispatch?: (action: unknown) => void;
  logout?: () => void;
}

export async function fetchData({
  url,
  query,
  onSuccess,
  dispatch,
  logout
}: FetchDataParams) {
  try {
    const response = await axios.get(url, {
      params: query // Use `params` for query parameters
    });
    if (response.status >= 200 && response.status < 300) {
      onSuccess(response.data);
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if ((err.response?.status || 0) >= 440) {
        toast.error(err.response?.data?.message || 'Session Expired');
        setTimeout(() => {
          if (dispatch && logout) {
            dispatch(logout());
          }
        }, 700);
      } else {
        toast.error(err.response?.data?.message || 'Something went wrong');
      }
    } else {
      toast.error('An unexpected error occurred');
    }
  }
}

export function formatReference(number: number): string {
  const maxDigits = 8; // Target length for formatting
  const numberString = number.toString();

  // If the number is less than 8 digits, pad with leading zeros
  if (numberString.length < maxDigits) {
    return numberString.padStart(maxDigits, '0');
  }

  // If the number has 8 or more digits, return it as is
  return numberString;
}

export const getActiveStatus = (obj: any) => {
  if (!obj) return false;
  const today = new Date();
  const effectiveTo = new Date(obj.effective_to);

  // Check if the current date is less than or equal to effective_to
  return today <= effectiveTo;
};