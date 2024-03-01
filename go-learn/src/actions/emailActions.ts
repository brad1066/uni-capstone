'use server'

import { render } from '@react-email/render'
import { sendEmail } from '../lib/emails'
import { Contact, User, UserVerification } from './../../prisma/generated/client'
import NewUserWelcomeEmail from '../emails/NewUserWelcome'
import PasswordResetEmail from '@/emails/PasswordResetEmail'

export async function sendWelcomeEmail(
  { username, forename, surname }: User,
  { email }: Contact,
  { id: authKey, verificationCode: authVal }: UserVerification
) {
  const resp = await sendEmail({
    to: email ?? '',
    subject: `Welcome to GoLearn ${forename} ${surname}`,
    html: render(NewUserWelcomeEmail({ username, authKey, authVal })),
  })

  if (resp.accepted) {
    return { success: true, message: 'Email sent successfully' }
  } else {
    return { success: false, message: 'Email failed to send' }
  }
}

export async function sendPasswordResetEmail(
  { username }: User,
  { email }: Contact,
  { id: authKey, verificationCode: authVal }: UserVerification
) {
  const resp = await sendEmail({
    to: email ?? '',
    subject: 'Password reset request for GoLearn',
    html: render(PasswordResetEmail({ username, authKey, authVal })),
  })

  if (resp.accepted) {
    return { success: true, message: 'Email sent successfully' }
  } else {
    return { success: false, message: 'Email failed to send' }
  }
  
}