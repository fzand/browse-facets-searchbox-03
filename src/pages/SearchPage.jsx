import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const SearchPage = () => {
  const [freeTextSearch, setFreeTextSearch] = useState('');
  const [autocompleteSearch, setAutocompleteSearch] = useState('');
  const [facets, setFacets] = useState({
    person: false,
    organization: false,
    place: false,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // Simulated search results (replace with actual API call)
    const mockResults = [
      { type: 'Person', label: 'People', count: 15 },
      { type: 'Organization', label: 'Organizations', count: 8 },
      { type: 'Place', label: 'Places', count: 12 },
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
        <div className="flex space-x-4">
          {Object.entries(facets).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={(checked) => setFacets({ ...facets, [key]: checked })}
              />
              <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
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

export default SearchPage;