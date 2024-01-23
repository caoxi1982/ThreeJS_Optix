import { makeAutoObservable, observable,action } from 'mobx';
class HWTextStore {
    message = ''
    constructor() {
        makeAutoObservable(this, {
            message: observable,
            color: observable,
            changeMessage: action,
            changeColor: action
        })
    }
    changeMessage(msg) {
        this.message = msg
        //console.log("Im alarm store")
    }
}

export { HWTextStore }