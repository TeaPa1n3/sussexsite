export interface EventDetails {
  notableNames: string[];
  causes: string[];
  results: string[];
}

export interface BattleStats {
  location: string;
  combatants: {
    side1: string;
    side2: string;
  };
  forces?: {
    side1: string;
    side2: string;
  };
  victor: string;
  outcome: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  type: 'battle' | 'coronation' | 'document' | 'survey' | 'rebellion' | 'siege';
  description?: string;
  battleStats?: BattleStats;
  details?: EventDetails;
}