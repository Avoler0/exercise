import React from "react";
import Toast from "src/utils/toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {getAccountByLogin} from "src/query/accout";
import {supabaseClient} from "src/utils/supabase/supabase-client";

type ModalLoginProps = {
    setModalType?: React.Dispatch<React.SetStateAction<string>>
}

type LoginFormInputs = {
    email: string;
    password: string;
    memory: boolean;
}

const registerSchema = z.object({
    id: z.string()
        .min(4,"아이디는 최소 4자 이상이어야 합니다.")
        .max(20,"아이디는 최소 20자까지 입력 가능합니다.")
        .regex(/^[a-zA-Z0-9_.]+$/, "아이디는 영문, 숫자, '_', '.'만 사용할 수 있습니다"),
    password: z.string().min(6, "비밀번호는 최소 8자 이상이어야 합니다"),
})


export default function ModalLogin({setModalType}:ModalLoginProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    React.useEffect(()=>{
        setModalType('login-modal');
    },[setModalType])

    async function evtSubmitLogin(input:LoginFormInputs){
        let message = '';
        const email = input.email;
        const password = input.password;
        const memory = input.memory;

        const login = await getAccountByLogin(email,password,memory);
        console.log('데이터?',login);

        if(login){
            Toast?.add({
                type: "success",
                message: "로그인 되었습니다."
            })
        }else{
            Toast?.add({
                type: "warning",
                message: "아이디 또는 비밀번호가 다릅니다.\n 다시 한번 시도해주세요."
            })
        }


    }

    function evtSubmitError(errors: any){
        Toast?.add({
            type: "warning",
            message: "아이디 또는 비밀번호가 다릅니다.\n 다시 한번 시도해주세요."
        })
    }

    return(
        <>
            <div className="modal-header">
                <h3>로그인</h3>
            </div>
            <div className="modal-cont">
                <div className="login-form">
                    <form onSubmit={handleSubmit(evtSubmitLogin,evtSubmitError)} className="form-field">
                        <input
                            {...register("email", {required: "아이디를 입력해주세요."})}
                            type="text" id="Login-Email"
                            placeholder="아이디를 입력하세요."
                        />
                        <input
                            {...register("password", {required: "비밀번호를 입력해주세요."})}
                            type="password"
                            id="Login-Password"
                            placeholder="비밀번호를 입력하세요."/>
                        <div className="check-form">
                            <input
                                {...register("memory")}
                                type="checkbox" id="Login-Memory"/>
                            <label htmlFor="Login-Memory">로그인 유지 하기</label>
                        </div>
                        <div className="login-form-btns">
                            <button type="submit" >로그인</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
