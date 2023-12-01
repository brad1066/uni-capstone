'use server'

import prisma from "@/lib/db"
import { Module, Student, StudentModule, UserRole } from "@prisma/client"
import { cookies } from "next/headers"


export async function getStudents(roles: UserRole[] = []): Promise<Student[]> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, students] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findMany({include: {modules: true}})
        ])
        if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
            return students
        }
    }
    return []
}

export async function getStudent(username: string, roles: UserRole[] = []) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, student] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findUnique({ where: { username }, include: {modules: {include: {module: true}}} })
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
            const val = await prisma.studentModule.delete({ where: { studentId_moduleId: { studentId, moduleId } } })
            console.log(val)
        }
    }
}