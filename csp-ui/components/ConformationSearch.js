import { useEffect, useState } from 'react';
import axios from 'axios';
import MoleculeVisualizer from './MoleculeVisualizer';

const ConformationSearch = () => {
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://molconsul-api.hpc3.aganitha.ai/api/v1/run_pipeline');
        
        // Ensure that the response data contains the cluster data and moleculeData
        if (response.data && response.data.clusters) {
          setClusters(response.data.clusters);
        } else {
          console.error("Data structure is not as expected.");
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">3D Conformation Search</h1>
      {loading ? (
        <p>Loading clusters...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {clusters.length > 0 ? (
            clusters.map((cluster, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="font-bold text-xl">{cluster.name}</h2>
                {/* Pass the molecule data to the MoleculeVisualizer component */}
                <MoleculeVisualizer moleculeData={cluster.moleculeData} />
              </div>
            ))
          ) : (
            <p>No clusters found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConformationSearch;
