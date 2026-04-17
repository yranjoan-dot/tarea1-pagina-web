import React from 'react';

interface NavbarProps {
  onReset?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <nav className="bg-gradient-to-r from-nba-dark to-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏀</span>
          <div>
            <h1 className="text-2xl font-bold">HoopsScore</h1>
            <p className="text-xs text-orange-400">AI NBA Team Analyzer</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">Analiza tu équipo de NBA al instante</p>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="px-6 py-2 bg-nba-orange hover:bg-orange-600 rounded-lg font-semibold transition-colors"
          >
            🔄 Reiniciar
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
