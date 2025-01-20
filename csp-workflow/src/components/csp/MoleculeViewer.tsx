import React, { useEffect, useRef } from 'react';
import * as $3Dmol from '3Dmol';

const MoleculeViewer = ({ smiles }: { smiles: string }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current && smiles) {
      const viewer = $3Dmol.createViewer(viewerRef.current, {
        width: '100%',
        height: '100%',
      });

      // Use SMILES string to generate a 3D structure
      viewer.removeAllModels(); // Clear previous models
      viewer.addModel(smiles, 'smiles');
      viewer.setStyle({}, { stick: {} });
      viewer.zoomTo();
      viewer.render();
    }
  }, [smiles]); // Re-render when smiles changes

  return <div ref={viewerRef} style={{ height: '400px' }} />;
};

export default MoleculeViewer;
