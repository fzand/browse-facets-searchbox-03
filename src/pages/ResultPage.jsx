import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchTerm = location.state?.searchTerm || '';
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Fake data for demonstration
  const [results, setResults] = useState([
    { type: 'Basisregistratie', naam: 'BRTQ', fdsKeurmerk: 'Nee', organisatie: 'BZK', informatiemodellen: 1, koppelsleutels: 0, datasets: 1, begrippenkaders: 1 },
    { type: 'Basisregistratie', naam: 'BRLO', fdsKeurmerk: 'Ja', organisatie: 'BZK', informatiemodellen: 2, koppelsleutels: 1, datasets: 5, begrippenkaders: 4 },
    { type: 'Sectorregistratie', naam: 'SRRM', fdsKeurmerk: 'Ja', organisatie: 'DUO', informatiemodellen: 1, koppelsleutels: 0, datasets: 2, begrippenkaders: 2 },
  ]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCellClick = (type, value) => {
    if (value > 1) {
      navigate(`/result/${type.toLowerCase()}`, { state: { searchTerm } });
    } else if (value === 1) {
      navigate('/detail', { state: { type, searchTerm } });
    }
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);

    const sortedResults = [...results].sort((a, b) => {
      if (a[column] < b[column]) return isAsc ? 1 : -1;
      if (a[column] > b[column]) return isAsc ? -1 : 1;
      return 0;
    });

    setResults(sortedResults);
  };

  const SortableHeader = ({ column, children }) => (
    <TableHead 
      className="bg-blue-600 text-white cursor-pointer"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center">
        {children}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    </TableHead>
  );

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleBack} className="mb-4">Terug</Button>
      <h1 className="text-3xl font-bold mb-6">Zoekresultaten</h1>
      <p className="mb-4">Gevonden met de zoekterm(en): "{searchTerm}"</p>
      
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="type">Type</SortableHeader>
            <SortableHeader column="naam">Naam</SortableHeader>
            <SortableHeader column="fdsKeurmerk">FDS-keurmerk</SortableHeader>
            <SortableHeader column="organisatie">Organisatie</SortableHeader>
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
              <TableCell className="bg-green-100 cursor-pointer" onClick={() => handleCellClick('Informatiemodellen', result.informatiemodellen)}>{result.informatiemodellen}</TableCell>
              <TableCell className="bg-yellow-100 cursor-pointer" onClick={() => handleCellClick('Koppelsleutels', result.koppelsleutels)}>{result.koppelsleutels}</TableCell>
              <TableCell className="bg-red-100 cursor-pointer" onClick={() => handleCellClick('Datasets', result.datasets)}>{result.datasets}</TableCell>
              <TableCell className="bg-purple-100 cursor-pointer" onClick={() => handleCellClick('Begrippenkaders', result.begrippenkaders)}>{result.begrippenkaders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ResultPage;