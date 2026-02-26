import { Election, Candidate, VoterProfile } from "./types";

export const mockElections: Election[] = [
  {
    id: "1",
    title: "2026 General Presidential Election",
    description: "National presidential election to elect the next head of state for a 5-year term.",
    startTime: new Date("2026-03-15T08:00:00"),
    endTime: new Date("2026-03-15T20:00:00"),
    status: "active",
    totalVoters: 45230,
    votesCast: 28450,
  },
  {
    id: "2",
    title: "City Council Ward 7 By-Election",
    description: "Special by-election to fill the vacant Ward 7 council seat.",
    startTime: new Date("2026-04-01T08:00:00"),
    endTime: new Date("2026-04-01T18:00:00"),
    status: "upcoming",
    totalVoters: 8900,
    votesCast: 0,
  },
  {
    id: "3",
    title: "2025 Student Union Election",
    description: "Annual student government elections for all executive positions.",
    startTime: new Date("2025-11-10T09:00:00"),
    endTime: new Date("2025-11-10T17:00:00"),
    status: "completed",
    totalVoters: 3200,
    votesCast: 2150,
  },
];

export const mockCandidates: Record<string, Candidate[]> = {
  "1": [
    { id: "c1", electionId: "1", name: "Amara Okafor", partyName: "Progressive Alliance", symbol: "🌿", description: "Former governor with 12 years of public service. Focused on healthcare reform and education.", votes: 12300 },
    { id: "c2", electionId: "1", name: "David Kimani", partyName: "Democratic Front", symbol: "🔵", description: "Business leader and philanthropist. Platform centered on economic growth and job creation.", votes: 9800 },
    { id: "c3", electionId: "1", name: "Sarah Mensah", partyName: "People's Unity Party", symbol: "🟡", description: "Civil rights attorney fighting for justice reform and equality.", votes: 6350 },
  ],
  "3": [
    { id: "c4", electionId: "3", name: "James Osei", partyName: "Student Voice", symbol: "📢", description: "Third-year engineering student focused on campus infrastructure.", votes: 980 },
    { id: "c5", electionId: "3", name: "Linda Acheampong", partyName: "Unity Front", symbol: "🤝", description: "Law student advocating for mental health services.", votes: 1170 },
  ],
};

export const mockVoter: VoterProfile = {
  id: "v1",
  userId: "u1",
  name: "John Doe",
  email: "john.doe@email.com",
  voterId: "VTR-2026-00451",
  isVerified: true,
  ward: "Ward 12",
  hasVoted: { "1": true, "3": true },
};
