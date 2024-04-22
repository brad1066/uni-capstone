import { Address, Contact } from '~/prisma/generated/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genRandomPassword() {
  return genRandomString(8)
}

export function genVerificationCode() {
  return genRandomString(16)
}

export function genRandomString(length: number) {
  return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1)
}

export function compareDates(a: Date, b: Date) {
  // Compare the years
  if (a.getFullYear() > b.getFullYear()) return 1
  if (a.getFullYear() < b.getFullYear()) return -1

  // Compare the months
  if (a.getMonth() > b.getMonth()) return 1
  if (a.getMonth() < b.getMonth()) return -1

  // Compare the days
  if (a.getDate() > b.getDate()) return 1
  if (a.getDate() < b.getDate()) return -1

  // The dates are equal
  return 0
}

export const EMPTY_ADDRESS: Address = {
  id: '',
  addressLine1: '',
  addressLine2: '',
  town: '',
  stateCounty: '',
  zipPostCode: ''
}

export const EMPTY_CONTACT: Contact = {
  id: '',
  label: 'primary',
  email: '',
  mobile: ''
}