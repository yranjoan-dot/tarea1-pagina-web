import React from 'react';
import { Team } from '../types';

interface ManualTeamSelectorProps {
  teams: Team[];
  onTeamSelect: (team: Team) => void;
  onClose: () => void;
  suggestedTeamId?: string;
}

export const ManualTeamSelector: React.FC<ManualTeamSelectorProps> = ({
  teams,
  onTeamSelect,
  onClose,
  suggestedTeamId,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl my-4">
        {/* Header with Close Button */}
        <div className="flex justify-between items-start p-4 sm:p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Selecciona tu Equipo NBA</h2>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              No pudimos identificar el equipo con certeza. Por favor, selecciona manualmente:
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-lg transition flex-shrink-0 ml-2"
            title="Cerrar modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Grid - 30 teams */}
        <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-3">
            {teams.map((team) => (
              <button
                key={team.id}
                onClick={() => onTeamSelect(team)}
                className={`p-2 sm:p-3 rounded-lg border-2 transition-all hover:scale-105 flex flex-col items-center justify-between h-full ${
                  suggestedTeamId === team.id
                    ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-400'
                    : 'border-gray-200 bg-white hover:border-blue-400'
                }`}
                title={team.name}
              >
                {/* Logo Circle */}
                <div
                  className="w-12 sm:w-14 h-12 sm:h-14 rounded-full flex items-center justify-center mb-1 sm:mb-2 text-xl sm:text-2xl flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`,
                    color: 'white',
                  }}
                >
                  {team.logo}
                </div>

                {/* Team Name - City */}
                <p className="text-xs font-semibold text-center line-clamp-2 text-gray-800">
                  {team.city}
                </p>

                {/* Team Name - Short */}
                <p className="text-xs text-gray-600 text-center line-clamp-1">
                  {team.name.split(' ').pop()}
                </p>

                {/* Suggested Badge */}
                {suggestedTeamId === team.id && (
                  <div className="mt-1 px-1.5 py-0.5 bg-yellow-300 text-yellow-900 text-xs font-bold rounded line-clamp-1">
                    💡 Sugerido
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer with Tips */}
        <div className="border-t border-gray-200 bg-blue-50 p-4 sm:p-6 sticky bottom-0">
          <p className="font-semibold text-blue-900 mb-2">💡 Consejos para mejor reconocimiento:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs sm:text-sm text-blue-800">
            <div>✅ Usa imágenes nítidas del uniforme</div>
            <div>✅ Colores del equipo visibles</div>
            <div>✅ Evita fondos con muchos colores</div>
            <div>✅ Logos y uniformes funcionan mejor</div>
          </div>
        </div>
      </div>
    </div>
  );
};
