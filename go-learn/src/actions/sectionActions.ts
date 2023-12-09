'use server'

import { Section } from "@prisma/client"
import { getCurrentUserSession } from "./authActions"
import prisma from "@/lib/db"

export async function createSection({ title, description = "", unitId }: Section) {
    if (!title) return undefined

    const session = await getCurrentUserSession()
    if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined

    return await prisma.section.create({ data: { title, description, unitId } }) ?? undefined
}

export async function deleteSection(id: number) {
    const session = await getCurrentUserSession()
    if (!session || (session.user.role != 'admin' && session.user.role != 'teacher')) return undefined
    return await prisma.section.delete({ where: { id } }) ?? undefined
}