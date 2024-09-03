import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const searchTypes = ["Vrije tekst", "Autocomplete"];

const fakeData = [
  { term: "Amsterdam", type: "Plaats" },
  { term: "Belastingdienst", type: "Organisatie" },
  { term: "Circulaire economie", type: "Begrip" },
  { term: "Datamodel", type: "Informatiemodel" },
  { term: "Energielabel", type: "Modelelement" },
  { term: "Fietspad", type: "Modelelement" },
  { term: "Gemeente", type: "Organisatie" },
  { term: "Huisnummer", type: "Modelelement" },
  { term: "Inkomen", type: "Begrip" },
  { term: "Kadaster", type: "Organisatie" },
  { term: "Luchtkwaliteit", type: "Dataset" },
  { term: "Ministerie van BZK", type: "Organisatie" }
];

const resultBoxes = [
  "Registraties", "Informatiemodellen", "Koppelsleutels", "Modelelementen",
  "Catalogus", "Datasets", "Distributies", "Dataservices",
  "Begrippenkaders", "Begrippen", "Organisaties", "Toon alles"
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
  const [searchResults, setSearchResults] = useState({});
  const [showNoResultAlert, setShowNoResultAlert] = useState(false);

  useEffect(() => {
    if (searchTerms["Autocomplete"]) {
      const filteredSuggestions = fakeData.filter(item => 
        item.term.toLowerCase().includes(searchTerms["Autocomplete"].toLowerCase())
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

  const handleZoeken = () => {
    // Generate fake search results
    const fakeResults = resultBoxes.reduce((acc, box) => {
      acc[box] = Math.floor(Math.random() * 100);
      return acc;
    }, {});
    setSearchResults(fakeResults);
  };

  const handleResultBoxClick = (box) => {
    if (searchResults[box] === 0) {
      setShowNoResultAlert(true);
    } else {
      navigate('/result', { 
        state: { 
          searchTerm: searchTerms["Vrije tekst"] || searchTerms["Autocomplete"], 
          resultType: box,
          boxName: box,
          cellValue: searchResults[box],
          isAutocomplete: !!searchTerms["Autocomplete"]
        } 
      });
    }
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
    setSearchTerms(prev => ({ ...prev, "Autocomplete": suggestion.term }));
    setShowSuggestions(false);
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
                    {item.term} ({item.type})
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

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {resultBoxes.map((box, index) => (
          <Card key={index} className="cursor-pointer" onClick={() => handleResultBoxClick(box)}>
            <CardHeader>
              <CardTitle>{box}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aantal: {searchResults[box] || 0}</p>
            </CardContent>
          </Card>
        ))}
      </div>

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

export default Index;