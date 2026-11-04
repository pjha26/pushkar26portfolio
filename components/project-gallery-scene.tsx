'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { MathUtils, Mesh, PlaneGeometry, SRGBColorSpace } from 'three'

function CurvedPreview({ texture, offset, paused }: { texture: ReturnType<typeof useTexture<string>>; offset: number; paused: boolean }) {
  const mesh = useRef<Mesh>(null)
  const invalidate = useThree(state => state.invalidate)
  const geometry = useMemo(() => {
    const plane = new PlaneGeometry(7, 3.3, 48, 1)
    const vertices = plane.attributes.position
    for (let index = 0; index < vertices.count; index++) {
      vertices.setZ(index, .65 * (vertices.getX(index) / 3.5) ** 2)
    }
    plane.computeVertexNormals()
    return plane
  }, [])
  const side = offset === 3 ? -1 : offset === 1 ? 1 : 0
  const targetX = side * 5.2
  const targetZ = side ? -1.4 : 0
  const targetRotation = side * -.48
  useEffect(() => invalidate(), [offset, paused, invalidate])
  useFrame((_, delta) => {
    const node = mesh.current
    if (!node) return
    const ease = paused ? 1 : 1 - Math.exp(-Math.min(delta, .05) * 9)
    node.position.x = MathUtils.lerp(node.position.x, targetX, ease)
    node.position.z = MathUtils.lerp(node.position.z, targetZ, ease)
    node.rotation.y = MathUtils.lerp(node.rotation.y, targetRotation, ease)
    const unsettled = Math.abs(node.position.x - targetX) + Math.abs(node.rotation.y - targetRotation)
    if (unsettled > .001) invalidate()
  })
  return <mesh ref={mesh} geometry={geometry} visible={offset !== 2}><meshBasicMaterial map={texture} toneMapped={false} /></mesh>
}

function Screens({ images, selected, paused, onReady }: { images: string[]; selected: number; paused: boolean; onReady: () => void }) {
  const textures = useTexture(images)
  textures.forEach(texture => { texture.colorSpace = SRGBColorSpace })
  useEffect(onReady, [onReady])
  return <>{textures.map((texture, index) => <CurvedPreview key={images[index]} texture={texture} offset={(index - selected + images.length) % images.length} paused={paused} />)}</>
}

export default function ProjectGalleryScene({ images, selected, onReady }: { images: string[]; selected: number; onReady: () => void }) {
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setPaused(reduced.matches || document.documentElement.dataset.motion === 'paused')
    const observer = new MutationObserver(update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    reduced.addEventListener('change', update)
    update()
    return () => { observer.disconnect(); reduced.removeEventListener('change', update) }
  }, [])
  return (
    <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 30 }} gl={{ alpha: true, antialias: true }} fallback={null}>
      <Suspense fallback={null}><Screens images={images} selected={selected} paused={paused} onReady={onReady} /></Suspense>
    </Canvas>
  )
}
