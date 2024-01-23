import { AlarmTextStore } from "./AlarmText.store";
import { CWTextStore } from "./CWText.store";
import { HWTextStore } from "./HWText.store";
import { SceneStore } from "./Scene.store";
import  React from 'react'

class rootStore {
    constructor() {
        this.alarmtext = new AlarmTextStore()
        this.cwtext = new CWTextStore()
        this.hwtext = new HWTextStore()
        this.sceneStore = new SceneStore()
    }

}

const rootstore = new rootStore()
const context = React.createContext(rootstore)
const useStore = () => React.useContext(context)
export {useStore }