'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'

export async function createSubmission(uploadId: string, assignmentId: string, title?: string) {
  const session = await getCurrentUserSession()
  if (!session) {return null}

  console.log(title, uploadId, assignmentId, session.user.username)

  return await prisma.submission.create({
    data: {
      title,
      uploadId,
      authorUsername: session.user.username,
      assignmentId
    }
  })
}

export async function deleteSubmission(id: string) {
  const session = await getCurrentUserSession()
  if (!session) {return null}

  const deleted = await prisma.submission.delete({ where: { id } })
  const deletedUpload = await prisma.upload.delete({ where: { id: deleted.uploadId } })

  return {deleted, deletedUpload}
}