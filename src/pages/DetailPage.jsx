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

  // Fictitious data
  const detailData = {
    naam: "Dataset",
    type: type || "Onbekend type",
    datum: "2024-03-15",
    toelichting: "Dit is een dataset met gedetailleerde informatie over verschillende aspecten van stedelijke ontwikkeling in Nederland.",
    eigenaar: "Ministerie van Binnenlandse Zaken en Koninkrijksrelaties",
    versie: "2.1",
    updateFrequentie: "Jaarlijks",
    themas: ["Ruimtelijke ordening", "Demografie", "Economie"],
    datumLaatsteUpdate: "2024-01-10",
    licentie: "CC BY 4.0",
    contactpersoon: "Jan Jansen",
    email: "jan.jansen@example.gov.nl",
    telefoon: "+31 70 123 4567",
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={handleBack} className="mb-4">Terug</Button>
      <h1 className="text-3xl font-bold mb-6">Detail Pagina: {detailData.type}</h1>
      <p className="mb-4">Zoekterm: {searchTerm}</p>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">{detailData.naam}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Datum:</strong> {detailData.datum}</p>
            <p><strong>Eigenaar:</strong> {detailData.eigenaar}</p>
            <p><strong>Versie:</strong> {detailData.versie}</p>
            <p><strong>Update frequentie:</strong> {detailData.updateFrequentie}</p>
            <p><strong>Datum laatste update:</strong> {detailData.datumLaatsteUpdate}</p>
          </div>
          <div>
            <p><strong>Licentie:</strong> {detailData.licentie}</p>
            <p><strong>Contactpersoon:</strong> {detailData.contactpersoon}</p>
            <p><strong>Email:</strong> {detailData.email}</p>
            <p><strong>Telefoon:</strong> {detailData.telefoon}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Toelichting</h3>
          <p>{detailData.toelichting}</p>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Thema's</h3>
          <ul className="list-disc list-inside">
            {detailData.themas.map((thema, index) => (
              <li key={index}>{thema}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;