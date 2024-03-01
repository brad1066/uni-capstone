'use server'

import { Contact, UserRole } from '~/prisma/generated/client'
import { getCurrentUserSession } from './authActions'
import prisma from '@/lib/db'

export async function getContact(id: string, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !(session.user.role in roles))) { return null }

  return await prisma.contact.findFirst({
    where: {
      id
    }
  })
}

export async function createContactForUser(contact: Omit<Contact, 'id'>, username?: string, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !(session.user.role in roles))) { return null }
  const newContact = await prisma.contact.create({
    data: {
      email: contact.email,
      label: contact.label ?? 'primary',
      mobile: contact.mobile
    }
  })

  if (newContact && username) {
    await prisma.user.update({ where: { username }, data: { contactId: newContact.id } })
  }

  return newContact
}

export async function updateContact(contact: Contact, roles: UserRole[] = []) {
  const session = await getCurrentUserSession()
  if (!session?.user || (roles.length > 0 && !(session.user.role in roles))) { return null }

  return await prisma.contact.update({
    where: { id: contact.id }, data: {
      ...contact
    }
  })
}