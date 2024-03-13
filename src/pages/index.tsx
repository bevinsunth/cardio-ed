import PressureVolumeLoop from '@/components/PressureVolumeLoop';

import dynamic from "next/dynamic";

export const components = {
  // wiggers_diagram: dynamic(() => import("@/components/WiggersDiagramD3"), {ssr: false}),
  singleLineGraph: dynamic(() => import("@/components/SingleLineGraph"), {ssr: false}),
};


const Home: React.FC = () => {
  return (
    <>
    {/* <PressureVolumeLoop /> */}
    {/* <components.wiggers_diagram /> */}
    <components.singleLineGraph />
    </>
  );
};

export default Home;