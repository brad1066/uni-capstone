"use server"

import { cookies } from "next/headers"
import { getCurrentUserSession } from "./authActions"
import prisma from "@/lib/db"
import { Unit } from "@prisma/client"

export async function getUnits(moduleId: number = -1) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await getCurrentUserSession()
        if (!session) return []
    }
    if (moduleId != -1) return prisma.unit.findMany({ where: { moduleId } })
    return prisma.unit.findMany() ?? []
}

export async function getUnit(unitId: number, extraFields: string[] = []) {
    const authCookie = cookies().get('auth')
    if (!authCookie) return undefined
    const [session, unit] = await prisma.$transaction([
        prisma.userSession.findFirst({ where: { cookieValue: authCookie.value } }),
        prisma.unit.findUnique({
            where: { id: unitId }, include: {
                module: extraFields.includes('module'),
                resources: extraFields.includes('resources'),
                sections: extraFields.includes('sections'),
            }
        })
    ])
    if (!session) return undefined
    return unit ?? undefined
}

export async function updateUnit({ id, title, description }: Unit) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await getCurrentUserSession()
        if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return null
    }
    return prisma.unit.update({ where: { id }, data: { title, description } }) ?? undefined

}

export async function deleteUnit(id: number) {
    const authCookie = cookies().get('auth')
    if (authCookie) {
        const session = await getCurrentUserSession()
        if (!session || session.user.role != 'admin') return null
    }
    return prisma.unit.delete({ where: { id } })
}

export async function createUnit({ title, description = "", moduleId }: Unit) {
    if (!title) return undefined

    const session = await getCurrentUserSession()
    if (!session || session.user.role != 'admin') return undefined

    return await prisma.unit.create({ data: { title, description, moduleId } }) ?? undefined
}