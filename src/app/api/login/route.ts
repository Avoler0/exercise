import {NextResponse} from "next/server";
import supabaseServer from "src/utils/supabase/supabase-server";

export async function POST(req: Request){
    const { email, password, memory } = await req.json();
    const { data,error } = await supabaseServer.auth.signInWithPassword({
        email,
        password
    });

    if(error || !data) {
        return NextResponse.json({ error: "로그인 실패" }, { status: 401 });
    }

    if(data.password !== password) {
        return NextResponse.json({ error: "로그인 실패" }, { status: 500 });
    }

    const response = NextResponse.json({ message: "로그인 성공", token },{ status:200 })
    response.cookies.set("auth-token", data.session?.access_token || "", {
        httpOnly: true,
        secure: true,
        maxAge: memory ? 30 * 24 * 60 * 60 : data.session?.expires_in,
        path: "/",
        sameSite: "strict"
    });

    return response;
}
