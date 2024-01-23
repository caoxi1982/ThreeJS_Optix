import { extend } from '@react-three/fiber'
import { useState }from 'react'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '../fonts/helvetiker_regular.typeface1.json'
//import myChineseFont from '../fonts/Microsoft YaHei_Regular.json'

extend({ TextGeometry })

export default function AlarmText(props) {
	const [myfont, setMyFont] = useState(new FontLoader().parse(myFont));
	return (
		<mesh position={[1.5, 2, -3]} rotation={[0, Math.PI, 0]} >
			<textGeometry args={[props.msg, { font: myfont, size: 0.15, height: 0.05 }]} />
			<meshLambertMaterial attach='material' color={props.color} />
		</mesh>
	)
}