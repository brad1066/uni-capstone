'use server'

import prisma from "@/lib/db"
import { TCourse } from "@/lib/types"
import { Course, UserRole } from "@prisma/client"
import { cookies } from "next/headers"
import { getCurrentUserSession } from "./authActions"

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

export async function getCourse(id: number, roles: UserRole[] = []): Promise<Course | undefined> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, course] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.course.findUnique({ where: { id } })
        ])
        if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && course) {
            return course
        }
    }
    return undefined
}

export async function createCourse({title, description="", websiteURL=""}: TCourse, roles: UserRole[] = []) {
    if (!title) return undefined
    
    const session = await getCurrentUserSession()
    if (!session || (roles.length != 0 && !roles.includes(session.user?.role as UserRole))) return undefined

    return await prisma.course.create({ data: {title, description, websiteURL}  })
}

export async function deleteCourse(id: number) {
    const session = await getCurrentUserSession()
    if (!session || session.user?.role != 'admin') return null

    const deleted = await prisma.course.delete({where: {id}})

    return deleted
}