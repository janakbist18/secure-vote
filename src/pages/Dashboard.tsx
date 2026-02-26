import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ElectionCard from "@/components/ElectionCard";
import { mockElections, mockVoter } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, User } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn voterName={mockVoter.name} />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Voter info */}
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between" style={{ boxShadow: "var(--card-shadow)" }}>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold">{mockVoter.name}</h1>
                <p className="text-sm text-muted-foreground">Voter ID: {mockVoter.voterId} • {mockVoter.ward}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {mockVoter.isVerified ? (
                <Badge className="bg-success text-success-foreground gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified
                </Badge>
              ) : (
                <Badge variant="outline" className="border-warning text-warning">Pending Verification</Badge>
              )}
            </div>
          </div>

          {/* Elections */}
          <h2 className="mb-4 font-display text-2xl font-bold">Available Elections</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockElections.map(e => (
              <ElectionCard key={e.id} election={e} hasVoted={mockVoter.hasVoted[e.id]} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
