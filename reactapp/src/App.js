import React, { useState, useEffect } from 'react';
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { BakeShadows, OrbitControls, Stage } from '@react-three/drei'
import * as signalR from '@microsoft/signalr';
import { useMount } from 'ahooks';
import AlarmText from './Components/Alarmtext.js';
import CWText from './Components/CoolWatertext.js';
import HWText from './Components/HotWatertext.js';
import Model from './Components/Scene.jsx';
//import { observer } from 'mobx-react-lite'
//import {  useStore } from './Stores/index'

function App() {
    const [hubConnection, setHubConnection] = useState();
    //const [message, setMessage] = useState();
    const [cwNumber, setCwNumber] = useState('0.0')
    const [hwNumber, setHwNumber] = useState('0.0')
    const [alarmtext, setAlarmtext] = useState('No Alarm')
    const [alarmcolor, setAlarmcolor] = useState('green')
    const [pump1Running, setPump1Running] = useState(false)
    const [pump2Running, setPump2Running] = useState(false)

    function sendMessage() {
        console.log("send message")
        hubConnection.invoke("SendMessage", "web", "loca","red").catch(
            function (err) {
                return console.error(err.toString());
            });
    }
    //to open pdf in Optix
    function pump1Clicked() {
        hubConnection.invoke("PumpClicked", "web", "755").catch(function (err) {
            return console.error(err.toString());
        });
    }

    function pump2Clicked() {
        hubConnection.invoke("PumpClicked", "web", "525").catch(function (err) {
            return console.error(err.toString());
        });
    }

    useMount(() => {
        // 1.在组件挂载时，创建 HubConnection 实例
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl("https://localhost:7127/chathub")
            .withAutomaticReconnect() // 自动重连
            .build();
        setHubConnection(newConnection);
    });

    useEffect(() => {
        console.log("Here is from React APP.js")
        // 2.启动 SignalR 连接
        if (hubConnection) {
            hubConnection
                .start()
                .then(() => {
                    console.log('SignalR Connected!');
                })
                .catch((err) => {
                    console.log('SignalR Connection Error: ', err);
                });
        }
        return () => {
            // 4.组件卸载时，断开 SignalR 连接
            if (hubConnection) {
                hubConnection
                    .stop()
                    .then(() => {
                        console.log('SignalR Disconnected!');
                    })
                    .catch((err) => {
                        console.log('SignalR Disconnection Error: ', err);
                    });
            }
        };
    }, [hubConnection]);

     //3.使用 hub 的 on 方法来监听服务器上的事件
    hubConnection?.on('AlarmMessageOnWeb', (user,message) => {
        console.log(`React ReceiveAlarmMessage: ${user}:${message}`);
        setAlarmtext(message)
        if (message.startsWith('No'))
            setAlarmcolor('green')
        else 
            setAlarmcolor('red')
    });

    hubConnection?.on('CWTemperatureOnWeb', (user,message) => {
        console.log(`React ReceiveCWTemperature: ${user}:${message}`);
        setCwNumber(message)
        //cwtext.changeMessage('23.4')
        //cwtext.message = message
        //cwtext.color = 'red'
    });

    hubConnection?.on('HWTemperatureOnWeb', (user,message) => {
        console.log(`React ReceiveHWTemperature: ${user}:${message}`);
        setHwNumber(message)
        //hwtext.message = message
        //hwtext.color = 'red'
    });

    hubConnection?.on('PumpsStatusChangeOnWeb', (user,name,status) => {
        console.log(`React ReceivePumpsStatusChange: ${user}:${name}-${status}`);
        if (name === "pump1") {
            if (status === "Running") {
                setPump1Running(true)
            }
            else if (status === "Stopped") {
                setPump1Running(false)
            }
        }
        else if (name === "pump2") {
            if (status === "Running") {
                setPump2Running(true)
            }
            else if (status === "Stopped") {
                setPump2Running(false)
            }
        }
    });

    return (
        <>
            <Canvas id="three" shadows camera={{ position: [-1.5, 0.45, -4], fov: 40 }}>
                {/* there is a bug if environment="city"*/}
                <Stage environment={null} intensity={1}>
                    <ambientLight intensity={0.9} />
                    <pointLight position={[-2, 2.5, -4]} scale={1} rotation={[Math.PI / 5, 0.1, Math.PI / 2]} intensity={1} power={600} />
                    <Model scale={1}
                        p1running={pump1Running}
                        p2running={pump2Running}
                        clickpump1={pump1Clicked}
                        clickpump2={pump2Clicked}></Model>
                    <AlarmText msg={alarmtext} color={alarmcolor}></AlarmText>
                    <CWText msg={cwNumber}></CWText>
                    <HWText msg={hwNumber}></HWText>
                </Stage>
                <BakeShadows />
                <OrbitControls makeDefault autoRotate={false} />
            </Canvas> 
            {/*<button onClick={sendMessage}>SendMessage</button>*/}
            {/*<button onClick={() => alarmtext.changeMessage('ca')}>{alarmtext.message}</button>*/}
            {/*<button onClick={()=>alarmtext.changeColor('red')}>AlarmColor</button>*/}
        </>
    );
}
export default App