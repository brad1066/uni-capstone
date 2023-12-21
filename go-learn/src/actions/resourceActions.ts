'use server'

import { Resource, UserRole } from '@prisma/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'

export async function getResources(username: string = '', roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && (session.user.role in roles))) return undefined

  return await prisma.resource.findMany({ where: { authorUsername: username } })
}

export async function deleteResource(id: number) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.resource.delete({ where: { id } }) ?? undefined
}

export async function createResource({ title, description = '', unitId }: Resource, sectionId?: number) {
  if (!unitId) return undefined

  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  console.log('createResource', { title, description, unitId, sectionId })

  return await prisma.resource.create({
    data: {
      title,
      description,
      content: '',
      authorUsername: session.user.username,
      unitId,
      sections: sectionId ? { connect: { id: sectionId } } : undefined
    }
  }) ?? undefined

}

export async function getUnitResources(unitId: number) {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined


  return unitId ? await prisma.resource.findMany({ where: { unitId } }) : await prisma.resource.findMany()
}
// Here to remove all resources if anything goes wrong while developing. Do not include in production
// export async function removeAllResources() {
//   const session = await getCurrentUserSession()
//   console.log(await prisma.resource.deleteMany())
//   if (!session || session.user.role != 'admin') return undefined
//   return 
// }