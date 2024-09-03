import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = useParams();
  const searchTerm = location.state?.searchTerm || '';
  const boxName = location.state?.boxName || '';
  const cellValue = location.state?.cellValue || 5; // Default to 5 if not provided
  const isAutocomplete = location.state?.isAutocomplete || false;
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showNoResultAlert, setShowNoResultAlert] = useState(false);

  const [results, setResults] = useState([]);

  useEffect(() => {
    // Generate fake data based on the type and cellValue
    const generateFakeData = () => {
      const types = ['Basisregistratie', 'Sectorregistratie', 'Catalogus', 'Dataset'];
      const organizations = ['BZK', 'DUO', 'RWS', 'CBS', 'IND', 'UWV'];
      
      return Array.from({ length: cellValue }, (_, index) => ({
        type: type ? type : types[Math.floor(Math.random() * types.length)],
        naam: `${type || 'Item'}-${index + 1}`,
        fdsKeurmerk: Math.random() > 0.5 ? 'Ja' : 'Nee',
        organisatie: organizations[Math.floor(Math.random() * organizations.length)],
        informatiemodellen: Math.floor(Math.random() * 5),
        koppelsleutels: Math.floor(Math.random() * 3),
        datasets: Math.floor(Math.random() * 10),
        begrippenkaders: Math.floor(Math.random() * 5),
      }));
    };

    setResults(generateFakeData());
  }, [type, cellValue]);

  const handleBack = () => {
    navigate('/');
  };

  const handleCellClick = (clickedType, value) => {
    if (value === 0) {
      setShowNoResultAlert(true);
    } else if (value > 1) {
      navigate(`/result/${clickedType.toLowerCase()}`, { 
        state: { 
          searchTerm,
          boxName: clickedType,
          cellValue: value,
          isAutocomplete
        } 
      });
    } else if (value === 1) {
      navigate('/detail', { state: { type: clickedType, searchTerm } });
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

  const renderSearchInfo = () => {
    if (isAutocomplete) {
      const fakeUrl = `https://test.example.com/${searchTerm.toLowerCase()}`;
      return (
        <p className="mb-4">Gevonden met de resource: <a href={fakeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{fakeUrl}</a> ({searchTerm})</p>
      );
    } else {
      return <p className="mb-4">Gevonden met de zoekterm(en): "{searchTerm}"</p>;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleBack} className="mb-4">Terug</Button>
      <h1 className="text-3xl font-bold mb-6">Zoekresultaten voor {boxName}</h1>
      {renderSearchInfo()}
      
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader column="type">Type</SortableHeader>
            <SortableHeader column="naam">Naam</SortableHeader>
            <SortableHeader column="fdsKeurmerk">FDS-keurmerk</SortableHeader>
            <SortableHeader column="organisatie">Organisatie</SortableHeader>
            <TableHead className="bg-green-500 text-white">Informatiemodellen</TableHead>
            <TableHead className="bg-green-500 text-white">Koppelsleutels</TableHead>
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
              <TableCell className="bg-green-100 cursor-pointer" onClick={() => handleCellClick('Koppelsleutels', result.koppelsleutels)}>{result.koppelsleutels}</TableCell>
              <TableCell className="bg-red-100 cursor-pointer" onClick={() => handleCellClick('Datasets', result.datasets)}>{result.datasets}</TableCell>
              <TableCell className="bg-purple-100 cursor-pointer" onClick={() => handleCellClick('Begrippenkaders', result.begrippenkaders)}>{result.begrippenkaders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={showNoResultAlert} onOpenChange={setShowNoResultAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Geen resultaat</AlertDialogTitle>
            <AlertDialogDescription>
              Er zijn geen resultaten gevonden voor deze selectie.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Sluiten</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ResultPage;