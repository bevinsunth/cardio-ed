import PressureVolumeLoop from '@/components/PressureVolumeLoop';
import WiggersDiagram from '@/components/WiggersDiagram';
import SourceImage from '@/components/SourceImage';
import TargetImage from '@/components/TargetImage';


const Home: React.FC = () => {
  return (
    <>
    <PressureVolumeLoop />
    <WiggersDiagram />
    </>
  );
};

export default Home;