import { useEffect, useState } from 'react'
import { LoadingManager } from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls } from '@react-three/drei'
import Scene from './components/Scene'
import { useStore } from './store'

export default function App() {


  const { saveScene } = useStore(state => state)
  const [gltf, setGltf] = useState<GLTF>(null!)
  const loadingManager = new LoadingManager()
  const gltfLoader = new GLTFLoader(loadingManager)

  useEffect(() => {

    fetch("http://localhost:3000/v1/design/6797687e885ce11612608490").then(response => {
      response.json().then(data => {
        gltfLoader.parse(data.gltf, '/', (gltf) => {
          setGltf(gltf)
          console.info(gltf)
        })
      })
    })

  }, [])

  return (
    <>
      <Canvas>
        <Environment preset='apartment' />
        <Scene gltf={gltf} />
        <OrbitControls />
        {/* <Perf
          matrixUpdate
          deepAnalyze
          overClock /> */}
      </Canvas>
      <div style={{ zIndex: 10000000, width: '250px', position: 'absolute', top: 10, left: 10 }}>
        <button onClick={() => saveScene()}>Save</button>
      </div>
    </>
  )

}
