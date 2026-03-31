export default function TriangleThing({ size = 100, color = "skyblue" }) {
  const width = size * 0.866;
  const height = size;

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)",
      }}
    />
  );
}