import { NextRequest, NextResponse } from 'next/server'


export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
    console.log('middleware 실행 경로',request.nextUrl.pathname);
    if (pathname === '/stadium') {
      const redirectUrl = new URL('/', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  
    return NextResponse.next();
  
}

export const config = {
  matcher: ["/stadium"],
}