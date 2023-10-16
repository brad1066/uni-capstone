import { TUser } from "@/lib/types"
import users, { adminUser } from '@/dummy-data/users'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { NextApiResponse } from "next"

export type TLoginSuccessResponse = {
  success: true,
  user: TUser
}

export type TLoginErrorResponse = {
  success: false,
  message: string
}
/**
 * Performs a check on some provided credentials to try and log someone in
 * @param username The provided username to check in the data store
 * @param password The provided password to check in the data store
 * @returns TUser if user is found, otherwise null
 */
export async function checkLoginCredentials(username: string, password: string)//: Promise<TUser | null>
{
  // Stand-in function to allow async check of hashed variables. This can be optimised later
  async function filter(arr: TUser[], callback: (user: TUser) => Promise<boolean>) {
    return (await Promise.all(arr.map(async item => (await callback(item)) ? item : null))).filter(i => i !== null)
  }
  // TODO: replace use of dummy data and check with database check and suitable handling of response

  const results = await filter(users, async (user) => user.username == username && await bcrypt.compare(password, user.password as string))

  return (results.length == 1) ? { ...results[0] } : null

}

export const POST = async (req: Request): Promise<NextResponse> => {
  const { username, password, rememberMe } = await req.json()

  const checkResponse = await checkLoginCredentials(username, password)

  if (checkResponse) {
    delete checkResponse.password
    const res = NextResponse.json({
      success: true,
      user: checkResponse
    })

    let cookie = 'auth-cookie=123; path=/; samesite=lax; httponly; secure;'

    if (rememberMe) {
      console.log(rememberMe)
      cookie += 'max-age=' + 48 * 3600
    }


    res.headers.set('set-cookie', cookie)

    return res
  }


  return NextResponse.json({
    success: false,
    message: 'Either your username or password was incorrect. Please try again'
  } as TLoginErrorResponse)
}

export const DELETE = async (req: Request): Promise<NextResponse> => {
    const res = new NextResponse()
    
    res.headers.set('set-cookie', 'auth-cookie=123; path=/; samesite=lax; httponly; secure; expires=' + (new Date(Date.now() - 1000)).toUTCString())

    return res
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  if (req.cookies.has('auth-cookie')) return NextResponse.json({loggedIn: true, user: adminUser})
  return NextResponse.json({loggedIn: false, user: undefined})
}