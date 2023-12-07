'use server'

import prisma from "@/lib/db"
import { Module, UserRole } from "@prisma/client"
import { cookies } from "next/headers"
import { getCurrentUserSession } from "./authActions"

export async function getModules(roles: UserRole[] = []): Promise<Module[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, modules] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.module.findMany()
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
      return modules
    }
  }
  return []
}

export async function getModule(id: number, roles: UserRole[] = []): Promise<Module | undefined> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, module] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.module.findUnique({ where: { id } })
    ])
    if ((roles.length == 0 || roles.includes(session?.user.role as UserRole)) && module) {
      return module
    }
  }
  return undefined
}

export async function createModule({ title, description = "", websiteURL = "" }: Module, courseId = -1, roles: UserRole[] = []) {
  if (!title) return undefined

  const session = await getCurrentUserSession()
  if (!session || (roles.length != 0 && !roles.includes(session?.user.role as UserRole))) return undefined

  const [module, course] = await prisma.$transaction([
    prisma.module.create({ data: { title, description, websiteURL } }),
    prisma.course.findFirst({ where: { id: courseId } })
  ])
  if (module && course)
    await prisma.course.update({ where: { id: courseId }, data: { modules: { connect: { id: module.id } } } })
  return module as Module
}

export async function deleteModule(id: number) {
  const session = await getCurrentUserSession()
  if (!session || session.user.role != 'admin') return null

  const deleted = await prisma.module.delete({ where: { id } })

  return deleted
}