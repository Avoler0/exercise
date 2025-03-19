"use client";

import React from "react";
import Toast from "src/utils/toast";
import Modal from "src/utils/modal";
import ModalLogin from "src/component/modal/Modal-Login.Cmp";

export default function Home() {
    function toastTest(){

        Modal?.add(<ModalLogin />);
    }
    return (
        <div>
            <button type="button" onClick={toastTest}>Toast???</button>
        </div>
    );
}
