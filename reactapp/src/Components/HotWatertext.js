import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '../fonts/helvetiker_regular.typeface.json'

extend({ TextGeometry })

export default function HWText(props) {
	const font = new FontLoader().parse(myFont);
	return (
		<mesh position={[-1.3, 1.5, -3.4]} rotation={[0, Math.PI, 0]}>
			<textGeometry args={[`Hot Water T:${props.msg} C`, { font, size: 0.05, height: 0.01 }]} />
			<meshLambertMaterial attach='material' color={'red'} />
		</mesh>
	)
}