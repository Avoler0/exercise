import React from "react";
import Toast from "src/utils/toast";
import {useForm} from "react-hook-form";
import {z} from "zod";

type ModalLoginProps = {
    setModalType: React.Dispatch<React.SetStateAction<String>>
}

type LoginFormInputs = {
    id: string;
    password: string;
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

    function evtSubmitLogin(data:LoginFormInputs){
        console.log('데이터');
        Toast?.add({
            type: "success",
            message: "로그인 기능은 아직 준비중입니다."
        })


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
                            {...register("id", {required: "아이디를 입력해주세요."})}
                            type="text" id="Login-ID"
                            placeholder="아이디를 입력하세요."
                        />
                        <input
                            {...register("password", {required: "비밀번호를 입력해주세요."})}
                            type="password"
                            id="Login-Password"
                            placeholder="비밀번호를 입력하세요."/>
                        <div className="check-form">
                            <input type="checkbox" id="Login-Memory"/>
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
