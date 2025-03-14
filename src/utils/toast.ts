
class Toast {
    static instance = null;
    listeners = new Set();
    toasts = [];
    duration = 0;
    delay = 0;


    static getInstance() {
        if (!this.instance) {
            this.instance = new Toast();
        }
        return this.instance;
    }

    init({duration = 3000,delay = 0}){
        console.log("Toast init :" ,duration,delay)

        this.duration = duration;
        this.delay = delay;
    }

    add(input){
        const toastData = typeof input === 'string' ? {message: input} : input;
        const id = Date.now();
        this.toasts.push({
            id,
            message: toastData.message,
            type: toastData.type || 'default',
            position: toastData.position || 'top',
        });
        this.notifyListeners();

        setTimeout(() => {this.remove(id)},5000)
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
