import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"
import { TUser } from "@/lib/types";

const prisma = new PrismaClient()

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const userInfo = await req.json() as TUser
    // const users = await prisma.user.findMany()
    const user = await prisma.user.create({data: {
        username: `${userInfo.forename?.toLowerCase().charAt(0)}${userInfo.surname?.toLowerCase().charAt(0)}12345`,
        forename: `${userInfo.forename}`,
        surname: `${userInfo.surname}`,
        role: 'teacher',
        title: 'mr',
        password: 'password'
    }})
    console.log(user)
    return NextResponse.json({user})
}