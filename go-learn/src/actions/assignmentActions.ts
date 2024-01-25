'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'
import { Assignment } from '@prisma/client'


export async function createAssignment(assignment: Assignment) {
  const session = await getCurrentUserSession()
  if (!session || session.user.role != 'admin') return null

  const created = await prisma.assignment.create({ data: assignment })

  return created
}

export async function getAssignment(id: string, extraFields: string[] = []) {
  const session = await getCurrentUserSession()
  if (!session) return null

  const assignment = await prisma.assignment.findUnique({
    where: { id },
    include: {
      resources: extraFields.includes('resources'),
      module: extraFields.includes('module'),
      submissions: extraFields.includes('user.submissions') ? {
        where: { authorUsername: session.user.username }
      } : undefined,
    }
  })

  return assignment
}

export async function updateAssignment(id: string, assignment: Assignment) {
  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == 'admin' || session.user.role == 'teacher')) return null

  const updated = await prisma.assignment.update({
    where: { id },
    data: {...assignment}
  })

  return updated
}

export async function deleteAssignment(id: string) {
  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == 'admin' || session.user.role == 'teacher')) return null

  const deleted = await prisma.assignment.delete({ where: { id } })

  return deleted
}