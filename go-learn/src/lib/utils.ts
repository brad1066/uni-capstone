import { Address, Contact } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function genRandomPassword() {
  return Math.random().toString(36).slice(-8)
}

export function genVerificationCode() {
  return Math.random().toString(36).slice(-16)
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