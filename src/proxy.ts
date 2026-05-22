import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

export async function proxy(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // if no token redirect to login
  if (!token) {
    console.log('proxy - no token');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // if token expired redirect to login
  const now = Date.now();
  const decodedToken = jwtDecode(token);
  // token expiration check
  if (decodedToken.exp) {
    const isExpired = decodedToken.exp * 1000 < now;
    if (isExpired) {
      console.log('proxy - expired token');
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // path array to apply the rules
  matcher: ['/', '/account', '/measurement/:id'],
};
