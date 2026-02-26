import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockElections, mockCandidates, mockVoter } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

const Results = () => {
  const { electionId } = useParams();

  // Show results for completed elections or specific election
  const completedElections = electionId
    ? mockElections.filter(e => e.id === electionId)
    : mockElections.filter(e => e.status === "completed");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn voterName={mockVoter.name} />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 font-display text-3xl font-bold">Election Results</h1>

          {completedElections.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-12 text-center">
              <p className="text-muted-foreground">No completed elections with published results yet.</p>
            </div>
          ) : (
            completedElections.map(election => {
              const candidates = mockCandidates[election.id] || [];
              const totalVotes = candidates.reduce((sum, c) => sum + (c.votes || 0), 0);
              const sorted = [...candidates].sort((a, b) => (b.votes || 0) - (a.votes || 0));
              const winner = sorted[0];

              return (
                <div key={election.id} className="mb-8">
                  <div className="mb-4 flex items-center gap-3">
                    <h2 className="font-display text-xl font-bold">{election.title}</h2>
                    <Badge className="bg-muted text-muted-foreground">Completed</Badge>
                  </div>

                  <div className="space-y-3">
                    {sorted.map((c, i) => {
                      const pct = totalVotes > 0 ? Math.round(((c.votes || 0) / totalVotes) * 100) : 0;
                      const isWinner = i === 0;
                      return (
                        <Card key={c.id} className={isWinner ? "ring-2 ring-success border-success" : ""}>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <span className="text-2xl">{c.symbol}</span>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="font-semibold">{c.name}</p>
                                  {isWinner && (
                                    <Badge className="bg-success text-success-foreground gap-1">
                                      <Trophy className="h-3 w-3" /> Winner
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">{c.partyName}</p>
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>{(c.votes || 0).toLocaleString()} votes</span>
                                    <span>{pct}%</span>
                                  </div>
                                  <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                                    <div
                                      className={`h-full rounded-full transition-all ${isWinner ? "bg-success" : "bg-primary/60"}`}
                                      style={{ width: `${pct}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  <div className="mt-3 text-sm text-muted-foreground">
                    Total votes: {totalVotes.toLocaleString()} • Turnout: {election.totalVoters > 0 ? Math.round((election.votesCast / election.totalVoters) * 100) : 0}%
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
