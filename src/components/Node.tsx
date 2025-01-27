import { Object3D, Object3DEventMap } from "three"

export default function Node({ children }: { children: Object3D<Object3DEventMap>[] }) {

    return children.map(child =>
        (child.type === 'Group' || child.type === 'Object3D') ?
            (
                <Node key={child.uuid}>
                    {child.children}
                </Node>
            ) : (
                // @ts-ignore

                <mesh key={child.uuid} {...child} />
            ))
}

