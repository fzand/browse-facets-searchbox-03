import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const searchTypes = ["Vrije tekst", "Autocomplete"];

const resultTypes = [
  "Registraties", "Informatiemodellen", "Koppelsleutels", "Modelelementen",
  "Catalogus", "Datasets", "Distributies", "Dataservices",
  "Begrippenkaders", "Begrippen", "Organisaties", "Toon alles"
];

const fakeData = [
  "Amsterdam (Organisatie)", "Belastingdienst (Organisatie)", "Circulaire economie (Begrip)",
  "Datamodel (Informatiemodel)", "Energielabel (Registratie)", "Fietspad (Modelelement)",
  "Gemeente (Organisatie)", "Huisnummer (Koppelsleutel)", "Inkomen (Begrip)",
  "Kadaster (Organisatie)", "Luchtkwaliteit (Dataset)", "Ministerie van BZK (Organisatie)"
];

const filterOptions = {
  thema: ["Economie", "Infrastructuur", "Milieu", "Onderwijs"],
  organisatie: ["Gemeente", "Provincie", "Rijksoverheid", "Waterschap"],
  bron: ["CBS", "Kadaster", "RIVM", "RDW"]
};

const Index = () => {
  const [searchTerms, setSearchTerms] = useState(searchTypes.reduce((acc, type) => ({ ...acc, [type]: '' }), {}));
  const [suggestions, setSuggestions] = useState([]);
  const [zoekResultaten, setZoekResultaten] = useState({});
  const [filters, setFilters] = useState({
    thema: [],
    organisatie: [],
    bron: []
  });

  useEffect(() => {
    if (searchTerms["Autocomplete"]) {
      const filteredSuggestions = fakeData.filter(item => 
        item.toLowerCase().includes(searchTerms["Autocomplete"].toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerms["Autocomplete"]]);

  const handleInputChange = (type, value) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
  };

  const handleZoeken = async () => {
    // Simulate API call
    const results = {};
    resultTypes.forEach(type => {
      results[type] = Math.floor(Math.random() * 100) + 1;
    });
    setZoekResultaten(results);
  };

  const handleFilterChange = (category, item) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
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
            {type === "Autocomplete" && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded mt-1">
                {suggestions.map((item, idx) => (
                  <li 
                    key={idx} 
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleInputChange(type, item)}
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {resultTypes.map((type, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardContent className="p-4 flex flex-col justify-between h-full aspect-square">
              <h3 className="font-semibold text-lg mb-2">{type}</h3>
              <p className="text-2xl font-bold">{zoekResultaten[type] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;