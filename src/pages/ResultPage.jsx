import React from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ResultPage = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state?.searchTerm || '';

  // Fake data for demonstration
  const results = [
    { type: 'Basisregistratie', naam: 'BRTQ', fdsKeurmerk: 'Nee', organisatie: 'BZK', informatiemodellen: 1, koppelsleutels: 0, datasets: 1, begrippenkaders: 1 },
    { type: 'Basisregistratie', naam: 'BRLO', fdsKeurmerk: 'Ja', organisatie: 'BZK', informatiemodellen: 2, koppelsleutels: 1, datasets: 5, begrippenkaders: 4 },
    { type: 'Sectorregistratie', naam: 'SRRM', fdsKeurmerk: 'Ja', organisatie: 'DUO', informatiemodellen: 1, koppelsleutels: 0, datasets: 2, begrippenkaders: 2 },
  ];

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleBack} className="mb-4">Terug</Button>
      <h1 className="text-3xl font-bold mb-6">{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <p className="mb-4">Gevonden met de zoekterm(en): "{searchTerm}"</p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-blue-600 text-white">Type</TableHead>
            <TableHead className="bg-blue-600 text-white">Naam</TableHead>
            <TableHead className="bg-blue-600 text-white">FDS-keurmerk</TableHead>
            <TableHead className="bg-blue-600 text-white">Organisatie</TableHead>
            <TableHead className="bg-green-500 text-white">Informatiemodellen</TableHead>
            <TableHead className="bg-yellow-500 text-white">Koppelsleutels</TableHead>
            <TableHead className="bg-red-500 text-white">Datasets</TableHead>
            <TableHead className="bg-purple-500 text-white">Begrippenkaders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.type}</TableCell>
              <TableCell>{result.naam}</TableCell>
              <TableCell>{result.fdsKeurmerk}</TableCell>
              <TableCell>{result.organisatie}</TableCell>
              <TableCell className="bg-green-100">{result.informatiemodellen}</TableCell>
              <TableCell className="bg-yellow-100">{result.koppelsleutels}</TableCell>
              <TableCell className="bg-red-100">{result.datasets}</TableCell>
              <TableCell className="bg-purple-100">{result.begrippenkaders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultPage;