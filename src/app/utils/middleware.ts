import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import {getCookie, setCookie} from 'cookies-next';

export async function updateSession(req:NextRequest,) {
  const supabaseResponse = NextResponse.next({request:req})


  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        cookies: {
          get:(key) => getCookie(key, {req}), // options로 req와 res를 전달
          set:(key, value, options) => {
            setCookie(key, value, {req, ...options}); // options에 req와 res를 추가로 전달
          },
          remove: (key, options)=>{
            setCookie(key,'',{req, ...options});
          }
        },
      }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  if (!user && !isAuthRoute) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/auth'
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}
