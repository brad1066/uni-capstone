'use server'

import prisma from "@/lib/db"
import { TUser } from "@/lib/types"
import bcrypt from "bcrypt"
import { env } from "process"

export async function CreateUser(userInfo: TUser): Promise<TUser> {

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
            password: bcrypt.hashSync(userInfo.password || 'changeme', env.PASSWORD_HASH as string)
        }
    })
    if (userInfo.contactDetails?.email || userInfo.contactDetails?.mobile) {
        const contact = await prisma.contact.create({
            data: {
                label: 'primary',
                email: userInfo?.contactDetails?.email || '',
                mobile: userInfo?.contactDetails?.mobile || ''
            }
        })

        user = await prisma.user.update({
            where: {  username: user.username },
            data: { contactId: contact.id }
        })
    }

    return user as TUser
}