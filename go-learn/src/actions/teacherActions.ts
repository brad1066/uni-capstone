'use server'

import prisma from '@/lib/db'
import { Address, Teacher, UserRole } from '@prisma/client'
import { cookies } from 'next/headers'


export async function getTeachers(roles: UserRole[] = []): Promise<Teacher[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, teachers] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.teacher.findMany()
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
      return teachers
    }
  }
  return []
}

export async function getTeacher(username: string, extraFields: string[] = [], roles: UserRole[] = []): Promise<Teacher & {address: Address | null} | undefined> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, teacher] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.teacher.findUnique({ where: { username }, include: {
        address: extraFields.includes('address'),
      } })
    ])
    if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && teacher) {
      return teacher
    }
  }
  return undefined
}