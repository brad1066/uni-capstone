import { NextRequest, NextResponse } from "next/server";
import { TUser } from "@/lib/types";
import { CreateUser } from "@/actions/userActions";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
    const user = await CreateUser(await req.json() as TUser)
    return NextResponse.json({ user })
}