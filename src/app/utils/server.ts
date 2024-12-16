import { createServerClient } from '@supabase/ssr'
import { Database } from '../../../database.types'
import { NextRequest, NextResponse } from 'next/server';
import {getCookie, setCookie} from 'cookies-next';

export const createServerSideClient= async ()=> {

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:(key) => getCookie(key),
        set:(key, value, options) => {
          setCookie(key, value, options);
        },
        remove: (key, options)=>{
          setCookie(key,'',options);
        }
      },
    }
  )
}


// middleware
export const createServerSideMiddleware = async(req:NextRequest, res:NextResponse) => {

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get:(key) => getCookie(key, {req, res}), // options로 req와 res를 전달
        set:(key, value, options) => {
          setCookie(key, value, {req, res, ...options}); // options에 req와 res를 추가로 전달
        },
        remove: (key, options)=>{
          setCookie(key,'',{req, res, ...options});
        }
      },
    }
  )
}