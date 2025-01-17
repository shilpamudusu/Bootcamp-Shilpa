import axios from 'axios';

export type APIResponse =
  | { success: true; data: any }
  | { success: false; error: string };

const API_BASE_URL = 'https://molconsul-api.hpc3.aganitha.ai';

export const api = {
  runPipeline: async (smiles: string): Promise<APIResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/run_pipeline/`, {
        smiles
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Pipeline error:', error);
      return { success: false, error: 'Failed to run pipeline' };
    }
  },

  getCrystalStructures: async (params: {
    method: string;
    spaceGroup: string;
    molecules: number;
    candidates: number;
  }): Promise<APIResponse> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/generate_crystal_structures/`, params);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Crystal structure generation error:', error);
      return { success: false, error: 'Failed to generate crystal structures' };
    }
  }
};
