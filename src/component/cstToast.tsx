"use client";

import React from 'react';
import Toast from "src/utils/toast";
import { X } from 'lucide-react'

export default function ToastComponent() {
    const [toastInitAnimate,setToastInitAnimate] = React.useState(false);
    const [toastPosition,setToastPosition] = React.useState('top');
    const [toasts,setToasts] = React.useState([]);

    Toast.init({
        duration: 1000,
        delay: 0,
    })

    React.useEffect(() => {
        Toast.subscribe(setToasts);

        return () => Toast.unsubscribe(setToasts);
    },[])

    console.log(toastInitAnimate);
    return (
        <div className={"toast-container"}>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

function ToastItem({toast}){
    const [isInit,setInit] = React.useState(false);
    React.useEffect(()=>{
        function initToast(){
            setTimeout(()=>{
                setInit(true);
            },10)
        }
        return () => initToast();
    },[])

    function evtClostToast(){
        setInit(false);
        setTimeout(()=>{
            Toast.remove(toast.id);
        },Toast.duration)
    }

    return(
        <div className={`toast-item top ${isInit ? 'init' : ''} `} key={toast.id} style={{
            "--toast-duration": `${Toast.duration}ms`,
            "--toast-delay": `${Toast.delay}ms`,
        }}>
            <button className="toast-close" onClick={evtClostToast}>
                <X />
            </button>
            <div className="toast-content">
                {toast.message}
            </div>
        </div>
    )
}
