'use server'

import { Resource, UserRole } from '~/prisma/generated/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'


export async function getResource(id: string, extraFields: string[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined

  const resource = await prisma.resource.findUnique({
    where: { id }, include: {
      sections: extraFields.includes('sections') ?? false,
      unit: extraFields.includes('unit') ?? false,
      author: extraFields.includes('author') ?? false,
      uploads: extraFields.includes('uploads') ?? false,
    }
  })

  if (!resource) return undefined
  return resource
}

export async function getResources(username: string = '',roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && (session.user.role in roles))) return undefined

  return await prisma.resource.findMany({ where: { authorUsername: username } })
}

export async function deleteResource(id: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.resource.delete({ where: { id } }) ?? undefined
}

export async function createResource({ title, description = '', unitId }: Resource, sectionId?: string, assignmentId?: string) {
  if (!unitId && !sectionId && !assignmentId) return undefined

  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.resource.create({
    data: {
      title,
      description,
      content: '',
      author: { connect: { username: session.user.username } },
      unit: unitId ? { connect: { id: unitId } } : undefined,
      sections: sectionId ? { connect: { id: sectionId } } : undefined,
      assignments: assignmentId ? { connect: { id: assignmentId } } : undefined
    }
  }) ?? undefined

}

export async function getUnitResources(unitId: string) {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined


  return unitId ? await prisma.resource.findMany({ where: { unitId } }) : await prisma.resource.findMany()
}

export async function updateResource(id: string, { title, description, content }: Resource) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.resource.update({ where: { id }, data: { title, description, content } }) ?? undefined
}

export async function updateResourceRemoveSection(id: string, sectionId: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.resource.update({ where: { id }, data: { sections: { disconnect: { id: sectionId } } } }) ?? undefined
}

// Here to remove all resources if anything goes wrong while developing. Do not include in production
// export async function removeAllResources() {
//   const session = await getCurrentUserSession()
//   await prisma.resource.deleteMany()
//   if (!session || session.user.role != 'admin') return undefined
//   return 
// }