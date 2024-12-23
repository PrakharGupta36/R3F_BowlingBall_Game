import { INTENSITY, POSITION_NUMBER } from "../utils/constants";

export default function Lights() {
  // Define the light positions in an array
  const lightPositions = [
    [POSITION_NUMBER, POSITION_NUMBER, POSITION_NUMBER],
    [-POSITION_NUMBER, POSITION_NUMBER, POSITION_NUMBER],
  ];

  return (
    <>
      <ambientLight intensity={3} />
      {lightPositions.map((position, index) => (
        <pointLight
          key={ index }
          castShadow
          position={position as [number, number, number]}
          intensity={INTENSITY}
        />
      ))}
    </>
  );
}
