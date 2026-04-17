export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
  height: string;
  weight: number;
  college: string;
  stats: {
    PPG: number;
    RPG: number;
    APG: number;
  };
}

export interface TeamStats {
  PPG: number;
  RPG: number;
  APG: number;
  FG_percentage: number;
  three_P_percentage: number;
  FT_percentage: number;
  wins: number;
  losses: number;
}

export interface ChampionshipHistory {
  year: number;
  champion: boolean;
  finalsAppearance?: boolean;
}

export interface Team {
  id: string;
  name: string;
  city: string;
  state: string;
  conference: 'Eastern' | 'Western';
  division: string;
  founded: number;
  arena: string;
  coach: string;
  colors: {
    primary: string;
    secondary: string;
  };
  logo: string;
  roster: Player[];
  teamStats: TeamStats;
  championships: number;
  history: ChampionshipHistory[];
  notablePlayers: string[];
  rivalries: string[];
}

export interface DetectionResult {
  teamId: string;
  confidence: number;
  timestamp: number;
}
