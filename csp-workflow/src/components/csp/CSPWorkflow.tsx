"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ScatterChart, Scatter } from "recharts";

const CSPWorkflow = () => {
  const [selectedConformer, setSelectedConformer] = useState(null);
  const [crystalParams, setCrystalParams] = useState({
    candidates: "",
    method: "PyXtal",
    spaceGroup: "",
    molecules: "",
  });

  const densityData = [
    { x: 1, y: 1.2, name: "Structure 1" },
    { x: 2, y: 1.4, name: "Structure 2" },
    { x: 3, y: 1.1, name: "Structure 3" },
  ];

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
          <TabsTrigger
            value="conformers"
            className="hover:bg-gradient-to-r hover:from-purple-100 hover:to-blue-100 transition-colors"
          >
            3D Conformers
          </TabsTrigger>
          <TabsTrigger
            value="crystal"
            className="hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-colors"
          >
            Crystal Structure
          </TabsTrigger>
          <TabsTrigger
            value="screening"
            className="hover:bg-gradient-to-r hover:from-pink-100 hover:to-blue-100 transition-colors"
          >
            Screening
          </TabsTrigger>
        </TabsList>

        <TabsContent value="conformers">
          <Card className="bg-white/90 shadow-lg rounded-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-blue-600 font-bold">
                3D Conformation Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="h-64 border rounded-lg bg-gradient-to-br from-white to-gray-100 p-4 flex items-center justify-center shadow-sm">
                    <p className="text-gray-500">3D Structure Viewer</p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="SMILES Input"
                      className="flex-1 shadow-inner border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="border rounded-lg p-4 bg-gradient-to-bl from-gray-50 to-white shadow-md">
                  <h3 className="font-semibold mb-2 text-purple-600">
                    Top 5 Conformers
                  </h3>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded shadow-sm text-gray-700"
                      >
                        Conformer {i}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crystal">
          <Card className="bg-white/90 shadow-lg rounded-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600 font-bold">
                Crystal Structure Generation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Select defaultValue="PyXtal">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PyXtal">PyXtal</SelectItem>
                      <SelectItem value="Crystalmath">Crystalmath</SelectItem>
                      <SelectItem value="CDVAE">CDVAE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Space Group (Sg)" />
                  <Input placeholder="Molecules in Unit Cell (Z)" />
                  <Input placeholder="Number of Candidates" />
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="screening">
          <Card className="bg-white/90 shadow-lg rounded-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg text-pink-600 font-bold">
                Preliminary Screening
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-64 border rounded-lg bg-gradient-to-bl from-white to-gray-50 p-4 shadow-lg">
                  <ScatterChart width={400} height={200} data={densityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" name="Density" />
                    <YAxis dataKey="y" name="Lattice Energy" />
                    <Tooltip />
                    <Scatter name="Structures" data={densityData} fill="#E53E3E" />
                  </ScatterChart>
                </div>
                <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-white shadow-md">
                  <h3 className="font-semibold mb-2 text-red-600">
                    Ranked Structures
                  </h3>
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">Rank</th>
                        <th className="text-left">LE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {densityData.map((structure, i) => (
                        <tr key={i} className="hover:bg-gray-100">
                          <td>{structure.name}</td>
                          <td>{i + 1}</td>
                          <td>{structure.y.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CSPWorkflow;
