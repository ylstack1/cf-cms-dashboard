import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME } from '@/lib/constants'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value

  // Protected admin routes
  if (path.startsWith('/admin')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('from', path)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect to dashboard if already authenticated and trying to access login
  if (path === '/login' && token) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
