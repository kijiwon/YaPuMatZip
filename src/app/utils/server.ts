import { createServerClient } from '@supabase/ssr'
import { Database } from '../../../database.types'
// import { NextRequest, NextResponse } from 'next/server';
// import {getCookie, setCookie} from 'cookies-next';
import { cookies } from 'next/headers';

export const createServerSideClient= async (serverComponent = false)=> {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies:{
        get: (key)=> cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if(serverComponent) return;
          cookieStore.set(key, value, options)
        },
        remove: (key, options) => {
          if(serverComponent) return;
          cookieStore.set(key, '', {...options, maxAge: -1}) //  maxAge: -1->쿠키 삭제
        }
      }
    }
  )
}

// RSC
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// middleware
// export const createServerSideMiddleware = async(req:NextRequest, res:NextResponse) => {
//   const {nextUrl} = req;
//   console.log('>>nextUrl',nextUrl);
//   return createServerClient<Database>(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         get:(key) => getCookie(key, {req, res}), // options로 req와 res를 전달
//         set:(key, value, options) => {
//           setCookie(key, value, {req, res, ...options}); // options에 req와 res를 추가로 전달
//         },
//         remove: (key, options)=>{
//           setCookie(key,'',{req, res, ...options});
//         }
//       },
//     }
//   )
  
// }