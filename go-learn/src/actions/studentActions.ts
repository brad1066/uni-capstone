'use server'

import prisma from "@/lib/db"
import { Student, UserRole } from "@prisma/client"
import { cookies } from "next/headers"


export async function getStudents(roles: UserRole[] = []): Promise<Student[]> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, students] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findMany()
        ])
        if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
            return students
        }
    }
    return []
}

export async function getStudent(username: string, roles: UserRole[] = []): Promise<Student | undefined> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, student] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findUnique({ where: { username } })
        ])
        if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && student) {
            return student as Student
        }
    }
    return undefined
}