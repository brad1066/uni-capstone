'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'

export async function deleteSubmission(id: string) {
  const session = await getCurrentUserSession()
  if (!session) return null

  const deleted = await prisma.submission.delete({ where: { id } })
  const deletedUpload = await prisma.upload.delete({ where: { id: deleted.uploadId } })

  return {deleted, deletedUpload}
}