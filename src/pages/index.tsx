import dynamic from "next/dynamic";

export const components = {
  pressureVolumeLoop: dynamic(() => import("@/components/PressureVolumeLoop"), {ssr: false}),
  multilineLineGraph: dynamic(() => import("@/components/WiggersDiagram"), {ssr: false}),
};


const Home: React.FC = () => {
  return (
    <>
    <components.pressureVolumeLoop />
    <br/>
    <components.multilineLineGraph />
    </>
  );
};

export default Home;