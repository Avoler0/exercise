import React from "react";


class Modal {
    static modalInstance: Modal | null = null;
    static listener:React.Dispatch<React.SetStateAction<React.ReactNode | null>> | null = null;
    static modalJSX: React.ReactNode | undefined;

    static getInstance(){
        if(!this.modalInstance){
            this.modalInstance = new Modal();
        }
        return this.modalInstance;
    }

    add(jsx?:React.ReactNode){

        this.modalJSX = jsx;
        console.log('모달 추가',this.modalJSX);
        this.notifyListeners();
    }

    remove(){
        this.modalJSX = null;

        this.notifyListeners();
    }

    subscribe(listener:React.Dispatch<React.SetStateAction<React.ReactNode | null>>){
        this.listener = listener;
    }


    unsubscribe(listener){
        this.listener = null;
    }

    private notifyListeners(){

        this.instener?.(this.modalJSX);
        if(this.listener){
            this.listener(() => this.modalJSX);

        }else{
            console.warn("⚠️ Modal listener가 설정되지 않음. `subscribe()`가 호출되었는지 확인하세요.");
        }
    }

}

export default Modal.getInstance();
