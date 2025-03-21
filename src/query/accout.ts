import {SupabaseClient} from "@supabase/supabase-js";
import axios from "axios";

type registerProps = {
    birthDate:string,
    email:string,
    gender:string,
    nickName:string,
    password:string,
    verifyPassword:string,
}

export function getAccounts(supabase:SupabaseClient){
    return supabase.from('accounts').select('*')
}


export async function loginById(email:string,password:string,memory:boolean){
    try{
        const res = await axios.post('/api/login', { email:email, password:password,memory:memory});

        return res.data;
    } catch(error){
        return null;
    }
}


export async function loginByToken(token:string){

}

export async function logout(){}


export async function accountRegister(registerData:registerProps){
    try{
        const res = await axios.post('/api/register', registerData);

        return res.data;
    } catch(error){
        return null;
    }
}
