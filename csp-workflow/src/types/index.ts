export interface CrystalParams {
    candidates: string;
    method: string;
    spaceGroup: string;
    molecules: string;
  }
  
  export interface DensityData {
    x: number;
    y: number;
    name: string;
  }
  
  export interface APIResponse {
    success: boolean;
    data: any;
    error?: string;
  }