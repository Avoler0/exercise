"use client";

import Image from "next/image";
import React, {useEffect} from "react";
import {debounce} from "next/dist/server/utils";
import Toast from "src/utils/toast";


export default function Home() {
    function toastTest(){
        Toast.viewSettings();
        Toast.add("hi");
    }
    return (
        <div>
            <button type="button" onClick={toastTest}>Toast???</button>
        </div>
    );
}
