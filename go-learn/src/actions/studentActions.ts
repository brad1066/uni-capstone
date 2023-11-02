'use server'

import prisma from "@/lib/db"
import { TStudent } from "@/lib/types"
import { UserRole } from "@prisma/client"
import { cookies } from "next/headers"


export async function getStudents(roles: UserRole[] = []): Promise<TStudent[]> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, students] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findMany()
        ])
        if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
            return students as TStudent[]
        }
    }
    return []
}

export async function getStudent(username: string, roles: UserRole[] = []): Promise<TStudent | undefined> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, student] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findUnique({ where: { username } })
        ])
        if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && student) {
            return student as TStudent
        }
    }
    return undefined
}