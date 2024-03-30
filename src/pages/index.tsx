import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as interfaces from '@/models/interfaces';

export const components = {
  pressureVolumeLoop: dynamic(() => import("@/components/PressureVolumeLoop"), { ssr: false }),
  wiggersDiagram: dynamic(() => import("@/components/WiggersDiagram"), { ssr: false }),
};


const Home: React.FC = () => {
  const [pressureVolumeActivePointerData, setPressureVolumeActivePointerData] = useState<interfaces.PressureVolumeActivePointerData | null>(null);
  const [wiggersActivePointerData, setWiggersActivePointerData] = useState<interfaces.WiggersActivePointerData | null>(null);

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
<div style={{ display: "flex", justifyContent: "center" }}>
  <components.pressureVolumeLoop {...pressureLoopProps} />
  <components.wiggersDiagram {...wiggersDiagramProps} />
</div>
    </>
  );
};

export default Home;