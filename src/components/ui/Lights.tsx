export default function Lights() {
  return (
    <>
        <ambientLight intensity={3} />
        <directionalLight position={[-50, 0, 30]} intensity={2.5} />
        <pointLight position={[0, -5, 10]} intensity={2} />
    </>
  )
}