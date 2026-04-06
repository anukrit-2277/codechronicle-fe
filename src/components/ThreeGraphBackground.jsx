import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function deterministicUnit(index, seed = 1) {
    const x = Math.sin((index + 1) * (seed * 12.9898)) * 43758.5453
    return x - Math.floor(x)
}

function GraphNodes({ count = 80 }) {
    const mesh = useRef()

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)
        const sizes = new Float32Array(count)

        const palette = [
            [0.133, 0.827, 0.933],  // cyan
            [0.655, 0.545, 0.980],  // purple
            [0.376, 0.647, 0.980],  // blue
        ]

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (deterministicUnit(i, 1) - 0.5) * 40
            positions[i * 3 + 1] = (deterministicUnit(i, 2) - 0.5) * 30
            positions[i * 3 + 2] = (deterministicUnit(i, 3) - 0.5) * 25

            const c = palette[Math.floor(deterministicUnit(i, 4) * palette.length)]
            colors[i * 3] = c[0]
            colors[i * 3 + 1] = c[1]
            colors[i * 3 + 2] = c[2]

            sizes[i] = deterministicUnit(i, 5) * 0.08 + 0.02
        }

        return { positions, colors, sizes }
    }, [count])

    useFrame((state) => {
        const time = state.clock.elapsedTime
        if (mesh.current) {
            const pos = mesh.current.geometry.attributes.position.array
            for (let i = 0; i < count; i++) {
                pos[i * 3] += Math.sin(time * 0.06 + i * 0.5) * 0.0004
                pos[i * 3 + 1] += Math.cos(time * 0.04 + i * 0.3) * 0.0004
            }
            mesh.current.geometry.attributes.position.needsUpdate = true
            mesh.current.rotation.y = time * 0.006
        }
    })

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count}
                    array={particles.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                vertexColors
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    )
}

function GraphEdges({ count = 40 }) {
    const linesRef = useRef()

    const lines = useMemo(() => {
        const positions = new Float32Array(count * 6)
        const colors = new Float32Array(count * 6)

        for (let i = 0; i < count; i++) {
            const x1 = (deterministicUnit(i, 6) - 0.5) * 36
            const y1 = (deterministicUnit(i, 7) - 0.5) * 28
            const z1 = (deterministicUnit(i, 8) - 0.5) * 20
            const x2 = x1 + (deterministicUnit(i, 9) - 0.5) * 8
            const y2 = y1 + (deterministicUnit(i, 10) - 0.5) * 6
            const z2 = z1 + (deterministicUnit(i, 11) - 0.5) * 6

            positions[i * 6] = x1
            positions[i * 6 + 1] = y1
            positions[i * 6 + 2] = z1
            positions[i * 6 + 3] = x2
            positions[i * 6 + 4] = y2
            positions[i * 6 + 5] = z2

            const alpha = 0.15
            colors[i * 6] = 0.133 * alpha
            colors[i * 6 + 1] = 0.827 * alpha
            colors[i * 6 + 2] = 0.933 * alpha
            colors[i * 6 + 3] = 0.655 * alpha
            colors[i * 6 + 4] = 0.545 * alpha
            colors[i * 6 + 5] = 0.980 * alpha
        }

        return { positions, colors }
    }, [count])

    useFrame((state) => {
        if (linesRef.current) {
            linesRef.current.rotation.y = state.clock.elapsedTime * 0.005
            linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.02
        }
    })

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count * 2}
                    array={lines.positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-color"
                    count={count * 2}
                    array={lines.colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial
                vertexColors
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </lineSegments>
    )
}

function FloatingOrbs() {
    const group = useRef()

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = state.clock.elapsedTime * 0.015
        }
    })

    return (
        <group ref={group}>
            {[...Array(8)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        Math.sin(i * 0.9) * 14,
                        Math.cos(i * 1.1) * 10,
                        Math.sin(i * 1.5) * 8 - 5,
                    ]}
                >
                    <sphereGeometry args={[0.15 + i * 0.05, 16, 16]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? '#22d3ee' : '#a78bfa'}
                        transparent
                        opacity={0.2}
                    />
                </mesh>
            ))}
        </group>
    )
}

export default function ThreeGraphBackground() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 10], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: false,
                    alpha: true,
                    powerPreference: 'high-performance'
                }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.2} />
                <GraphNodes />
                <GraphEdges />
                <FloatingOrbs />
            </Canvas>
        </div>
    )
}
