


export default function ModalLogin() {
    
    return(
        <div className="modal-content">
            <div className="modal-header">
                <h3>로그인</h3>
            </div>
            <div className="modal-cont">
                <div className="login-form">
                    <form className="form-field">
                        <input type="text" id="Login-ID" placeholder="아이디를 입력하세요."/>
                        <input type="text" id="Login-ID" placeholder="아이디를 입력하세요."/>
                        <div className="check-form">
                            <input type="checkbox" id="Login-Memory"/>
                            <label htmlFor="Login-Memory">로그인 유지 하기</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
