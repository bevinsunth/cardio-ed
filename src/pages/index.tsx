import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as interfaces from '@/components/shared/types';

export const components = {
  notesAreaComponent: dynamic(() => import("@/components/notesArea/NotesArea"), { ssr: false }),
  pressureVolumeLoop: dynamic(() => import("@/components/pressureVolumeLoop/PressureVolumeLoop"), { ssr: false }),
  wiggersDiagram: dynamic(() => import("@/components/wiggersDiagram/wiggers-diagram"), { ssr: false }),
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

  const notesProps = {
    activeLineCode: pressureVolumeActivePointerData?.activeLineCode ?? null,
  };

  return (
    <>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <components.notesAreaComponent {...notesProps} />
        </div>
        <div style={{ flex: 4, display: "flex", flexDirection: "column", height: "100vh" }}>
          <div style={{ flex: 1, overflow: "auto" }}>
            <components.pressureVolumeLoop {...pressureLoopProps} />
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            <components.wiggersDiagram {...wiggersDiagramProps} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;