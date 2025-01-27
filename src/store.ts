import { GLTFExporter } from "three/examples/jsm/Addons.js";
import { create } from "zustand";

type Store = {

    scene: any
    setScene: Function
    saveScene: Function

}

export const useStore = create<Store>((set, get) => ({

    scene: null,
    setScene: (scene: any) => set({ scene }),
    saveScene: () => {

        const { scene } = get()
        const exporter = new GLTFExporter()

        exporter.parse(
            scene,
            function (result) {

                const body = {
                    project: "678fbd829f555a6163a5dc70",
                    name: "tetsing edisng",
                    gltf: result
                }

                fetch("http://localhost:3000/v1/design/6797687e885ce11612608490", {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then(() => {

                    console.info('saved')
                })
            },
            function (error) {
                console.log('An error happened');
            },
            {}
        )
    }
}))
