import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

export const LaunchVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "black",
        color: "white",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 80,
        opacity,
      }}
    >
      🚀 My Product Is Live
    </AbsoluteFill>
  );
};