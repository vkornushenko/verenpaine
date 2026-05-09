import { redirect } from 'next/navigation';
import { getToken } from '@/lib/getToken';
import { jwtDecode } from 'jwt-decode';
// import { refresh } from 'next/cache';

export async function isAuth(): Promise<void | boolean> {
  const now = Date.now();
  const token = await getToken();
  if (!token) {
    console.log('redirecting (from isAuth, no token found)...');
    redirect('/login');
  }
  const decodedToken = jwtDecode(token);

  // token expiration check
  if (decodedToken.exp) {
    const isExpired = decodedToken.exp * 1000 < now;
    if (isExpired) {
      console.log('redirecting (from isAuth, token expired)...');
      redirect('/login');
    }

    // // side calculations
    // const left = decodedToken.exp * 1000 - Date.now();
    // const totalSeconds = Math.floor(left / 1000);
    // const minutes = Math.floor(totalSeconds / 60);
    // const seconds = totalSeconds % 60;
    // console.log(`Token is not expired, ${minutes}m ${seconds}s left`);
  }
  return true;
}
