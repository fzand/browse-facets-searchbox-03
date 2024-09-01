import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [freeTextSearch, setFreeTextSearch] = useState('');
  const [autocompleteSearch, setAutocompleteSearch] = useState('');
  const [facets, setFacets] = useState({
    thema: '',
    organization: '',
    bron: '',
  });
  const [searchResults, setSearchResults] = useState([]);

  const organizations = [
    "TechInnovate Corp",
    "GreenEarth Solutions",
    "GlobalHealth Initiative",
    "FinanceWise Group",
    "EduFuture Academy",
    "ArtisanCraft Collective",
    "SpaceVoyage Enterprises"
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
    "Smart Cities",
    "Gezondheidszorg Innovatie",
    "Ruimte-exploratie",
    "Oceaanbehoud",
    "Voedselzekerheid",
    "Cyberveiligheid"
  ];

  const handleSearch = () => {
    // Simulated search results (replace with actual API call)
    const mockResults = [
      { type: 'Thema', label: 'Themes', count: 15 },
      { type: 'Organization', label: 'Organizations', count: 8 },
      { type: 'Bron', label: 'Sources', count: 12 },
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Linked Data Graph Search</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Input
          type="text"
          placeholder="Free text search"
          value={freeTextSearch}
          onChange={(e) => setFreeTextSearch(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Autocomplete search"
          value={autocompleteSearch}
          onChange={(e) => setAutocompleteSearch(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Facet Search</h2>
        <div className="flex flex-wrap gap-4">
          {Object.entries(facets).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Label htmlFor={key} className="w-24">
                {key.charAt(0).toUpperCase() + key.slice(1)}:
              </Label>
              <Select onValueChange={(value) => setFacets({ ...facets, [key]: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={`Select ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  {(key === 'organization' ? organizations :
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

      <Button onClick={handleSearch} className="mb-4">Search</Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {searchResults.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{result.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Type: {result.type}</p>
              <p>Results: {result.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;
