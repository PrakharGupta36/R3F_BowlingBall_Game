import { Html } from "@react-three/drei";

export default function Label({
  pin,
}: {
  pin: {
    name: string;
    position: number[];
    id: number;
    isFallen: boolean;
  };
}) {
  return (
    <Html
      center
      position={[
        pin.position[0] + 0.01,
        pin.position[1] + 0.09 + pin.id * 0.015,
        pin.position[2],
      ]}
    >
      <span
        className='text'
        style={{
          color: pin.isFallen ? "green" : "red",
        }}
      >
        {pin.id}
      </span>
    </Html>
  );
}
