import PressureVolumeLoop from '@/components/PressureVolumeLoop';

import dynamic from "next/dynamic";

export const components = {
  wiggers_diagram: dynamic(() => import("@/components/WiggersDiagramD3"), {ssr: false}),
};


const Home: React.FC = () => {
  return (
    <>
    {/* <PressureVolumeLoop /> */}
    <components.wiggers_diagram />
    </>
  );
};

export default Home;