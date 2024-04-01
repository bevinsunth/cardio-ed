import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as interfaces from '@/models/interfaces';

export const components = {
  noteAreaComponent: dynamic(() => import("@/components/NoteAreaComponent"), { ssr: false }),
  pressureVolumeLoop: dynamic(() => import("@/components/PressureVolumeLoop"), { ssr: false }),
  wiggersDiagram: dynamic(() => import("@/components/WiggersDiagram"), { ssr: false }),
};


const Home: React.FC = () => {
  const [pressureVolumeActivePointerData, setPressureVolumeActivePointerData] = useState<interfaces.PressureVolumeActivePointerData| null>(null);
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

<div style={{ display: 'flex' }}>
<div  style={{ flex:1, display: "flex", flexDirection: "column", alignItems: "center" }}>
    <components.noteAreaComponent />
  </div>
<div style={{ flex: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
  <components.pressureVolumeLoop {...pressureLoopProps} />
  <components.wiggersDiagram {...wiggersDiagramProps} />
</div>
</div>
    </>
  );
};

export default Home;