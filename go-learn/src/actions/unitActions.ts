'use server'

import { cookies } from 'next/headers'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'
import { Unit, UserRole } from '~/prisma/generated/client'

export async function getUnits(moduleId: string = '') {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await getCurrentUserSession()
    if (!session) return []
  }
  if (moduleId != '') return prisma.unit.findMany({ where: { moduleId } })
  return prisma.unit.findMany() ?? []
}

export async function getUnit(unitId: string, extraFields: string[] = []) {
  const authCookie = cookies().get('auth')
  if (!authCookie) return undefined
  const [session, unit] = await prisma.$transaction([
    prisma.userSession.findFirst({ where: { cookieValue: authCookie.value } }),
    prisma.unit.findUnique({
      where: { id: unitId }, include: {
        module: extraFields.includes('module'),
        resources: extraFields.includes('resources'),
        sections: extraFields.includes('sections'),
      }
    })
  ])
  if (!session) return undefined
  return unit ?? undefined
}

export async function updateUnit({ id, title, description }: Unit) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await getCurrentUserSession()
    if (!session || (session.user.role != UserRole.admin && session.user.role != UserRole.teacher)) return null
  }
  return prisma.unit.update({ where: { id }, data: { title, description } }) ?? undefined

}

export async function deleteUnit(id: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await getCurrentUserSession()
    if (!session || session.user.role != UserRole.admin) return null
  }
  return prisma.unit.delete({ where: { id } })
}

export async function createUnit({ title, description = '', moduleId }: Unit) {
  if (!title) return undefined

  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == UserRole.admin || session.user.role == UserRole.teacher)) return undefined

  return await prisma.unit.create({ data: { title, description, moduleId } }) ?? undefined
}