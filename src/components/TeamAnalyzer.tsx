import React, { useState } from 'react';
import { detectTeam } from '../services/mlService';
import { teamsData } from '../data/teamsData';
import { DetectionResult } from '../types';

interface TeamAnalyzerProps {
  imageFile: File | null;
  onDetectionComplete: (result: DetectionResult) => void;
  onDetectionLow: (result: DetectionResult) => void;
  onError: (error: string) => void;
}

const TeamAnalyzer: React.FC<TeamAnalyzerProps> = ({
  imageFile,
  onDetectionComplete,
  onDetectionLow,
  onError,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!imageFile) {
      onError('Por favor selecciona una imagen primero');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await detectTeam(imageFile);
      
      // Check confidence threshold - lowered to 55% for better detection
      if (result.confidence < 0.55) {
        onDetectionLow(result);
        setIsAnalyzing(false);
        return;
      }

      onDetectionComplete(result);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error al analizar la imagen');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      <button
        onClick={handleAnalyze}
        disabled={!imageFile || isAnalyzing}
        className="w-full py-4 px-6 bg-gradient-to-r from-nba-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg rounded-lg transition-all disabled:cursor-not-allowed"
      >
        {isAnalyzing ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span>
            Analizando imagen...
          </span>
        ) : (
          <span>🔍 Analizar Equipo</span>
        )}
      </button>

      {isAnalyzing && (
        <div className="mt-6 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <p className="text-center text-blue-800 font-semibold">
            Nuestro AI está analizando tu imagen con TensorFlow.js...
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamAnalyzer;
