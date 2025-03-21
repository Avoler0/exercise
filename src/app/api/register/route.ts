import {NextResponse} from "next/server";
import supabaseServer from "src/utils/supabase/supabase-server";

export async function POST(req: Request){
    const { nickName,birthDate,gender,email,password} = await req.json();

    const  { data,error } = await supabaseServer.auth.signUp({
        email:email,
        password:password,
    });

    if (error || !data?.user?.id) {
        console.log('첫단추',error)
        return NextResponse.json({ error: "회원가입 실패" }, { status: 401 });
    }

    const userId = data.user?.id;

    await supabaseServer
        .from("accounts")
        .update({
            nickname: nickName,
            birth_date: birthDate,
            gender:gender,
        })
        .eq("id", userId);

    const { data:loginData,error:loginError } = await supabaseServer.auth.signInWithPassword({
        email,
        password
    });


    if(loginError || !loginData?.session) {
        return NextResponse.json({ error: "로그인 실패" }, { status: 400 });
    }

    const response = NextResponse.json({ message: "로그인 성공", access_token: loginData?.session?.access_token, },{ status:200 })
    response.cookies.set("auth-token", loginData.session.access_token, {
        httpOnly: true,
        secure: true,
        maxAge: loginData.session.expires_in ?? 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "strict"
    });

    console.log(response)
    return response;
}
