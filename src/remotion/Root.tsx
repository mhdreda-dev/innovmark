import { Composition } from "remotion";
import { FiveBarChart } from "./components/FiveBarChart";

export const RemotionRoot = () => {
  return (
    <Composition
      id="FiveBarChart"
      component={FiveBarChart}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
