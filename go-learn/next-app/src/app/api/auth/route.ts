import { TUser } from "@/lib/types"
import users, { adminUser } from '@/dummy-data/users'
import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcrypt"

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

/**
 * API Route to accept login credentials and perform checks on them.
 * If the details are valid, it returns the User (minus the password)
 * and a positive response. Otherwise a false success value and a message
 * to say what went wrong is returned
 * 
 * @param req Request object holding the data sent to the server from the client
 * @return A NextResponse promise to resolve
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {

  // Get the fields expected in the body of the request
  const { username, password, rememberMe } = await req.json()

  // Check those login credentials against those stored
  const checkResponse = await checkLoginCredentials(username, password)

  // If there is a user returned...
  if (checkResponse) {
    // Remove the password from the user and add it to a new response object
    delete checkResponse.password
    const res = NextResponse.json({
      success: true,
      user: checkResponse
    } as TLoginSuccessResponse)

    // The base auth cookie that will be sent on the response
    let cookie = 'auth-cookie=123; path=/; samesite=lax; httponly; secure;'

    // If rememberMe is true, set a max-age to 48 hours (otherwise defaults to a session cookie)
    if (rememberMe) cookie += 'max-age=' + 48 * 3600

    // Set the response set-cookie header, and return the response
    res.headers.set('set-cookie', cookie)

    return res
  }

  // If no user matched, return a error response back to the client
  return NextResponse.json({
    success: false,
    message: 'Either your username or password was incorrect. Please try again'
  } as TLoginErrorResponse)
}

/**
 * API Route to clear an auth cookie that might be on the client (by invalidating an existing one)
 * @param req The client request data
 * @returns A response with a set-cookie header to invalidate any auth-cookies on the client
 */
export const DELETE = async (req: NextRequest): Promise<NextResponse> => {

  // Generate a new NextResponse object, set an invalidating cookie, then return it
  const res = new NextResponse()
  res.headers.set('set-cookie', 'auth-cookie=123; path=/; samesite=lax; httponly; secure; expires=' + (new Date(Date.now() - 1000)).toUTCString())
  return res
}

/**
 * An API route to validate an auth-cookie from the client
 * @param req The client's request data
 * @returns A response to check if the client sent an auth-cookies that was valid
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // If the auth-cookie exists, return a positive response
  // TODO: check if cookie is a real, valid cookie when DB implemented. Invalidate if not
  if (req.cookies.has('auth-cookie')) return NextResponse.json({ loggedIn: true, user: adminUser })
  return NextResponse.json({ loggedIn: false, user: undefined })
}