'use server'

import prisma from '@/lib/db'
import { genRandomPassword, genVerificationCode } from '@/lib/utils'
import { Contact, User, UserRole } from '~/prisma/generated/client'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { getCurrentUserSession } from './authActions'
import { createContactForUser } from './contactActions'
import { sendWelcomeEmail } from './emailActions'

/**
 * Creates a user with a default password
 * @param userInfo A TUser object to create a new user from
 * @returns Promise of a User object (as defined by Prisma)
 */

export async function createUser(userInfo: User & { contactDetails?: Contact }){
  const session = await getCurrentUserSession()
  if (!session || session.user.role != UserRole.admin) { return undefined }
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
      password: await bcrypt.hash(userInfo.password || genRandomPassword(), 10)
    }
  })
  if (userInfo.contactDetails?.email || userInfo.contactDetails?.mobile) {
    const contact = await createContactForUser({
      label: 'primary',
      email: userInfo?.contactDetails?.email || '',
      mobile: userInfo?.contactDetails?.mobile || '',
    }, user.username)
    if (contact) {
      user = await prisma.user.update({
        where: { username: user.username },
        data: { contactId: contact.id },
      })
    }
  }

  if (user?.role == UserRole.teacher) {
    await prisma.teacher.create({
      data: { username: user.username },
      select: { user: true }
    }).then(teacher => { user = teacher.user })
  }

  if (user?.role == UserRole.student) {
    await prisma.student.create({
      data: { username: user.username },
      select: { user: true }
    }).then(student => { user = student.user })
  }

  if (userInfo?.contactDetails) {
    const verification = await prisma.userVerification.create({
      data: {
        username: user.username,
        verificationCode: genVerificationCode(),
      }
    })
    await sendWelcomeEmail(user, userInfo.contactDetails, verification).catch(e => console.error(e))
  }
  return user
}

// GET actions for User[]
export async function getUsers(roles: UserRole[] = []): Promise<User[]> {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, users] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.findMany()
    ])
    if (roles.length == 0 || roles.includes(session?.user.role as UserRole)) {
      return users as User[] 
    }
  }
  return []
}

export async function getUsersByRole(roles: UserRole[] = []) {
  const authCookie = cookies().get('auth')

  const [session, admin, teachers, students] = await prisma.$transaction([
    prisma.userSession.findFirst({ where: { cookieValue: authCookie?.value }, select: { user: true } }),
    prisma.user.findMany({
      where: { role: UserRole.admin },
      take: 5
    }),
    prisma.user.findMany({
      where: { role: UserRole.teacher },
      take: 5
    }),
    prisma.user.findMany({
      where: { role: UserRole.student },
      take: 5
    })
  ])
  if (!session) { return [] }

  const users: User[] = []
  if (roles.length == 0) { return [...admin, ...teachers, ...students] }
  if (roles.includes(UserRole.admin)) { users.push(...admin) }
  if (roles.includes(UserRole.teacher)) { users.push(...teachers) }
  if (roles.includes(UserRole.student)) { users.push(...students) }
  return users
}

export async function getUser(username: string, extraFields: string[] = [], roles: UserRole[] = []) {
  const authCookie = cookies().get('auth')
  if (authCookie) {
    const [session, user] = await prisma.$transaction([
      prisma.userSession.findFirst({ where: { cookieValue: authCookie.value }, select: { user: true } }),
      prisma.user.findUnique({
        where: { username }, include: {
          contactDetails: extraFields.includes('contactDetails'),
        }
      })
    ])
    if (roles.length == 0 || roles.includes(session?.user?.role as UserRole)) {
      return user
    }
  }
  return undefined
}

/**
 * Performs a check on some provided credentials to try and log someone in
 * @param username The provided username to check in the data store
 * @param password The provided password to check in the data store
 * @returns User if user is found, otherwise null
 */
export async function checkLoginCredentials(username: string, password: string) {
  const user = await prisma.user.findFirst({ where: { 'username': username } })

  if (user && await bcrypt.compare(password, user.password)) {
    return user
  }
}

export async function updateUser({ username, forename, middleNames, surname, title, letters }: User) {
  if (!username) { return null }
  const session = await getCurrentUserSession()
  if (!(session?.user?.username == username || session?.user?.role == UserRole.admin)) { return null }
  return await prisma.user.update({ where: { username }, data: { forename, middleNames, surname, title, letters } })
}

export async function changePassword(username: string, password: string) {
  const session = await getCurrentUserSession()
  if (!(session?.user?.username == username || session?.user?.role == UserRole.admin)) { return null }

  return prisma.user.update({
    where: { username },
    data: {
      password: await bcrypt.hash(password, 10)
    }
  })
}

export async function deleteUser(username: string) {
  const session = await getCurrentUserSession()
  if (!(session?.user?.role == UserRole.admin)) { return undefined }

  return await prisma.$transaction([
    prisma.userSession.deleteMany({ where: { username} }),
    prisma.user.delete({ where: { username } })
  ])
}

export async function updatePasswordWithCode(authKey: string, authVal: string, password: string) {
  const resp = await prisma.userVerification.update({
    where: { id: authKey, verificationCode: authVal, used: false },
    data: { used: true }
  }).catch(() => false)

  if (typeof resp === 'boolean') {
    return { success: false, message: 'Invalid verification code'}
  }
  const updatedUser = await prisma.user.update({
    where: { username: resp.username },
    data: {
      password: await bcrypt.hash(password, 10)
    }
  }).catch(() => false)

  if (!updatedUser) {
    return { success: false, message: 'Failed to update password'}
  }

  return { success: true, message: 'Password updated successfully' }
}

// export async function createAdminUser() {
//   const session = await getCurrentUserSession()
//   // if (!(session?.user?.role == UserRole.admin)) { return undefined }

//   return await prisma.user.create({
//     data: {
//       username: 'bradmin',
//       title: 'Mr',
//       forename: 'Bradley',
//       surname: 'Hastings',
//       role: UserRole.admin,
//       password: await bcrypt.hash('changeme', 10),
//       contactDetails: {
//         create: {
//           email: 'bradleybeasley2000@gmail.com',
//           mobile: '07712345678',
//           label: 'primary'
//         }
//       }
//     }
//   })
// }