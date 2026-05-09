import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const isLoginPage = req.nextUrl.pathname.startsWith('/login');

  // if no token at all
  if (!token && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // if token but expired
  if (token && !isLoginPage) {
    const now = Date.now();
    const decodedToken = jwtDecode(token);
    // token expiration check
    if (decodedToken.exp) {
      const isExpired = decodedToken.exp * 1000 < now;
      if (isExpired) {
        // console.log('redirecting (from isAuth, token expired)...');
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/test'],
};
