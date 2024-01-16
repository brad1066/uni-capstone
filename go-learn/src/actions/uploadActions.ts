'use server'

import { Upload } from '@prisma/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'

export async function getUpload(id: string) {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined

  return await prisma.upload.findUnique({ where: { id } })
}

export async function getUploads() {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined

  return await prisma.upload.findMany()
}

export async function deleteUpload(id: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
  return await prisma.upload.delete({ where: { id } }) ?? undefined
}

export async function createUpload({ title, path, publicURL, resourceId }: Upload) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

  return await prisma.upload.create({
    data: {
      title,
      path,
      publicURL,
      resourceId
    }
  }) ?? undefined
}