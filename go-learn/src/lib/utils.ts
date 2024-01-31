import { Address, Contact } from '@prisma/client'
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