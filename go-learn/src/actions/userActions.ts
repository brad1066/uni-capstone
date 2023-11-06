'use server'

import prisma from "@/lib/db"
import { TUser } from "@/lib/types"
import { genRandomPassword } from "@/lib/utils"
import { User, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { env } from "process"

/**
 * Creates a user with a default password
 * @param userInfo A TUser object to create a new user from
 * @returns Promise of a User object (as defined by Prisma)
 */
export async function createUser(userInfo: TUser): Promise<User> {
  const rNum = Math.floor((Math.random()) * 100000)
  let user = await prisma.user.create({
    data: {
      username: `${userInfo.forename?.toLowerCase().charAt(0)}${userInfo.surname?.toLowerCase().charAt(0)}${rNum}`,
      title: userInfo?.title || 'Mr',
      forename: userInfo.forename || '',
      surname: userInfo.surname || '',
      middleNames: userInfo.middleNames || '',
      letters: userInfo.letters || '',
      role: userInfo?.role || 'unassigned',
      password: bcrypt.hashSync(userInfo.password || genRandomPassword(), env.PASSWORD_HASH as string)
    }
  })
  if (userInfo.contactDetails?.email || userInfo.contactDetails?.mobile) {
    const contact = await prisma.contact.create({
      data: {
        label: 'primary',
        email: userInfo?.contactDetails?.email || '',
        mobile: userInfo?.contactDetails?.mobile || '',
      }
    })

    user = await prisma.user.update({
      where: { username: user.username },
      data: { contactId: contact.id },
    })
  }

  if (user.role == 'teacher') {
    await prisma.teacher.create({
      data: { username: user.username },
      select: { user: true }
    }).then(teacher => { user = teacher.user })
  }

  if (user.role == 'student') {
    await prisma.student.create({
      data: { username: user.username },
      select: { user: true }
    }).then(student => { user = student.user })
  }

  return user
}

// GET actions for User[]
export async function getUsers(roles: UserRole[] = []): Promise<TUser[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, users] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.findMany()
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole))
      return users as TUser[]
  }
  return []
}

export async function getUsersByRole(roles: UserRole[] = []) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, admin, teachers, students] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.findMany({
        where: { role: 'admin' },
        take: 5
      }),
      prisma.user.findMany({
        where: { role: 'teacher' },
        take: 5
      }),
      prisma.user.findMany({
        where: { role: 'student' },
        take: 5
      })
    ])
    if (session?.user.role == 'admin') {
      return [...admin, ...teachers, ...students]
    }
  } else return undefined
}

export async function getUser(username: string, roles: UserRole[] = []): Promise<User | undefined> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, user] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.findUnique({ where: { username } })
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole))
      return user as User
  }
  return undefined
}

/**
 * Performs a check on some provided credentials to try and log someone in
 * @param username The provided username to check in the data store
 * @param password The provided password to check in the data store
 * @returns TUser if user is found, otherwise null
 */
export async function checkLoginCredentials(username: string, password: string): Promise<TUser | null> {
  password = await bcrypt.hash(password, env.PASSWORD_HASH as string)
  const user = await prisma.user
    .findFirst({ where: { 'username': username, password } })

  return user as TUser || null

}

export async function updateUser(user: User) {
  if (!user) return
  const resp = await prisma.user.update({ where: { username: user.username }, data: { ...user } })
}

export async function changePassword(username: string, password: string): Promise<User | undefined> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, user] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.update({
        where: { username },
        data: {
          password: bcrypt.hashSync(password, env.PASSWORD_HASH as string)
        }
      })])
    return user
  } else return undefined
}

export async function deleteUser(user: User) {
  const resp = await prisma.user.delete({ where: { username: user.username } })
  return resp
}