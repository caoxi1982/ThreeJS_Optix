//import * as THREE from 'three'
//import { useRef, useState } from 'react'
//import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
//import { FontLoader } from 'three/addons/loaders/FontLoader.js';
////import { helvetiker } from '../fonts/helvetiker_regular.typeface.json'


////const font = new FontLoader().load('../fonts/helvetiker_regular.typeface.json');

////// configure font geometry
////const textOptions = {
////	font,
////	size: 5,
////	height: 1
////};

//export default function Text(props) {
//	const mesh = useRef(null);
//    const [textOptions, setTextOptions] = useState();

//	const loader = new FontLoader();
//	loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
//		setTextOptions({
//			font: font,
//			size: 80,
//			height: 5,
//			curveSegments: 12,
//			bevelEnabled: true,
//			bevelThickness: 10,
//			bevelSize: 8,
//			bevelOffset: 0,
//			bevelSegments: 5
//		});
//	});

//    return (

//        <mesh position={[0, 0, -10]} ref={mesh}>
//            <TextGeometry attach='geometry' args={['three.js', textOptions]} />
//            <meshBasicMaterial attach='material'  />
//        </mesh>
//            )
//}



import { extend } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import myFont from '../fonts/helvetiker_regular.typeface.json'

extend({ TextGeometry })

export default function AlarmText() {
	const font = new FontLoader().parse(myFont);

	return (
		<mesh position={[1, 1, 1]}>
			<textGeometry args={['Optix8898', { font, size: 1, height: 1 }]} />
			<meshLambertMaterial attach='material' color={'gold'} />
		</mesh>
	)
}