import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockElections } from "@/data/mockData";
import { Vote, Users, CheckCircle, Clock, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Elections", value: "3", icon: Vote, color: "text-primary" },
  { label: "Registered Voters", value: "57,330", icon: Users, color: "text-info" },
  { label: "Active Now", value: "1", icon: Clock, color: "text-success" },
  { label: "Votes Recorded", value: "30,600", icon: CheckCircle, color: "text-accent" },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn isAdmin />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Election Commission Control Panel</p>
            </div>
            <Link to="/admin/elections">
              <Button>Create Election</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(s => (
              <Card key={s.label} style={{ boxShadow: "var(--card-shadow)" }}>
                <CardContent className="flex items-center gap-4 p-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
                    <s.icon className={`h-5 w-5 ${s.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Election list */}
          <Card style={{ boxShadow: "var(--card-shadow)" }}>
            <CardHeader>
              <CardTitle className="font-display text-xl">All Elections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockElections.map(e => {
                  const turnout = e.totalVoters > 0 ? Math.round((e.votesCast / e.totalVoters) * 100) : 0;
                  const statusStyle: Record<string, string> = {
                    active: "bg-success text-success-foreground",
                    upcoming: "bg-info text-info-foreground",
                    completed: "bg-muted text-muted-foreground",
                  };
                  return (
                    <div key={e.id} className="flex flex-col gap-3 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{e.title}</p>
                          <Badge className={statusStyle[e.status]}>{e.status}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{e.votesCast.toLocaleString()} / {e.totalVoters.toLocaleString()} votes • {turnout}% turnout</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Manage</Button>
                        {e.status === "completed" && (
                          <Link to={`/results/${e.id}`}>
                            <Button variant="outline" size="sm"><BarChart3 className="mr-1 h-4 w-4" /> Results</Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Audit log preview */}
          <Card className="mt-6" style={{ boxShadow: "var(--card-shadow)" }}>
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" /> Recent Audit Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {[
                  { time: "14:32:01", action: "Vote recorded", actor: "Voter #VTR-2026-00451", ip: "192.168.1.xx" },
                  { time: "14:28:15", action: "Election status updated to active", actor: "Admin", ip: "10.0.0.1" },
                  { time: "14:15:00", action: "Candidate added", actor: "Admin", ip: "10.0.0.1" },
                  { time: "13:55:42", action: "Voter verified", actor: "System", ip: "—" },
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-md border border-border px-3 py-2">
                    <span className="font-mono text-xs text-muted-foreground">{log.time}</span>
                    <span className="flex-1">{log.action}</span>
                    <span className="text-xs text-muted-foreground">{log.actor}</span>
                    <span className="font-mono text-xs text-muted-foreground">{log.ip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
