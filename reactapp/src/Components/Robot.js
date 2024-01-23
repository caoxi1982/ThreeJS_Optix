/* This file was initially auto-generated by https://github.com/pmndrs/gltfjsx and then adapted manually */

import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useEffect ,useState} from 'react'

export default function Robot({ color, ...props }) {
    //const font = new THREE.FontLoader().parse(Roboto);

    // configure font geometry
    const textOptions = {
        //font,
        size: 5,
        height: 1
    };
    const { scene } = useGLTF('/scene.gltf')
    const [active,setAvtive] = useState(false);

    useEffect(() => {
        console.log(scene, "robots");
        console.log(color, "color");
        scene.traverse(function (obj) {
            //if (obj.name === 'Object_38') {
            //    console.log(obj, "obj")
            //    obj.material.color = new THREE.Color(0, 1, 0);
            //}
            if (obj.name === 'Object_42') {
                console.log(obj, "obj")
                obj.material.color = color;
            }
        });
    }, [scene,color])
    // The following is a read-out of the models contents, all of its
    // meshes, groups and so on.
    return (
        <group {...props} dispose={null}>
            {/* We can alter materials by piercing into them: materia-property={...} */}
            <primitive object={scene} scale={active ? 1.5 : 3}
                onClick={() => setAvtive(!active)} />
        </group>
    )
}
