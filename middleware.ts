import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Get auth token from cookies
  const token = request.cookies.get('sb-access-token')?.value ||
                request.cookies.get('sb-hvnulhfewebxxrwxvlor-auth-token')?.value

  // Protected routes that require authentication
  const protectedRoutes = ['/perfil', '/ranking']
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if trying to access login while authenticated
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
