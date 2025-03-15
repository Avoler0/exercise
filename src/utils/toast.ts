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
    listeners = new Set();
    toasts:ToastInstance[] = [];
    static duration:number = 1000;
    static delay:number = 0;


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
        this.toasts.push({
            id,
            message: toastData.message,
            type: toastData.type || 'default',
            position: toastData.position || 'top',
        });
        this.notifyListeners();

        console.log(id)
        setTimeout(() => {
            const toastElement = document.querySelector(`.toast-item[data-toast-id="${id}"]`);

            if(toastElement){
                toastElement.classList.remove('init')
            }
            setTimeout(()=>{
                this.remove(id)
            },300)
        },6000)
    }

    remove(id){
        this.toasts = this.toasts.filter(toast => toast.id !== id);
        this.notifyListeners();
    }

    notifyListeners(){
        this.listeners.forEach(listener => listener([...this.toasts]));
    }

    subscribe(listener){
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
