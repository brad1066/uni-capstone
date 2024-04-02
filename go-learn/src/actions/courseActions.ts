'use server'

import prisma from '@/lib/db'
import { Course, UserRole } from '~/prisma/generated/client'
import { cookies } from 'next/headers'
import { getCurrentUserSession } from './authActions'

export async function getCourses(roles: UserRole[] = []): Promise<Course[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, courses] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.course.findMany()
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
      return courses
    }
  }
  return []
}

export async function getCourse(id: string, extraFields: string[] = [], roles: UserRole[] = []) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, course] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.course.findUnique({
        where: { id },
        include: {
          modules: extraFields.includes('modules'),
          students: extraFields.includes('students') ? {
            include: {
              user: extraFields.includes('students.user') ? {
                include: {
                  contactDetails: extraFields.includes('students.user.contactDetails') ? true : false
                }
              } : false,

            }
          } : false,
        }
      })
    ])
    if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && course) {
      return course
    }
  }
  return undefined
}

export async function createCourse({ title, description = '', websiteURL = '' }: Course, roles: UserRole[] = []) {
  if (!title) return undefined

  const session = await getCurrentUserSession()
  if (!session || (roles.length != 0 && !roles.includes(session.user?.role as UserRole))) return undefined

  return await prisma.course.create({ data: { title, description, websiteURL } })
}

export async function deleteCourse(id: string) {
  const session = await getCurrentUserSession()
  if (!session || session.user?.role != UserRole.admin) return null

  const deleted = await prisma.course.delete({ where: { id } })

  return deleted
}

export async function removeCourseModule(courseId: string, moduleId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const course = await prisma.course.update({ where: { id: courseId }, data: { modules: { disconnect: { id: moduleId } } }, include: { modules: true } })
      if (course) {
        return course
      }
    }
  }
}

export async function updateCourse(course: Course, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session || (roles.length != 0 && !roles.includes(session.user?.role as UserRole))) return undefined

  return await prisma.course.update({ where: { id: course.id }, data: { ...course } })
}

export async function addCourseModule(courseId: string, moduleId: string) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
    if (session?.user.role == UserRole.admin) {
      const course = await prisma.course.update({ where: { id: courseId }, data: { modules: { connect: { id: moduleId } } }, include: { modules: true } })
      if (course) {
        return course
      }
    }
  }
}