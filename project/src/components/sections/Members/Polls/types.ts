interface PollOption {
  id: string;
  text: string;
}

export interface Poll {
  id: string;
  title: string;
  description: string;
  options: PollOption[];
  isActive: boolean;
  endsAt: string | null;
}

interface PollResults {
  [optionId: string]: number;
}

export interface Vote {
  name: string;
  optionId: string;
  timestamp: string;
}

export interface PollVotes {
  [pollId: string]: {
    votes: {
      [optionId: string]: number;
    };
    totalVotes: number;
    ipVotes: {
      [ip: string]: string;  // Maps IP to optionId
    };
    voters: Vote[];  // Array of voter information
  };
}