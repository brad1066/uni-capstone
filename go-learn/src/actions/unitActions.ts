"use server"

import { cookies } from "next/headers"
import { getCurrentUserSession } from "./authActions"
import prisma from "@/lib/db"
import { Unit } from "@prisma/client"

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

    const unit = await prisma.unit.create({ data: { title, description, moduleId } })
    return unit
}