'use server'

import prisma from "@/lib/db"
import { Course, Module, Student, StudentModule, UserRole } from "@prisma/client"
import { cookies } from "next/headers"


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

export async function getStudent(username: string, roles: UserRole[] = []): Promise<(Student & { modules: { module: Module }[] } & { enrolledCourse: Course | null }) | undefined> {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const [session, student] = await prisma.$transaction([
            prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
            prisma.student.findUnique({ where: { username }, include: { modules: { include: { module: true } }, enrolledCourse: true } })
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

export async function addStudentModule(studentId: number, moduleId: number) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
        if (session?.user.role == UserRole.admin) {
            const val = await prisma.studentModule.create({ data: { studentId, moduleId } })
            console.log(val)
        }
    }
}

export async function removeStudentCourse(studentId: number) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
        if (session?.user.role == UserRole.admin) {
            await prisma.student.update({ where: { id: studentId }, data: {courseId: null} })
        }
    }
}

export async function addStudentCourse(studentId: number, courseId: number) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } })
        if (session?.user.role == UserRole.admin) {
            const student = await prisma.student.update({ where: { id: studentId }, data: {courseId} })
            return student
        }
    }
}