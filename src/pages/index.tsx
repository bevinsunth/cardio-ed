import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import * as interfaces from '@/components/shared/types';

export const components = {
  notesAreaComponent: dynamic(() => import("@/components/notesArea/NotesArea"), { ssr: false }),
  pressureVolumeLoop: dynamic(() => import("@/components/pressureVolumeLoop/PressureVolumeLoop"), { ssr: false }),
  wiggersDiagram: dynamic(() => import("@/components/wiggersDiagram/WiggersDiagram"), { ssr: false }),
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

  useEffect(() => {
    document.body.style.fontFamily = 'Arial, Helvetica, sans-serif';
  }, []);

  return (
    <>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 2.5, display: "flex", flexDirection: "column", padding: "5px", alignItems: "center", height: "98vh" }}>
          <components.notesAreaComponent {...notesProps} />
        </div>
        <div style={{ flex: 4.5, display: "flex", flexDirection: "column", padding: "0px", height: "98vh" }}>
          <div style={{ flex: 1,display: "flex", overflow: "hidden", padding: "2px" }}>
            <components.pressureVolumeLoop {...pressureLoopProps} />
          </div>
          <div style={{ flex: 1,display: "flex",overflow: "hidden", padding: "2px" }}>
            <components.wiggersDiagram {...wiggersDiagramProps} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;