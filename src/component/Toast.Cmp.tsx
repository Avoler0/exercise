"use client";

import React from 'react';
import Toast, {ToastInstance} from "src/utils/toast";
import { X, Info,CircleAlert,CircleCheck } from 'lucide-react'

export default function ToastCmp() {
    const [toasts,setToasts] = React.useState([]);

    React.useEffect(() => {
        Toast?.init({
            duration: 1000,
            delay: 0,
        })
        Toast?.subscribe(setToasts);

        return () => Toast?.unsubscribe(setToasts);
    },[])


    return (
        <div className={"toast-container"}>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} />
            ))}
        </div>
    );
}

function ToastItem({toast}:{ toast: ToastInstance }) {
    const [isInit,setInit] = React.useState(false);
    const toastStyle: React.CSSProperties & { [key: string]: string } = {
        "--toast-duration": `${Toast!.duration}ms`,
        "--toast-delay": `${Toast!.delay}ms`,
    };
    React.useEffect(()=>{
        function initToast(){
            setTimeout(()=>{
                setInit(true);
            },10)
        }
        return () => initToast();
    },[])

    function evtCloseToast(){
        setInit(false);
        setTimeout(()=>{
            Toast?.remove(toast.id);
        },Toast?.duration)
    }

    function toastTypeIcon(){
        switch (toast.type){
            case "info": return <Info />;
            case "success": return <CircleCheck />;
            case "warning": return <CircleAlert />;
        }
    }

    function toastTypeTitle(){
        switch (toast.type){
            case "info": return '정보';
            case "success": return '성공';
            case "warning": return '사용불가';
        }
    }

    return(
        <div className={`toast-item top ${isInit ? 'init' : ''} `}
             key={toast.id}
             data-toast-id={toast.id}
             data-toast-type={toast.type == 'default' ? '' : toast.type}
             style={toastStyle}>
            <span className="toast-icon">
                {toastTypeIcon()}
            </span>
            <div className="toast-in">
                <div className="toast-header">
                    <h4>{toastTypeTitle()}</h4>
                </div>
                <div className="toast-content">
                    <p>{toast.message}</p>
                </div>
            </div>
            <button className="toast-close" onClick={evtCloseToast}>
                <X/>
            </button>
        </div>
    )
}
