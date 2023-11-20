'use server'

import prisma from "@/lib/db"
import { TCourse } from "@/lib/types"
import { Course, UserRole } from "@prisma/client"
import { cookies } from "next/headers"

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

export async function createCourse({title, description, websiteURL}: TCourse, roles: UserRole[] = []) {
    if (!title || !description || !websiteURL) return undefined
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, course] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.course.create({ data: {title, description, websiteURL}  })
        ])
        if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && course) {
            return course as TCourse
        }
    }
    return undefined
}