"use client" ;
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from "recharts";
import { api } from "@/services/api";  // Import the api functions

const CSPWorkflow = () => {
  const [selectedConformer, setSelectedConformer] = useState(null);
  const [crystalParams, setCrystalParams] = useState({
    candidates: "",
    method: "PyXtal",
    spaceGroup: "",
    molecules: "",
  });
  const [smiles, setSmiles] = useState("");  // State for SMILES input
  const [densityData, setDensityData] = useState([
    { x: 1, y: 1.2, name: "Structure 1" },
    { x: 2, y: 1.4, name: "Structure 2" },
    { x: 3, y: 1.1, name: "Structure 3" },
  ]);
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState<string | null>(null); // To track any errors

  const handleRunPipeline = async () => {
    if (!smiles) return;  // Ensure SMILES is provided
    setLoading(true);
    setError(null);
    const response = await api.runPipeline(smiles);
    setLoading(false);

    if (response.success) {
      // Handle successful pipeline run
      console.log('Pipeline result:', response.data);
    } else {
      setError(response.error);
    }
  };

  const handleGenerateCrystalStructures = async () => {
    setLoading(true);
    setError(null);
    const { method, spaceGroup, molecules, candidates } = crystalParams;
    const response = await api.getCrystalStructures({
      method,
      spaceGroup,
      molecules: parseInt(molecules, 10),
      candidates: parseInt(candidates, 10),
    });
    setLoading(false);

    if (response.success) {
      // Handle successful crystal structure generation
      console.log('Crystal Structures:', response.data);
      setDensityData(response.data); // Assuming the API response provides density data
    } else {
      setError(response.error);
    }
  };

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-tr from-[#FDEFF9] via-[#E6E7FF] to-[#D9F4FF] text-gray-800"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8">
        Crystal Structure Prediction Workflow
      </h1>

      <Tabs defaultValue="conformers" className="w-full">
        <TabsList className="bg-white/90 shadow-lg rounded-lg mb-6 border border-gray-200">
          <TabsTrigger value="conformers" className="hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-colors">
            3D Conformers
          </TabsTrigger>
          <TabsTrigger value="crystal" className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-colors">
            Crystal Structure
          </TabsTrigger>
          <TabsTrigger value="screening" className="hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 transition-colors">
            Screening
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conformers">
          {/* 3D Conformer Content */}
          <div className="space-y-4">
            <div className="h-64 border rounded-lg bg-gradient-to-br from-white to-gray-100 p-4 flex items-center justify-center shadow-sm">
              <p className="text-gray-500">3D Structure Viewer</p>
            </div>
            <div className="flex gap-2">
              <Input
                value={smiles}
                onChange={(e) => setSmiles(e.target.value)}
                placeholder="SMILES Input"
                className="flex-1 shadow-inner border border-gray-300 rounded-md"
              />
              <button
                onClick={handleRunPipeline}
                className="bg-blue-600 text-white p-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Running..." : "Run Pipeline"}
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="crystal">
          {/* Crystal Structure Content */}
          <Card className="bg-white/90 shadow-lg rounded-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600 font-bold">
                Crystal Structure Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Select value={crystalParams.method} onValueChange={() => setCrystalParams({ ...crystalParams })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PyXtal">PyXtal</SelectItem>
                      <SelectItem value="Crystalmath">Crystalmath</SelectItem>
                      <SelectItem value="CDVAE">CDVAE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={crystalParams.spaceGroup}
                    onChange={(e) => setCrystalParams({ ...crystalParams, spaceGroup: e.target.value })}
                    placeholder="Space Group (Sg)"
                  />
                  <Input
                    value={crystalParams.molecules}
                    onChange={(e) => setCrystalParams({ ...crystalParams, molecules: e.target.value })}
                    placeholder="Molecules in Unit Cell (Z)"
                  />
                  <Input
                    value={crystalParams.candidates}
                    onChange={(e) => setCrystalParams({ ...crystalParams, candidates: e.target.value })}
                    placeholder="Number of Candidates"
                  />
                </div>
                <div className="h-64 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4 shadow-lg">
                  <h3 className="font-semibold mb-2 text-blue-600">
                    Crystal Density Distribution
                  </h3>
                  <LineChart width={400} height={200} data={densityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="y" stroke="#4C51BF" />
                  </LineChart>
                </div>
              </div>
              <button
                onClick={handleGenerateCrystalStructures}
                className="bg-purple-600 text-white p-2 rounded-md"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Crystal Structures"}
              </button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening">
          {/* Preliminary Screening Content */}
          <div className="h-64 border rounded-lg bg-gradient-to-bl from-white to-gray-50 p-4 shadow-lg">
            <ScatterChart width={400} height={200} data={densityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="Density" />
              <YAxis dataKey="y" name="Lattice Energy" />
              <Tooltip />
              <Scatter name="Structures" data={densityData} fill="#E53E3E" />
            </ScatterChart>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CSPWorkflow;
