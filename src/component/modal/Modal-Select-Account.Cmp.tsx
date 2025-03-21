import React from "react";
import Modal from "src/utils/modal";
import ModalLogin from "src/component/modal/Modal-Login.Cmp";
import ModalJoin from "src/component/modal/Modal-Join.Cmp";


export default function ModalSelectAccount() {

    function evtOpenModalLogin(){
        Modal?.add(<ModalLogin />);
    }

    function evtOpenModalJoin(){
        Modal?.add(<ModalJoin />);
    }

    return (
        <>
            <div className="modal-header">
                <h3>환영합니다</h3>
            </div>
            <div className="modal-cont narrow">
                <div className="col-btns">
                    <button type="button" className="btn-primary" onClick={evtOpenModalLogin}>로그인</button>
                    <button type="button" className="btn-secondary" onClick={evtOpenModalJoin}>회원가입</button>
                </div>
            </div>
        </>
    )
}
