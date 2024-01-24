'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'

export async function deleteAssignment(id: string) {
  const session = await getCurrentUserSession()
  if (!session || session.user.role != 'admin') return null

  const deleted = await prisma.assignment.delete({ where: { id } })

  return deleted
}