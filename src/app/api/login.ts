import { createSupabaseBrowserClient } from "../lib/client/supabase";

export async function signInWithKakao(){
    const supabase = createSupabaseBrowserClient();
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'kakao'     
    }) 

    return data
}

export async function signInWithGoogle(location:string){ 
    const supabase = createSupabaseBrowserClient();
   const {data,error} = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options:{
        redirectTo:location,
    }
   });
   if(error) console.log('google login error:',error.message); 
    console.log(data);
}