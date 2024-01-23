import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '../fonts/helvetiker_regular.typeface.json'

extend({ TextGeometry })

export default function CWText(props) {
	const font = new FontLoader().parse(myFont);
	console.log(props)
	return (
		<mesh position={[-0.4, 0.8, -2.8]} rotation={[0, Math.PI, 0]}>
			<textGeometry args={[`Cooling Water T:${props.msg} C`, { font, size: 0.05, height: 0.01 }]}/>
			{/*<textGeometry args={[temperature, { font, size: 0.05, height: 0.01 }]} />*/}
			<meshLambertMaterial attach='material' color={'blue'} />
		</mesh>
	)
}