"use client";

import React from 'react';
import Modal from "src/utils/modal";
import {X} from "lucide-react";

export default function ModalCmp() {
    const [modalContent,setModalContent] = React.useState<React.ReactNode>(null);

    React.useEffect(()=>{
        Modal?.subscribe(setModalContent);

        return () => Modal?.unsubscribe(setModalContent);
    },[])

    React.useEffect(()=>{
        console.log('Modal content updated:',modalContent)
    },[modalContent])

    function evtCloseModal(){
        Modal.remove();
    }


    return (
        <div className="modal-container" style={{
            display: modalContent ? 'block' : 'none'
        }}>
            {modalContent && (
                <div className="modal-content">
                    {modalContent}
                    {/*<button className="modal-close" type="button" onClick={evtCloseModal}><X/></button>*/}
                </div>
            )}
        </div>
    )
}
