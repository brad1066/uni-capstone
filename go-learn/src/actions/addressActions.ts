"use server"

import prisma from "@/lib/db"
import { Address, UserRole } from "@prisma/client"
import { cookies } from "next/headers"
import { getCurrentUserSession } from "./authActions"

export async function getTeacherAddress(id: number, roles: UserRole[] = []): Promise<Address | undefined> {
  const authCookie = cookies().get('auth')
  if (!authCookie) return
  const [session, teacher] = await prisma.$transaction([
    prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
    prisma.teacher.findFirst({ where: { addressId: id }, include: { address: true } })
  ])
  if (teacher?.address && (roles.length == 0 || roles.includes(session?.user.role as UserRole))) {
    return teacher?.address
  }

  return undefined
}

export async function createTeacherAddress(teacherId: number, address: Address, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) return
  const { id: addressId } = await prisma.address.create({
    data: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      town: address.town,
      stateCounty: address.stateCounty,
      zipPostCode: address.zipPostCode,
    }
  })
  if (!addressId) return
  return await prisma.teacher.update({ where: { id: teacherId }, data: { addressId } })
}

export async function updateAddress(address: Address, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) return

  return await prisma.address.update({ where: { id: address.id }, data: { ...address } })
}

export async function createStudentAddress(studentId: number, address: Address, isHomeAddress: boolean = true, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) return
  const { id: addressId } = await prisma.address.create({
    data: {
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      town: address.town,
      stateCounty: address.stateCounty,
      zipPostCode: address.zipPostCode,
    }
  })
  if (!addressId) return
  let updatedStudent = undefined
  if (isHomeAddress) updatedStudent = await prisma.student.update({ where: { id: studentId }, data: { termAddressId: addressId } })
  else updatedStudent = await prisma.student.update({ where: { id: studentId }, data: { homeAddressId: addressId } })
  return updatedStudent
}

export async function updateAddresses(addresses: Address[], roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !roles.includes(session?.user.role as UserRole))) return

  return prisma.$transaction(async (prisma) => {
    for (const address of addresses) {
      await prisma.address.update({ where: { id: address.id }, data: { ...address } })
    }
  })
}