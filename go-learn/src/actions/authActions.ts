'use server'

import prisma from '@/lib/db'
import { cookies } from 'next/headers'

export async function getCurrentUserSession() {
  const authCookie = cookies().get('auth')
    
  if (!authCookie) return undefined
  return await prisma.userSession.findFirst({where: {cookieValue: authCookie.value}, select: {user: true}})
}