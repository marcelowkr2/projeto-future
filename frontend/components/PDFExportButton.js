import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import PDFGenerator from './PDFGenerator';

const PDFExportButton = ({ questions, responses, radarChartRef, nivelGeral, scores }) => {
  const [radarImage, setRadarImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      if (radarChartRef.current) {
        // Usando html2canvas como alternativa
        const canvas = await html2canvas(radarChartRef.current, {
          scale: 2, // Aumenta a qualidade
          logging: false,
          useCORS: true,
          allowTaint: true
        });
        
        // Converter canvas para data URL
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        setRadarImage(dataUrl);
      }
    } catch (error) {
      console.error("Erro ao gerar imagem do gráfico:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button
        onClick={handleGeneratePDF}
        disabled={isGenerating}
        style={{
          padding: '10px 15px',
          backgroundColor: isGenerating ? '#9e9e9e' : '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isGenerating ? 'not-allowed' : 'pointer',
          fontWeight: '500'
        }}
      >
        {isGenerating ? 'Preparando PDF...' : 'Gerar Relatório PDF'}
      </button>

      {radarImage && (
        <PDFDownloadLink
          document={
            <PDFGenerator
              questions={questions}
              responses={responses}
              radarImage={radarImage}
              nivelGeral={nivelGeral}
              scores={scores}
            />
          }
          fileName={`relatorio_lgpd_${new Date().toISOString().slice(0, 10)}.pdf`}
        >
          {({ loading }) => (
            <button
              style={{
                padding: '10px 15px',
                backgroundColor: loading ? '#9e9e9e' : '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '500'
              }}
              disabled={loading}
            >
              {loading ? 'Gerando PDF...' : 'Baixar PDF'}
            </button>
          )}
        </PDFDownloadLink>
      )}
    </div>
  );
};

export default PDFExportButton;