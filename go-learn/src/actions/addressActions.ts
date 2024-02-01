'use server'

import prisma from '@/lib/db'
import { Address, UserRole } from '@prisma/client'
import { getCurrentUserSession } from './authActions'

export async function createTeacherAddress(teacherId: string, address: Address, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) { return undefined }
  const newAddress = await prisma.address.create({
    data: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      town: address.town,
      stateCounty: address.stateCounty,
      zipPostCode: address.zipPostCode,
    }
  })
  const addressId = newAddress?.id
  if (!addressId) { return undefined }
  return await prisma.teacher.update({ where: { id: teacherId }, data: { address: {connect: {id: addressId}}}})
}

export async function createStudentAddress(studentId: string, address: Address, isHomeAddress: boolean = true, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) { return undefined }
  const newAddress = await prisma.address.create({
    data: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      town: address.town,
      stateCounty: address.stateCounty,
      zipPostCode: address.zipPostCode,
    }
  })
  const addressId = newAddress?.id
  if (!addressId) { return undefined }
  let updatedStudent = undefined
  if (isHomeAddress) {
    updatedStudent = await prisma.student.update({ where: { id: studentId }, data: { homeAddress: {connect: {id: addressId}} } })
  } else {
    updatedStudent = await prisma.student.update({ where: { id: studentId }, data: { termAddress: {connect: {id:addressId}} } })
  }
  return updatedStudent
}

export async function updateAddress(address: Address, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) { return undefined }

  return await prisma.address.update({ where: { id: address.id }, data: { ...address } })
}

export async function updateAddresses(addresses: Address[], roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) { return undefined }

  return await prisma.$transaction(async (prisma) => {
    for (const address of addresses) {
      prisma.address.update({ where: { id: address.id }, data: { ...address } })
    }
  })
}