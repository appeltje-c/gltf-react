import { useEffect } from "react";
import Node from "./Node";
import { useThree } from "@react-three/fiber";
import { useStore } from "../store";
import { GLTF } from "three/examples/jsm/Addons.js";

export default function Scene({ gltf }: { gltf: GLTF }) {

    const { scene } = useThree()
    const { setScene } = useStore(state => state)

    useEffect(() => {
        setScene(scene)

        console.info(scene)
    }, [])

    return (
        <>
            {
                gltf &&
                <Node>
                    {gltf.scenes}
                </Node>
            }
        </>
    )
}