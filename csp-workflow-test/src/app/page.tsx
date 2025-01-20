"use client";
import { useState } from 'react';
import Tab from '../components/Tab';
import Conformer3D from '../components/Conformer3D';

const Home = () => {
  const [smiles, setSmiles] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [inputSMILES, setInputSMILES] = useState('');

  const handleSMILESChange = (e) => setInputSMILES(e.target.value);

  const handleSMILESSubmit = () => {
    setSmiles(inputSMILES);
    setActiveTab(0); // Switch to the first tab to view the 3D model
  };

  return (
    <div>
      <h1>Crystal Structure Prediction (CSP) Workflow</h1>
      <Tab
        tabs={['3D Conformation Search', 'Advanced Screening', 'Final Screening']}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      >
        <div>
          <h2>Enter SMILES String</h2>
          <input
            type="text"
            value={inputSMILES}
            onChange={handleSMILESChange}
            placeholder="e.g. CC(=O)OC1=CC=CC=C1C(=O)O"
          />
          <button onClick={handleSMILESSubmit}>Generate 3D Conformer</button>
          {smiles && <Conformer3D smiles={smiles} />}
        </div>
        <div>
          {/* Advanced Screening content */}
        </div>
        <div>
          {/* Final Screening content */}
        </div>
      </Tab>
    </div>
  );
};

export default Home;
