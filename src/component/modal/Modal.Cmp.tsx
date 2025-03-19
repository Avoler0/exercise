"use client";

import React from 'react';
import Modal from "src/utils/modal";
import {X} from "lucide-react";
import clsx from "clsx";

export default function ModalCmp() {
    const [modalType,setModalType] = React.useState('');
    const [modalComponent,setModalComponent] = React.useState<React.ReactElement | null>(null);

    React.useEffect(()=>{
        Modal?.subscribe(setModalComponent);

        return () => Modal?.unsubscribe(setModalComponent);
    },[])

    React.useEffect(()=>{
        console.log('Modal content updated:',modalComponent)
    },[modalComponent])

    function evtCloseModal(evt){
        evt.stopPropagation()
        Modal.remove();
    }

    return (
        <div className={clsx("modal-container",modalComponent && "show", modalType)}>
            <div className="modal-overlay" onClick={evtCloseModal}></div>
            {modalComponent && (
                <div className="modal-content">
                    {React.cloneElement(modalComponent,{setModalType})}
                    <button className="modal-close" type="button" onClick={evtCloseModal}><X/></button>
                </div>
            )}
        </div>
    )
}
