import { makeAutoObservable, observable,action } from 'mobx';
import * as THREE from 'three'
class SceneStore {
    pump1_color = new THREE.Color('black')
    pump2_color = new THREE.Color('black')
    constructor() {
        makeAutoObservable(this, {
            pump1_color: observable,
            setPump1Red: action,
        })
    }
    //pumps Alarms
    setPump1Red() {
        this.pump1_color = new THREE.Color('red')
    }
    //setPump2Red = () => {
    //    this.pump2_color = new THREE.Color('red')
    //}
    //pumps running
    setPump1Green() {
        this.pump1_color = new THREE.Color('green')
    }
    //setPump2Green = () => {
    //    this.pump2_color = new THREE.Color('green')
    //}
    //pumps stopped
    setPump1Black() {
        this.pump1_color = new THREE.Color('black')
    }
    //setPump2Black = () => {
    //    this.pump2_color = new THREE.Color('black')
    //}
}

export { SceneStore }