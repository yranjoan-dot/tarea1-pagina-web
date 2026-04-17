import React from 'react';
import { Team } from '../types';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Header with Dynamic Team Colors */}
      <div
        className="p-8 text-white"
        style={{
          background: `linear-gradient(135deg, ${team.colors.primary} 0%, ${team.colors.secondary} 100%)`,
        }}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-5xl font-bold mb-2">{team.name}</h1>
            <p className="text-xl opacity-90">{team.city}, {team.state}</p>
            <p className="text-sm opacity-75 mt-1">Fundado: {team.founded}</p>
            <p className="text-sm opacity-75">Entrenador: {team.coach}</p>
            <p className="text-sm opacity-75">Arena: {team.arena}</p>
          </div>
          <div className="flex-shrink-0 text-9xl drop-shadow-lg">{team.logo}</div>
        </div>
      </div>

      {/* Team Info Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b" style={{ backgroundColor: `${team.colors.primary}20` }}>
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">Conferencia</p>
          <p className="text-lg font-bold" style={{ color: team.colors.primary }}>{team.conference}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">División</p>
          <p className="text-lg font-bold" style={{ color: team.colors.primary }}>{team.division}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">Campeonatos</p>
          <p className="text-lg font-bold" style={{ color: team.colors.primary }}>{team.championships}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-600 text-sm font-medium">W-L</p>
          <p className="text-lg font-bold" style={{ color: team.colors.primary }}>{team.teamStats.wins}-{team.teamStats.losses}</p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-6" style={{ color: team.colors.primary }}>📊 Estadísticas de Equipo</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">PPG</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.PPG.toFixed(1)}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">RPG</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.RPG.toFixed(1)}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">APG</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.APG.toFixed(1)}</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">FG%</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.FG_percentage.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">3P%</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.three_P_percentage.toFixed(1)}%</p>
          </div>
          <div className="p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15`, borderLeft: `4px solid ${team.colors.primary}` }}>
            <p className="text-gray-600 text-sm font-medium">FT%</p>
            <p className="text-2xl font-bold" style={{ color: team.colors.primary }}>{team.teamStats.FT_percentage.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Roster Section */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-6" style={{ color: team.colors.primary }}>👥 Roster</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {team.roster.map((player) => (
            <div key={player.id} className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: `${team.colors.primary}10` }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{ backgroundColor: team.colors.primary }}>
                #{player.number}
              </div>
              <div className="flex-grow">
                <p className="font-bold text-gray-800">{player.name}</p>
                <p className="text-sm text-gray-600">{player.position}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold" style={{ color: team.colors.primary }}>{player.stats.PPG.toFixed(1)} PTS</p>
                <p className="text-xs text-gray-500">{player.height}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* History Section */}
      <div className="p-8 border-b">
        <h2 className="text-2xl font-bold mb-6" style={{ color: team.colors.primary }}>🏆 Historial de Campeonatos</h2>
        {team.history && team.history.length > 0 ? (
          <div className="space-y-3">
            {team.history.map((entry, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: `${team.colors.primary}15` }}>
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="font-semibold" style={{ color: team.colors.primary }}>
                    {entry.year} - {entry.champion ? '🥇 Campeón' : entry.finalsAppearance ? '🥈 Finals' : 'Temporada'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay campeonatos registrados</p>
        )}
      </div>

      {/* Notable Players & Rivalries */}
      <div className="p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: team.colors.primary }}>⭐ Jugadores Notables</h3>
            <div className="space-y-2">
              {team.notablePlayers.map((player, idx) => (
                <p key={idx} className="text-gray-700">• {player}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4" style={{ color: team.colors.primary }}>🔥 Rivalidades</h3>
            <div className="space-y-2">
              {team.rivalries.map((rival, idx) => (
                <p key={idx} className="text-gray-700">• {rival}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
