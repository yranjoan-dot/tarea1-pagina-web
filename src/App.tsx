import './index.css';
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ImageUploader from './components/ImageUploader';
import TeamAnalyzer from './components/TeamAnalyzer';
import TeamCard from './components/TeamCard';
import { ManualTeamSelector } from './components/ManualTeamSelector';
import { loadModel } from './services/mlService';
import { teamsData } from './data/teamsData';
import { Team, DetectionResult } from './types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [detectedTeam, setDetectedTeam] = useState<Team | null>(null);
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManualSelector, setShowManualSelector] = useState(false);
  const [lowConfidenceResult, setLowConfidenceResult] = useState<DetectionResult | null>(null);

  // Load ML model on mount
  useEffect(() => {
    const initModel = async () => {
      try {
        await loadModel();
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading model');
        setLoading(false);
      }
    };
    initModel();
  }, []);

  const handleImageSelected = (file: File | null) => {
    setSelectedFile(file);
    setError(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleDetectionComplete = (result: DetectionResult) => {
    setDetectionResult(result);
    const team = teamsData[result.teamId];
    if (team) {
      setDetectedTeam(team);
      setError(null);
      setShowManualSelector(false);
    } else {
      setError('Equipo no encontrado en la base de datos');
    }
  };

  const handleDetectionLow = (result: DetectionResult) => {
    setLowConfidenceResult(result);
    setShowManualSelector(true);
  };

  const handleManualTeamSelect = (team: Team) => {
    setDetectedTeam(team);
    setDetectionResult({
      teamId: team.id,
      confidence: 0.95,
      timestamp: Date.now(),
    });
    setShowManualSelector(false);
    setError(null);
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    setDetectedTeam(null);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setDetectedTeam(null);
    setDetectionResult(null);
    setError(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-nba-dark to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🏀</div>
          <p className="text-white text-xl font-semibold">Cargando HoopsScore AI...</p>
          <p className="text-gray-400 text-sm mt-2">Inicializando modelo de IA...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-nba-dark via-gray-900 to-black">
      <Navbar onReset={detectedTeam ? handleReset : undefined} />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border-2 border-red-400 rounded-lg">
            <p className="text-red-800 font-semibold">❌ {error}</p>
            {!detectedTeam && (
              <button
                onClick={() => setError(null)}
                className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
            )}
          </div>
        )}

        {/* Main Content */}
        {!detectedTeam ? (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                🏀 HoopsScore AI
              </h1>
              <p className="text-xl text-gray-400">
                Identifica tu equipo de NBA al instante con Inteligencia Artificial
              </p>
            </div>

            <ImageUploader onImageSelected={handleImageSelected} preview={preview} />

            {selectedFile && (
              <div className="flex justify-center">
                <TeamAnalyzer
                  imageFile={selectedFile}
                  onDetectionComplete={handleDetectionComplete}
                  onDetectionLow={handleDetectionLow}
                  onError={handleError}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Detection Result Header with Team Colors */}
            <div
              className="rounded-xl p-8 mb-8 text-white shadow-2xl flex items-center justify-between"
              style={{
                background: `linear-gradient(135deg, ${detectedTeam.colors.primary} 0%, ${detectedTeam.colors.secondary} 100%)`,
              }}
            >
              <div>
                <h2 className="text-3xl font-bold mb-2">✅ ¡Equipo Identificado!</h2>
                <p className="text-sm opacity-90">
                  Confianza: {((detectionResult!.confidence) * 100).toFixed(0)}%
                </p>
              </div>
              <div className="text-8xl drop-shadow-lg">{detectedTeam.logo}</div>
            </div>

            {/* Team Card */}
            <TeamCard team={detectedTeam} />
          </div>
        )}
      </main>

      {/* Manual Team Selector Modal */}
      {showManualSelector && (
        <ManualTeamSelector
          teams={Object.values(teamsData)}
          onTeamSelect={handleManualTeamSelect}
          onClose={() => setShowManualSelector(false)}
          suggestedTeamId={lowConfidenceResult?.teamId}
        />
      )}

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>HoopsScore AI - Powered by TensorFlow.js & React</p>
          <p className="mt-2">Datos estáticos de temporada 2025-2026 NBA</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
