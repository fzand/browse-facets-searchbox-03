import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SearchPage = () => {
  const [vrijeTekstZoeken, setVrijeTekstZoeken] = useState('');
  const [autocompleteZoeken, setAutocompleteZoeken] = useState('');
  const [facetten, setFacetten] = useState({
    persoon: false,
    organisatie: false,
    plaats: false,
  });
  const [zoekResultaten, setZoekResultaten] = useState([]);

  const handleZoeken = () => {
    // Gesimuleerde zoekresultaten (vervang door daadwerkelijke API-aanroep)
    const nepResultaten = [
      { type: 'Persoon', label: 'Personen', aantal: 15 },
      { type: 'Organisatie', label: 'Organisaties', aantal: 8 },
      { type: 'Plaats', label: 'Plaatsen', aantal: 12 },
    ];
    setZoekResultaten(nepResultaten);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Linked Data Graaf Zoeken</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Vrije tekst zoeken"
          value={vrijeTekstZoeken}
          onChange={(e) => setVrijeTekstZoeken(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Autocomplete zoeken"
          value={autocompleteZoeken}
          onChange={(e) => setAutocompleteZoeken(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Facet Zoeken</h2>
        <div className="flex space-x-4">
          {Object.entries(facetten).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) => setFacetten({ ...facetten, [key]: checked })}
              />
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleZoeken} className="mb-4">Zoeken</Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zoekResultaten.map((resultaat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resultaat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {resultaat.type}</p>
              <p>Resultaten: {resultaat.aantal}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
