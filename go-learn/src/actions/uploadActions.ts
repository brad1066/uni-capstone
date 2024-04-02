'use server'

import { Upload, UserRole } from '~/prisma/generated/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'

export async function getUpload(id: string) {
  const session = await getCurrentUserSession()
  if (!session?.user) return undefined

  return await prisma.upload.findUnique({ where: { id } })
}

export async function getUploads() {
  const session = await getCurrentUserSession()
  if (!session?.user) { return undefined }

  return await prisma.upload.findMany()
}

export async function deleteUpload(id: string) {
  const session = await getCurrentUserSession()
  if (!session || (session.user.role != UserRole.admin && session.user.role != UserRole.teacher)) { return undefined }
  return await prisma.upload.delete({ where: { id } }) ?? undefined
}

export async function createUpload({ title, path, publicURL, resourceId }: Upload) {
  const session = await getCurrentUserSession()
  if (!session) { return undefined }

  return await prisma.upload.create({
    data: {
      title,
      path,
      publicURL,
      resourceId
    }
  }) ?? undefined
}