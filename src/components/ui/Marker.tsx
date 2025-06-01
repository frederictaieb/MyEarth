import { gpsToCartesian } from '../../utils/geo';


export default function Marker(props:any) {
    const lat = props.lat;
    const lon = props.lon;
    const radius = props.radius;
    const color = props.color;

    const pos = gpsToCartesian(lat, lon, 10);
    
    return (
      <mesh position={pos}>
        <sphereGeometry args={[0.1, 64, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
    );
}