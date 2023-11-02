import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { TUser } from "@/lib/types";
import bcrypt from "bcrypt"
import {env} from 'node:process'


export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const prisma = new PrismaClient()
    const userInfo = await req.json() as TUser
    const rNum = Math.floor((Math.random()) * 100000)
    let user = await prisma.user.create({
        data: {
            username: `${userInfo.forename?.toLowerCase().charAt(0)}${userInfo.surname?.toLowerCase().charAt(0)}${rNum}`,
            title: userInfo?.role || 'Mr',
            forename: userInfo.forename || '',
            surname: userInfo.surname || '',
            middleNames: userInfo.middleNames || '',
            letters: userInfo.letters || '',
            role: userInfo?.role || 'unassigned',
            password: bcrypt.hashSync(userInfo.password || '', env.PASSWORD_HASH as string)
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
            where: {
                username: user.username
            },
            data: {
                contactId: contact.id
            }
        })

    }
    console.log(user)
    return NextResponse.json({ user })
}