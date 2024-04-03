'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'

export async function createSubmission(uploadId: string, assignmentId: string, title?: string) {
  const session = await getCurrentUserSession()
  if (!session) { return null }

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
  if (!session) { return null }

  const deleted = await prisma.submission.delete({ where: { id } })
  const deletedUpload = await prisma.upload.delete({ where: { id: deleted.uploadId } })

  return {deleted, deletedUpload}
}

export async function getSubmission(submissionId: string) {
  return await prisma.submission.findUnique({
    where: { id: submissionId },
    include: { upload: true }
  })
}

export async function getSubmissions(assignmentId?: string) {
  return await prisma.submission.findMany({
    where: { assignmentId },
    include: { upload: true }
  })
}