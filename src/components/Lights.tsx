export default function Lights() {
  const INTENSITY = 80;
  const POSITION_NUMBER = 7;

  // Define the light positions in an array
  const lightPositions = [
    [POSITION_NUMBER, POSITION_NUMBER, POSITION_NUMBER],
    [-POSITION_NUMBER, POSITION_NUMBER, -POSITION_NUMBER],
    [-POSITION_NUMBER, POSITION_NUMBER, POSITION_NUMBER],
    [POSITION_NUMBER, POSITION_NUMBER, -POSITION_NUMBER],
  ];

  return (
    <>
      <ambientLight intensity={0.8} />
      {lightPositions.map((position, index) => (
        <pointLight
          key={index}
          castShadow
          position={position as [number,number,number]}
          intensity={INTENSITY}
        />
      ))}
    </>
  );
}
