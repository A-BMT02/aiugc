import { Composition } from "remotion";
import { LaunchVideo } from "./LaunchVideo";
import { DemoVideo } from "./DemoVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="LaunchVideo"
        component={LaunchVideo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="DemoVideo"
        component={DemoVideo}
        durationInFrames={2910} // 60fps, ~49 seconds
        fps={60}
        width={1920}
        height={1080}
      />
    </>
  );
};