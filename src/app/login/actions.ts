'use client'
import { createSupabaseBrowserClient } from "../utils/client/supabase";


export async function signInWithGoogle(){
    const supabase = await createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options:{
            redirectTo:process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
            queryParams:{
                access_type:'offline',
                prompt: 'consent'
            }
        }
    });
    if(error) console.log('google login error:',error.message); 

}

export async function signInWithKakao(){ 
    const supabase = await createSupabaseBrowserClient();
   const {error} = await supabase.auth.signInWithOAuth({
    provider:'kakao',
    options:{
        redirectTo:process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
        queryParams:{
            access_type:'offline',
            prompt: 'consent'
        }
    }
   });
   if(error) console.log('kakao login error:',error.message);
    
   
}

export async function signOut(){
    const supabase = await createSupabaseBrowserClient();
    const {error} = await supabase.auth.signOut();
    if(error) console.log(error);
}