import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ResultPage = () => {
  const { type } = useParams();
  const location = useLocation();
  const searchTerm = location.state?.searchTerm || '';

  // Fake data for demonstration
  const results = [
    { type: 'Basisregistratie', naam: 'BRTQ', fdsKeurmerk: 'Nee', organisatie: 'BZK', informatiemodellen: 1, koppelsleutels: 0, datasets: 1, begrippenkaders: 1 },
    { type: 'Basisregistratie', naam: 'BRLO', fdsKeurmerk: 'Ja', organisatie: 'BZK', informatiemodellen: 2, koppelsleutels: 1, datasets: 5, begrippenkaders: 4 },
    { type: 'Sectorregistratie', naam: 'SRRM', fdsKeurmerk: 'Ja', organisatie: 'DUO', informatiemodellen: 1, koppelsleutels: 0, datasets: 2, begrippenkaders: 2 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
      <p className="mb-4">Gevonden met de zoekterm(en): "{searchTerm}"</p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Naam</TableHead>
            <TableHead>FDS-keurmerk</TableHead>
            <TableHead>Organisatie</TableHead>
            <TableHead>Informatiemodellen</TableHead>
            <TableHead>Koppelsleutels</TableHead>
            <TableHead>Datasets</TableHead>
            <TableHead>Begrippenkaders</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={index}>
              <TableCell>{result.type}</TableCell>
              <TableCell>{result.naam}</TableCell>
              <TableCell>{result.fdsKeurmerk}</TableCell>
              <TableCell>{result.organisatie}</TableCell>
              <TableCell>{result.informatiemodellen}</TableCell>
              <TableCell>{result.koppelsleutels}</TableCell>
              <TableCell>{result.datasets}</TableCell>
              <TableCell>{result.begrippenkaders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultPage;