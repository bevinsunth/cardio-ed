import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

export const components = {
  pressureVolumeLoop: dynamic(() => import("@/components/PressureVolumeLoop"), {ssr: false}),
  multilineLineGraph: dynamic(() => import("@/components/WiggersDiagram"), {ssr: false}),
};


const Home: React.FC = () => {
  const [pressureVolumeLoopPointer, setPressureLoopPointer] = useState(null);
  const [wiggersDiagramPointer, setWiggersDiagramPointer] = useState(null);

  return (
    <>
      <components.pressureVolumeLoop wiggersDiagramPointer={wiggersDiagramPointer}  setPressureLoopPointer={setPressureLoopPointer}/>
      <br/>
      <components.multilineLineGraph pressureVolumeLoopPointer={pressureVolumeLoopPointer} setWiggersDiagramPointer={setWiggersDiagramPointer} />
    </>
  );
};

export default Home;