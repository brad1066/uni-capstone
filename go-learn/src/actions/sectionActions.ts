'use server'

import { Section } from './../../prisma/generated/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'
import { cookies } from 'next/headers'

export async function createSection({ title, description = '', unitId }: Section) {
  if (!title) return undefined

  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.section.create({ data: { title, description, unitId } }) ?? undefined
}

export async function deleteSection(id: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.section.delete({ where: { id } }) ?? undefined
}

export async function getSection(id: string, extraFields: string[] = []) {
  const authCookie = cookies().get('auth')
  if (!authCookie) return undefined
  const [session, section] = await prisma.$transaction([
    prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, include: { user: true } }),
    prisma.section.findUnique({
      where: { id }, include: {
        unit: extraFields.includes('unit') ?? false,
        resources: extraFields.includes('resources') ?? false,
      }
    })
  ])
  if (!session || !section) return undefined

  if (session.user.role == 'admin' || session.user.role == 'teacher') return section
  else return undefined
}

export async function updateSection({ id, title, description }: Section) {
  if (!title || !id) return undefined

  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.section.update({ where: { id }, data: { title, description } }) ?? undefined
}

export async function updateSectionAddResource(sectionId: string, resourceId: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.section.update({ where: { id: sectionId }, data: { resources: { connect: { id: resourceId } } } }) ?? undefined
}

export async function updateSectionRemoveResource(sectionId: string, resourceId: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.section.update({ where: { id: sectionId }, data: { resources: { disconnect: { id: resourceId } } } }) ?? undefined
}