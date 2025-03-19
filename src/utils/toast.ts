import React from "react";

type ToastType = 'success' | 'info' | 'warning' | 'default';
type ToastPosition = 'top' | 'bottom' | 'left' | 'right';

export type ToastInstance = {
    id: string | number,
    message: string,
    type?: ToastType,
    position?: ToastPosition
}

type ToastNoneIdInstance = Omit<ToastInstance, 'id'>;


class Toast {
    static instance:ToastInstance[] | null = null;
    private listeners = new Set();
    private toasts:ToastInstance[] = [];
    private duration:number = 1000;
    private delay:number = 0;
    private lastMessage:string = '';


    static getInstance() {
        if (!this.instance) {
            this.instance = new Toast();
        }
        return this.instance;
    }

    init({duration,delay}){
        this.duration = duration | this.duration;
        this.delay = delay | this.delay;
    }

    add(input:ToastNoneIdInstance | string){
        const toastData = typeof input === 'string' ? {message: input} : input;
        const id = Date.now();

        if(this.lastMessage === toastData.message) return;

        this.toasts.push({
            id,
            message: toastData.message,
            type: toastData.type || 'default',
            position: toastData.position || 'top',
        });

        this.notifyListeners();

        setTimeout(() => {
            const toastElement = document.querySelector(`.toast-item[data-toast-id="${id}"]`);

            if(toastElement){
                toastElement.classList.remove('init')
            }
            setTimeout(()=>{
                this.remove(id)
                this.lastMessage = '';
            },300)
        },3000)

        this.lastMessage = toastData.message;
    }

    remove(id){
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifyListeners();
    }

    notifyListeners(){
        this.listeners.forEach(listener => listener([...this.toasts]));
    }

    subscribe(listener:React.Dispatch<React.SetStateAction<ToastInstance[]>>){
        this.listeners.add(listener);
    }

    unsubscribe(listener){
        this.listeners.delete(listener);
    }

    viewSettings(){
        console.log(this.duration,this.delay);
    }
}
export default Toast.getInstance();
