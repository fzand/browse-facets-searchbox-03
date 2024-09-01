import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock function to simulate querying a linked data graph
const queryLinkedDataGraph = async (query, facets) => {
  // Simulating an API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock data
  const mockData = [
    { label: 'Thema\'s', aantal: Math.floor(Math.random() * 20) + 1 },
    { label: 'Organisaties', aantal: Math.floor(Math.random() * 15) + 1 },
    { label: 'Bronnen', aantal: Math.floor(Math.random() * 10) + 1 },
  ];

  // Filter based on query and facets
  return mockData.map(item => ({
    ...item,
    aantal: item.aantal - (query.length + Object.values(facets).filter(Boolean).length)
  })).filter(item => item.aantal > 0);
};

const Index = () => {
  const [vrijeTekstZoeken, setVrijeTekstZoeken] = useState('');
  const [autocompleteZoeken, setAutocompleteZoeken] = useState('');
  const [facetten, setFacetten] = useState({
    thema: '',
    organisatie: '',
    bron: '',
  });
  const [zoekResultaten, setZoekResultaten] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const organisaties = [
    "TechInnovatie BV",
    "GroeneAarde Oplossingen",
    "Wereldgezondheid Initiatief",
    "FinanciënWijs Groep",
    "OnderwijsToekomst Academie",
    "AmbachtKunst Collectief",
    "RuimteReis Ondernemingen"
  ];

  const bronnen = [
    "Begrippenkaders",
    "Informatiemodellen",
    "Datasets"
  ];

  const themas = [
    "Klimaatverandering",
    "Digitale Transformatie",
    "Duurzame Energie",
    "Kunstmatige Intelligentie",
    "Biodiversiteit",
    "Circulaire Economie",
    "Slimme Steden",
    "Gezondheidszorg Innovatie",
    "Ruimte-exploratie",
    "Oceaanbehoud",
    "Voedselzekerheid",
    "Cyberveiligheid"
  ];

  const handleZoeken = async () => {
    setIsLoading(true);
    try {
      const resultaten = await queryLinkedDataGraph(vrijeTekstZoeken, facetten);
      setZoekResultaten(resultaten);
    } catch (error) {
      console.error("Error searching linked data graph:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PoC federatieve catalogus</h1>
      
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
        <div className="flex flex-wrap gap-4">
          {Object.entries(facetten).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Label htmlFor={key} className="w-24">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Label>
              <Select onValueChange={(value) => setFacetten({ ...facetten, [key]: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Selecteer ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  {(key === 'organisatie' ? organisaties :
                    key === 'bron' ? bronnen :
                    themas).map((item) => (
                    <SelectItem key={item} value={item}>{item}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={handleZoeken} className="mb-4" disabled={isLoading}>
        {isLoading ? 'Zoeken...' : 'Zoeken'}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zoekResultaten.map((resultaat, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{resultaat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Resultaten: {resultaat.aantal}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
