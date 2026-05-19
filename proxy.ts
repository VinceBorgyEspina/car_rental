import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || 'super_secret_fallback_key_for_development'
const key = new TextEncoder().encode(secretKey)

async function getSessionFromRequest(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value
  if (!sessionCookie) return null
  try {
    const { payload } = await jwtVerify(sessionCookie, key, { algorithms: ['HS256'] })
    return payload as any
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect /dashboard - must be logged in
  if (pathname.startsWith('/dashboard')) {
    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protect /admin - must be logged in as ADMIN
  if (pathname.startsWith('/admin')) {
    const session = await getSessionFromRequest(request)
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (session.user?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Redirect logged-in users away from auth pages
  if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
    const session = await getSessionFromRequest(request)
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/login', '/register'],
}
