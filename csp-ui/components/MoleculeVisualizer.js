import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { NGL } from '3dmol';

const MoleculeVisualizer = ({ moleculeData }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = NGL.viewer(viewerRef.current);
    
    if (moleculeData) {
      viewer.addModel(moleculeData, 'mol');
      viewer.zoomTo();
      viewer.render();
    }

    return () => {
      if (viewer) {
        viewer.remove();
      }
    };
  }, [moleculeData]);

  return <div ref={viewerRef} style={{ width: '100%', height: '500px' }} />;
};

export default MoleculeVisualizer;
