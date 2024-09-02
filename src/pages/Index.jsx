import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const searchTypes = [
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

const Index = () => {
  const [searchTerms, setSearchTerms] = useState(searchTypes.reduce((acc, type) => ({ ...acc, [type]: '' }), {}));
  const [suggestions, setSuggestions] = useState({});
  const [zoekResultaten, setZoekResultaten] = useState([]);

  useEffect(() => {
    Object.keys(searchTerms).forEach(type => {
      if (searchTerms[type]) {
        const filteredSuggestions = fakeData.filter(item => 
          item.toLowerCase().includes(searchTerms[type].toLowerCase())
        );
        setSuggestions(prev => ({ ...prev, [type]: filteredSuggestions }));
      } else {
        setSuggestions(prev => ({ ...prev, [type]: [] }));
      }
    });
  }, [searchTerms]);

  const handleInputChange = (type, value) => {
    setSearchTerms(prev => ({ ...prev, [type]: value }));
  };

  const handleZoeken = async () => {
    // Simulate API call
    const results = Object.entries(searchTerms)
      .filter(([type, term]) => term && type !== "Toon alles")
      .map(([type, term]) => ({
        type,
        aantal: Math.floor(Math.random() * 100) + 1
      }));
    setZoekResultaten(results);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">PoC federatieve catalogus</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {searchTypes.map((type, index) => (
          <div key={index} className="relative">
            <Input
              type="text"
              placeholder={type}
              value={searchTerms[type]}
              onChange={(e) => handleInputChange(type, e.target.value)}
              className="w-full p-2 border rounded"
            />
            {suggestions[type] && suggestions[type].length > 0 && (
              <ul className="absolute z-10 w-full bg-white border rounded mt-1">
                {suggestions[type].map((item, idx) => (
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

      <Button onClick={handleZoeken} className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Zoeken
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {zoekResultaten.map((resultaat, index) => (
          <Card key={index} className="bg-white shadow-md">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">{resultaat.type}</h3>
              <p>Resultaten: {resultaat.aantal}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;