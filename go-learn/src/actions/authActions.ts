'use server'

import prisma from '@/lib/db'
import { cookies } from 'next/headers'
import { sendPasswordResetEmail } from './emailActions'
import { genVerificationCode } from '@/lib/utils'

export async function getCurrentUserSession() {
  const authCookie = cookies().get('auth')
    
  if (!authCookie) { return undefined }
  return await prisma.userSession.findFirst({where: {cookieValue: authCookie.value}, select: {user: true}})
}

export async function requestUserPasswordChange(username:string) {
  const user = await prisma.user.findUnique({where: {username}, include: {contactDetails: true}})
  console.log(user)
  if (!user) { return false }
  const verification = await prisma.userVerification.create({
    data: {
      username: user.username,
      verificationCode: genVerificationCode(),
    }
  })

  if (!(user.contactDetails && user.contactDetails.email)) { return false }

  return await sendPasswordResetEmail(user, user.contactDetails, verification)
}