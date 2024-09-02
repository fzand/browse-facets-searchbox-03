import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const DetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, searchTerm } = location.state || {};

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleBack} className="mb-4">Terug</Button>
      <h1 className="text-3xl font-bold mb-6">Detail Pagina: {type}</h1>
      <p className="mb-4">Zoekterm: {searchTerm}</p>
      
      <div className="bg-yellow-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Informatiemodel</h2>
        <h3 className="text-lg font-medium">Zoetwater</h3>
        <p className="mt-2">
          Tetris is een computerspel dat in 1984 bedacht is door Aleksej Pazjitnov, destijds werkzaam bij de Academie voor Wetenschappen van de Sovjet-Unie. De naam Tetris is een samenstelling van de Griekse telwoorden tetra (vier) en tennis, Pazjitnovs favoriete sport. In 1989 zag een eerste Game Boy-versie van Tetris het levenslicht. Het spel werd een enorm succes en wordt gezien als een van de beste en meest verslavende spellen aller tijden. Tetris is een puzzelspel. Het doel van het spel is zoveel mogelijk punten te scoren door horizontale rijen te vormen in een veld, zonder dat het veld volloopt. Dit gebeurt door vallende stukken, elk opgebouwd uit vier vierkantjes, zo te draaien dat ze precies in het veld passen. Tetris is een van de bestverkochte computerspellen ooit. Sinds de introductie zijn er meer dan 170 miljoen exemplaren over de toonbank gegaan, waarvan 70 miljoen fysieke kopieën en meer dan 100 miljoen betaalde downloads op mobiele telefoons. De Game Boy-versie alleen al is meer dan 35 miljoen keer verkocht.
        </p>
      </div>
    </div>
  );
};

export default DetailPage;