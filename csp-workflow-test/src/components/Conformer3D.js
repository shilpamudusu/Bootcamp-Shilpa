import { useEffect, useRef } from 'react';
import { App } from '@molstar/molstar';

const Conformer3D = ({ smiles }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const viewer = new App({
      target: containerRef.current,
      layout: { height: '500px' },
    });
    // Load molecule from SMILES string (simulation)
    viewer.loadData(smiles); // Placeholder for actual molecule loading
  }, [smiles]);

  return <div ref={containerRef} style={{ width: '100%' }} />;
};

export default Conformer3D;
