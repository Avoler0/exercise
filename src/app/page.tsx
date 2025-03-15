"use client";

import React from "react";
import Toast from "src/utils/toast";


export default function Home() {
    function toastTest(){
        Toast?.add("hi");
    }
    return (
        <div>
            <button type="button" onClick={toastTest}>Toast???</button>
        </div>
    );
}
