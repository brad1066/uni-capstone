'use server'

import prisma from '@/lib/db'
import { getCurrentUserSession } from './authActions'
import { Assignment, UserRole } from '@prisma/client'


export async function createAssignment(assignment: Assignment) {
  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == UserRole.admin || session.user.role == UserRole.teacher)) {return null}

  return await prisma.assignment.create({ data: assignment })
}

export async function getAssignment(id: string, extraFields: string[] = [], allowedRoles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session) {return null}
  console.log((allowedRoles.length && !(session.user.role in allowedRoles)))
  console.log(session.user.role), console.log(allowedRoles)
  if (!session || (allowedRoles.length && !(session.user.role in allowedRoles))) {return null}

  return await prisma.assignment.findUnique({
    where: { id },
    include: {
      resources: extraFields.includes('resources'),
      module: extraFields.includes('module'),
      submissions: extraFields.includes('user.submissions') ? {
        where: { authorUsername: session.user.username }
      } : extraFields.includes('submissions')
    }
  })
}

export async function updateAssignment(id: string, assignment: Assignment) {
  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == UserRole.admin || session.user.role == UserRole.teacher)) {return null}

  return await prisma.assignment.update({
    where: { id },
    data: {...assignment}
  })
}

export async function deleteAssignment(id: string) {
  const session = await getCurrentUserSession()
  if (!session || !(session.user.role == UserRole.admin || session.user.role == UserRole.teacher)) {return null}

  return await prisma.assignment.delete({ where: { id } })
}