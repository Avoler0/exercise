import React from "react";
import Toast from "src/utils/toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {TabContent, TabContentGroup, useTabContext} from "src/component/TabContent.Cmp";
import Modal from "src/utils/modal";

type Temp = {
    setModalType?: React.Dispatch<React.SetStateAction<string>>
}


const registerSchema = z.object({
    id: z.string()
        .min(4,"아이디는 최소 4자 이상이어야 합니다.")
        .max(20,"아이디는 최소 20자까지 입력 가능합니다.")
        .regex(/^[a-zA-Z0-9_.]+$/, "아이디는 영문, 숫자, '_', '.'만 사용할 수 있습니다"),
    password: z.string().min(6, "비밀번호는 최소 8자 이상이어야 합니다"),
})


export default function ModalJoin({setModalType}:any) {
    const [activeTab, setActiveTab] = React.useState(0);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    React.useEffect(()=>{
        setModalType('join-modal');
    },[setModalType])


    function evtSubmitLogin(data:LoginFormInputs){
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
                <div className="join-form">
                    <form className="form-field">
                        <TabContentGroup activeTab={activeTab}>
                            <TabContent>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">닉네임</label>
                                    <input
                                        {...register("id", {required: "닉네임을 입력해주세요."})}
                                        type="text" id="Join-Nick"
                                        placeholder="닉네임을 입력하세요."
                                    />
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">생년월일</label>
                                    <input
                                        {...register("id", {required: "아이디를 입력해주세요."})}
                                        type="text" id="Join-ID"
                                        placeholder="아이디를 입력하세요."
                                    />
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">성별</label>
                                    <div className="radio-form">
                                        <div className="radio-box">
                                            <input type="radio" name="Join-Sex" id="Join-Male"/>
                                            <label htmlFor="Join-Male">남성</label>
                                        </div>
                                        <div className="radio-box">
                                            <input type="radio" name="Join-Sex" id="Join-Female"/>
                                            <label htmlFor="Join-Female">여성</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row-btns">
                                    <button type="button" className="btn-ghost" onClick={() => Modal?.remove()}>취소</button>
                                    <button type="button" className="btn-primary" onClick={() => setActiveTab(prev => prev + 1)}>다음</button>
                                </div>

                            </TabContent>
                            <TabContent>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">아이디</label>
                                    <input
                                        {...register("id", {required: "아이디를 입력해주세요."})}
                                        type="text" id="Join-ID"
                                        placeholder="아이디를 입력하세요."
                                    />
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">비밀번호</label>
                                    <input
                                        {...register("id", {required: "비밀번호를 입력해주세요."})}
                                        type="text" id="Join-ID"
                                        placeholder="비밀번호를 입력하세요."
                                    />
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">비밀번호 확인</label>
                                    <input
                                        {...register("id", {required: "비밀번호를 입력해주세요."})}
                                        type="text" id="Join-ID"
                                        placeholder="확인을 위해 비밀번호를 입력하세요."
                                    />
                                </div>
                                <div className="row-btns">
                                    <button type="button" className="btn-ghost" onClick={() => Modal?.remove()}>취소
                                    </button>
                                    <button type="button" className="btn-primary"
                                            onClick={() => setActiveTab(prev => prev + 1)}>가입
                                    </button>
                                </div>
                            </TabContent>
                        </TabContentGroup>
                    </form>
                </div>
            </div>
        </>
    )
}
