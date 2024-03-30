import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as interfaces from '@/models/interfaces';

export const components = {
  pressureVolumeLoop: dynamic(() => import("@/components/PressureVolumeLoop"), {ssr: false}),
  wiggersDiagram: dynamic(() => import("@/components/WiggersDiagram"), {ssr: false}),
};


const Home: React.FC = () => {
  const [pressureVolumeActivePointerData , setPressureVolumeActivePointerData] = useState<interfaces.PressureVolumeActivePointerData|null>(null);
  const [wiggersActivePointerData, setWiggersActivePointerData] = useState<interfaces.WiggersActivePointerData| null>(null);

  const pressureLoopProps = {
    wiggersActivePointerData: wiggersActivePointerData,
    setPressureVolumeActivePointerData: setPressureVolumeActivePointerData,
  };

  const wiggersDiagramProps = {
    pressureVolumeActivePointerData: pressureVolumeActivePointerData,
    setWiggersActivePointerData: setWiggersActivePointerData,
  };

  return (
    <>
      <components.pressureVolumeLoop {...pressureLoopProps}/>
      <br/>
      <components.wiggersDiagram {...wiggersDiagramProps}/>
    </>
  );
};

export default Home;