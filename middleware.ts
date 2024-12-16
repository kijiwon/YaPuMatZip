
import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
  const response = NextResponse.next();
    console.log('middleware 통과');
  return response;
}

export const config = {
  matcher: ["/","/stadium/:path*"],
}