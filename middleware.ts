import { updateSession } from '@/app/utils/middleware';
import { NextRequest} from 'next/server'


export function middleware(req: NextRequest) {
    console.log('middleware 실행 경로',req.nextUrl.pathname);
  return updateSession(req)
}

export const config = {
  matcher: ["/stadium"],
}