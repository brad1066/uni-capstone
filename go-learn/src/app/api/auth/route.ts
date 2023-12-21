import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import sha1 from 'js-sha1'
import prisma from '@/lib/db'
import { checkLoginCredentials } from '@/actions/userActions'
import { User } from '@prisma/client'

export type TLoginSuccessResponse = {
  success: true,
  user: User
}

export type TLoginErrorResponse = {
  success: false,
  message: string
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
  const user = await checkLoginCredentials(username, password) as User

  // If there is a user returned...
  if (user) {
    const cookieValue = sha1(username + user.password + Date.now())

    const res = NextResponse.json({
      success: true,
      user
    } as TLoginSuccessResponse)

    // Create a new UserSession on the DB
    const userSession = await prisma.userSession
      .create({ data: { cookieValue, userUsername: username } })

    // If rememberMe is true, set a max-age to 48 hours (otherwise defaults to a session cookie)
    if (userSession) {
      // The base auth cookie that will be sent on the response
      let authCookie = `auth=${cookieValue}; path=/; samesite=lax; httponly; secure;`
      if (rememberMe) authCookie += 'max-age=' + 48 * 3600

      // Set the response set-cookie header, and return the response
      res.headers.append('set-cookie', authCookie)

      return res
    }
    return NextResponse.json({
      success: false,
      message: 'Failed to create auth session. Please try again'
    })
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
  const res = new NextResponse()

  // If we have an auth cookie, remove it from the DB and invalidate on client
  if (req.cookies.get('auth')) {
    prisma.userSession
      .deleteMany({ where: { cookieValue: req.cookies.get('auth')?.value } })

    cookies().delete('auth')
  }
  return res
}

/**
 * An API route to validate an auth from the client
 * @param req The client's request data
 * @returns A response to check if the client sent an auth-cookies that was valid
 */
export const GET = async (req: NextRequest): Promise<NextResponse> => {
  // If the 'auth' cookie exists, check that it is valid on DB. If it is, return the associated user with that cookie
  if (req.cookies.has('auth')) {
    const session = await prisma.userSession.findFirst({
      where: { cookieValue: req.cookies.get('auth')?.value },
      include: { user: true }
    })

    if (session?.user) {
      return NextResponse.json({ loggedIn: true, user: session.user })
    }
  }

  // No cookie stored or is invalid, so return an appropriate state
  return NextResponse.json({ loggedIn: false, user: undefined })
}