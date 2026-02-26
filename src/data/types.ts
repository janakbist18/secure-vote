export interface Election {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  status: "upcoming" | "active" | "completed";
  totalVoters: number;
  votesCast: number;
}

export interface Candidate {
  id: string;
  electionId: string;
  name: string;
  partyName: string;
  symbol: string;
  description: string;
  votes?: number;
}

export interface VoterProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  voterId: string;
  isVerified: boolean;
  ward: string;
  hasVoted: Record<string, boolean>;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  timestamp: Date;
  ipAddress: string;
  extraData?: string;
}
