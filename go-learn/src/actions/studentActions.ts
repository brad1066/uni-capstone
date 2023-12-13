'use server'

import prisma from '@/lib/db'
import { Address, Course, Module, Student, UserRole } from '@prisma/client'
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
    const [session, student] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.student.findUnique({
        where: { username }, include: {
          modules: extraFields.includes('modules'),
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

export async function removeStudentModule(studentId: number, moduleId: number) {
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

export async function addStudentModule(studentId: number, moduleId: number) {
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

export async function removeStudentCourse(studentId: number) {
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

export async function addStudentCourse(studentId: number, courseId: number) {
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