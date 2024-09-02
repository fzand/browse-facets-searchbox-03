import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const searchTypes = ["Vrije tekst", "Autocomplete"];

const fakeData = [
  "Amsterdam (Organisatie)", "Belastingdienst (Organisatie)", "Circulaire economie (Begrip)",
  "Datamodel (Informatiemodel)", "Energielabel (Registratie)", "Fietspad (Modelelement)",
  "Gemeente (Organisatie)", "Huisnummer (Koppelsleutel)", "Inkomen (Begrip)",
  "Kadaster (Organisatie)", "Luchtkwaliteit (Dataset)", "Ministerie van BZK (Organisatie)"
];

const filterOptions = {
  thema: ["Economie", "Infrastructuur", "Milieu", "Onderwijs"],
  organisatie: ["Gemeente", "Provincie", "Rijksoverheid", "Waterschap"],
  bron: ["Informatiemodellen", "Datasets", "Begrippenkaders", "Doorzoek alles"]
};

const Index = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState(searchTypes.reduce((acc, type) => ({ ...acc, [type]: '' }), {}));
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    thema: [],
    organisatie: [],
    bron: ["Doorzoek alles"]
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchTerms["Autocomplete"]) {
      const filteredSuggestions = fakeData.filter(item => 
        item.toLowerCase().includes(searchTerms["Autocomplete"].toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerms["Autocomplete"]]);

  const handleInputChange = (type, value) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
    if (type === "Autocomplete") {
      setShowSuggestions(true);
    }
  };

  const handleZoeken = async () => {
    // Simulate search results
    const fakeResults = [
      { type: 'Persoon', label: 'Personen', aantal: 15 },
      { type: 'Organisatie', label: 'Organisaties', aantal: 8 },
      { type: 'Plaats', label: 'Plaatsen', aantal: 12 },
    ];
    setSearchResults(fakeResults);
  };

  const handleFilterChange = (category, item) => {
    if (category === 'bron') {
      if (item === 'Doorzoek alles') {
        setFilters(prev => ({
          ...prev,
          [category]: ['Doorzoek alles']
        }));
      } else {
        setFilters(prev => ({
          ...prev,
          [category]: prev[category].includes('Doorzoek alles')
            ? [item]
            : prev[category].includes(item)
              ? prev[category].filter(i => i !== item)
              : [...prev[category].filter(i => i !== 'Doorzoek alles'), item]
        }));
      }
    } else {
      setFilters(prev => ({
        ...prev,
        [category]: prev[category].includes(item)
          ? prev[category].filter(i => i !== item)
          : [...prev[category], item]
      }));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerms(prev => ({ ...prev, "Autocomplete": suggestion }));
    setShowSuggestions(false);
  };

  const handleResultClick = () => {
    navigate('/result', { state: { searchTerm: searchTerms["Vrije tekst"] || searchTerms["Autocomplete"] } });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">PoC federatieve catalogus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {searchTypes.map((type, index) => (
          <div key={index} className="relative">
            <Input
              type="text"
              placeholder={type}
              value={searchTerms[type]}
              onChange={(e) => handleInputChange(type, e.target.value)}
              className="w-full p-2 border rounded"
            />
            {type === "Autocomplete" && showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded mt-1">
                {suggestions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mb-6">
        {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="mb-4">
            <h3 className="font-semibold mb-2 capitalize">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option}`}
                    checked={filters[category].includes(option)}
                    onCheckedChange={() => handleFilterChange(category, option)}
                  />
                  <Label htmlFor={`${category}-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Button onClick={handleZoeken} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Zoeken
      </Button>

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {searchResults.map((result, index) => (
            <Card key={index} className="cursor-pointer" onClick={handleResultClick}>
              <CardHeader>
                <CardTitle>{result.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Aantal: {result.aantal}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;