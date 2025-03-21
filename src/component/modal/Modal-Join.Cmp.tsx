import React from "react";
import Toast from "src/utils/toast";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {TabContent, TabContentGroup } from "src/component/TabContent.Cmp";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Modal from "src/utils/modal";
import dayjs from "dayjs";
import {accountRegister} from "src/query/accout";

type Temp = {
    setModalType?: React.Dispatch<React.SetStateAction<string>>
}

type JoinFormInputs = {
    nickName: string;
    birthDate: string;
    gender: 'male' | 'female';
    email: string;
    password: string;
    verifyPassword: string;
}

const registerSchema = z.object({
    nickName: z.string()
            .min(4,"닉네임은 최소 2자 이상이어야 합니다.")
            .max(20,"아이디는 최소 10자까지 입력 가능합니다."),
    birthDate: z.string().min(1,"생년월일을 선택해주세요."),
    // gender: number,
    email: z.string(),
    password: z.string().min(6, "비밀번호는 최소 8자 이상이어야 합니다"),
    verifyPassword: z.string().min(6, "비밀번호는 최소 8자 이상이어야 합니다"),
})


export default function ModalJoin({setModalType}:any) {
    const [calVal, setCalVal] = React.useState<string | null>(null);
    const [activeTab, setActiveTab] = React.useState(0);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<JoinFormInputs>({
        mode: 'onChange',
    });

    React.useEffect(()=>{
        setModalType('join-modal');
    },[setModalType])


    async function evtSubmitJoin(data:JoinFormInputs){
        console.log('Submit Join :',data,'data')

        const join = await accountRegister(data);

        console.log(join)
        if(join){
            Toast?.add({
                type: "success",
                message: "회원가입에 성공 했습니다."
            })
            // Modal?.remove();
        }else{
            Toast?.add({
                type: "warning",
                message: "회원가입에 실패하였습니다.\n다시 시도해주세요."
            })
        }



    }

    function evtSubmitError(errors: any){
        console.log('Submit Error :',errors,'errors')
        Toast?.add({
            type: "warning",
            message: "아이디 또는 비밀번호가 다릅니다.\n 다시 한번 시도해주세요."
        })
    }

    function evtDateOpen(evt:React.MouseEvent<HTMLInputElement, MouseEvent>){
        evt.target.closest('.calendar-field').classList.toggle('open');
    }

    function evtCalendarChange(date:Date,evt:React.MouseEvent<HTMLInputElement, MouseEvent>){
        const formattedDate:string = dayjs(date).format('YYYY-MM-DD');
        const field:React.ReactNode = evt.target.closest('.calendar-field');

        field?.classList.remove('open');
        setValue('birthDate', formattedDate, { shouldValidate: true });
        setCalVal(formattedDate);
    }

    return(
        <>
            <div className="modal-header">
                <h3>로그인</h3>
            </div>
            <div className="modal-cont">
                <div className="join-form">
                    <form className="form-field" onSubmit={handleSubmit(evtSubmitJoin,evtSubmitError)}>
                        <TabContentGroup activeTab={activeTab}>
                            <TabContent>
                                <div className="each-field">
                                    <label htmlFor="Join-Nick">닉네임</label>
                                    <input
                                        {...register("nickName", {required: "닉네임을 입력해주세요."})}
                                        type="text"
                                        id="Join-Nick"
                                        placeholder="닉네임을 입력하세요."
                                    />
                                    { errors.nickName && ( <p className="field-error">{errors.nickName.message}</p> )}
                                </div>
                                <div className="each-field calendar-field">
                                    <label htmlFor="Join-Birth">생년월일</label>
                                    <input
                                        className="date-calendar"
                                        {...register("birthDate", {required: "생년월일을 선택해주세요."})}
                                        type="text" id="Join-Birth"
                                        placeholder="YYYY-MM-DD"
                                        value={calVal ? calVal : ''}
                                        readOnly
                                        onClick={evtDateOpen}
                                    />
                                    {errors.birthDate && !calVal && ( <p className="field-error">{errors.birthDate.message}</p> )}
                                    <Calendar calendarType="gregory" formatDay ={(locale, date) => dayjs(date).format('DD')} onChange={evtCalendarChange} />
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-ID">성별</label>
                                    <div className="radio-form">
                                        <div className="radio-box">
                                            <input
                                                {...register('gender', { required: '성별을 선택해주세요' })}
                                                type="radio" name="gender" id="Join-Male" value="male"/>
                                            <label htmlFor="Join-Male">남성</label>
                                        </div>
                                        <div className="radio-box">
                                            <input
                                                {...register('gender', { required: '성별을 선택해주세요' })}
                                                type="radio" name="gender" id="Join-Female" value="female"/>
                                            <label htmlFor="Join-Female">여성</label>
                                        </div>
                                        {errors.gender && ( <p className="field-error">{errors.gender.message}</p> )}
                                    </div>
                                </div>
                                <div className="row-btns">
                                    <button type="button" className="btn-ghost" onClick={() => Modal?.remove()}>취소</button>
                                    <button type="button" className="btn-primary" onClick={() => setActiveTab(prev => prev + 1)}>다음</button>
                                </div>

                            </TabContent>
                            <TabContent>
                                <div className="each-field">
                                    <label htmlFor="Join-Email">이메일</label>
                                    <input
                                        {...register("email", {required: "이메일을 입력해주세요."})}
                                        type="text" id="Join-Email"
                                        placeholder="이메일을 입력하세요."
                                    />
                                    {errors.email && ( <p className="field-error">{errors.email.message}</p> )}
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-Password">비밀번호</label>
                                    <input
                                        {...register("password", {required: "비밀번호를 입력해주세요."})}
                                        type="password" id="Join-Password"
                                        placeholder="비밀번호를 입력하세요."
                                    />
                                    {errors.password && ( <p className="field-error">{errors.password.message}</p> )}
                                </div>
                                <div className="each-field">
                                    <label htmlFor="Join-VerifyPassword">비밀번호 확인</label>
                                    <input
                                        {...register("verifyPassword", {required: "비밀번호를 입력해주세요."})}
                                        type="password" id="Join-VerifyPassword"
                                        placeholder="확인을 위해 비밀번호를 입력하세요."
                                    />
                                    {errors.verifyPassword && ( <p className="field-error">{errors.verifyPassword.message}</p> )}
                                </div>
                                <div className="row-btns">
                                    <button type="button" className="btn-ghost" onClick={() => setActiveTab(prev => prev - 1)}>이전
                                    </button>
                                    <button type="submit" className="btn-primary">가입</button>
                                </div>
                            </TabContent>
                        </TabContentGroup>
                    </form>
                </div>
            </div>
        </>
    )
}
