import { makeAutoObservable, observable,action } from 'mobx';
class AlarmTextStore {
    message = 'No Alarm'
    color = 'green'
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
    changeColor(color) {
        this.color = color
    }
}
export { AlarmTextStore }