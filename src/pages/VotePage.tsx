import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mockElections, mockCandidates, mockVoter } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const VotePage = () => {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const election = mockElections.find(e => e.id === electionId);
  const candidates = mockCandidates[electionId || ""] || [];

  if (!election || election.status !== "active") {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn voterName={mockVoter.name} />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-warning" />
            <h2 className="mt-4 font-display text-2xl font-bold">Election Not Available</h2>
            <p className="mt-2 text-muted-foreground">This election is not currently active for voting.</p>
            <Button className="mt-6" onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isLoggedIn voterName={mockVoter.name} />
        <div className="flex flex-1 items-center justify-center py-16">
          <div className="mx-auto max-w-md text-center animate-fade-up">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h2 className="font-display text-2xl font-bold">Vote Cast Successfully!</h2>
            <p className="mt-2 text-muted-foreground">Your vote has been encrypted and securely recorded.</p>
            <div className="mt-4 rounded-lg bg-muted p-4 text-left text-xs">
              <p className="font-semibold text-foreground">Vote Receipt</p>
              <p className="mt-1 text-muted-foreground">Election: {election.title}</p>
              <p className="text-muted-foreground">Hash: <code>a7f3c9...e2d1b8</code></p>
              <p className="text-muted-foreground">Timestamp: {new Date().toISOString()}</p>
            </div>
            <Button className="mt-6" onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSubmit = () => {
    if (!selectedCandidate) return;
    setSubmitted(true);
    toast({ title: "Vote recorded", description: "Your ballot has been encrypted and stored." });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn voterName={mockVoter.name} />
      <main className="flex-1 py-8">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h1 className="font-display text-2xl font-bold">{election.title}</h1>
              <p className="text-sm text-muted-foreground">Select your candidate and confirm your vote</p>
            </div>
          </div>

          <div className="space-y-3">
            {candidates.map(c => (
              <Card
                key={c.id}
                className={`cursor-pointer transition-all ${selectedCandidate === c.id ? "ring-2 ring-primary border-primary" : "hover:border-primary/40"}`}
                onClick={() => { setSelectedCandidate(c.id); setConfirmed(false); }}
              >
                <CardContent className="flex items-center gap-4 p-4">
                  <span className="text-3xl">{c.symbol}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-muted-foreground">{c.partyName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{c.description}</p>
                  </div>
                  {selectedCandidate === c.id && (
                    <Badge className="bg-primary text-primary-foreground">Selected</Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedCandidate && (
            <div className="mt-6 animate-fade-up rounded-xl border border-border bg-card p-6" style={{ boxShadow: "var(--card-shadow)" }}>
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={confirmed}
                  onChange={e => setConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-border accent-primary"
                />
                <label htmlFor="confirm" className="text-sm">
                  I confirm my selection. I understand my vote is final and cannot be changed once submitted.
                </label>
              </div>
              <Button className="mt-4 w-full" size="lg" disabled={!confirmed} onClick={handleSubmit}>
                Submit Secure Vote
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VotePage;
