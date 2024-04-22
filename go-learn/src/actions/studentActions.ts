'use server'

import prisma from '@/lib/db'
import { Address, Course, Module, Student, UserRole } from '~/prisma/generated/client'
import { cookies } from 'next/headers'


export async function getStudents(roles: UserRole[] = []): Promise<Student[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, students] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.student.findMany({ include: { modules: true } })
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
      return students
    }
  }
  return []
}

export async function getStudent(username: string, extraFields: string[] = [], roles: UserRole[] = []): Promise<Student & {
  homeAddress?: Address | null
  termAddress?: Address | null,
  modules?: Module[] | null,
  enrolledCourse?: Course | null
} | undefined> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const yesterday: Date = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)
    const [session, student] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.student.findUnique({
        where: { username },
        include: {
          modules: extraFields.includes('modules') || extraFields.includes('assignmentsDue') ? {
            include: {
              assignments: extraFields.includes('assignmentsDue') ? {
                where: { dueDate: { gt: yesterday } }, // Only get assignments due after yesterday (checking for > today was inconsistent between deployed and local environments)
                orderBy: { dueDate: 'asc' },
              }: false
            }
          } : false,
          homeAddress: extraFields.includes('homeAddress'),
          termAddress: extraFields.includes('termAddress'),
          enrolledCourse: extraFields.includes('enrolledCourse'),
          emergencyContact: extraFields.includes('emergencyContact'),
        }
      })
    ])
    if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && student) {
      return student
    }
  }
  return undefined
}


export async function removeStudentModule(studentId: string, moduleId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const student = await prisma.student.update({ where: { id: studentId }, data: { modules: { disconnect: { id: moduleId } } }, include: { modules: true } })
      if (student) {
        return student
      }
    }
  }
}

export async function addStudentModule(studentId: string, moduleId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const student = await prisma.student.update({ where: { id: studentId }, data: { modules: { connect: { id: moduleId } } }, include: { modules: true } })
      if (student) {
        return student
      }
    }
  }
}

export async function removeStudentCourse(studentId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const student = await prisma.student.update({ where: { id: studentId }, data: { courseId: null }, include: { enrolledCourse: true } })
      if (student) {
        return student
      }
    }
  }
}

export async function addStudentCourse(studentId: string, courseId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const student = await prisma.student.update({ where: { id: studentId }, data: { courseId }, include: { enrolledCourse: true } })
      if (student) {
        return student
      }
    }
  }
}