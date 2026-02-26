import { Election } from "@/data/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface ElectionCardProps {
  election: Election;
  hasVoted?: boolean;
  showVoteButton?: boolean;
}

const statusStyles: Record<string, string> = {
  active: "bg-success text-success-foreground",
  upcoming: "bg-info text-info-foreground",
  completed: "bg-muted text-muted-foreground",
};

const ElectionCard = ({ election, hasVoted, showVoteButton = true }: ElectionCardProps) => {
  const turnout = election.totalVoters > 0 ? Math.round((election.votesCast / election.totalVoters) * 100) : 0;

  return (
    <Card className="transition-shadow hover:shadow-lg" style={{ boxShadow: "var(--card-shadow)" }}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="font-display text-lg leading-tight">{election.title}</CardTitle>
          <Badge className={statusStyles[election.status]}>{election.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{election.description}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />{format(election.startTime, "MMM d, yyyy")}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{format(election.startTime, "h:mm a")} - {format(election.endTime, "h:mm a")}</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" />{election.totalVoters.toLocaleString()} voters</span>
        </div>

        {/* Turnout bar */}
        <div>
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>Turnout</span>
            <span>{turnout}% ({election.votesCast.toLocaleString()} votes)</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${turnout}%` }} />
          </div>
        </div>

        {showVoteButton && (
          <div className="flex gap-2 pt-1">
            {election.status === "active" && !hasVoted && (
              <Link to={`/vote/${election.id}`}><Button size="sm">Cast Your Vote</Button></Link>
            )}
            {election.status === "active" && hasVoted && (
              <Badge variant="outline" className="border-success text-success">✓ Vote Cast</Badge>
            )}
            {election.status === "completed" && (
              <Link to={`/results/${election.id}`}><Button variant="outline" size="sm">View Results</Button></Link>
            )}
            {election.status === "upcoming" && (
              <span className="text-xs text-muted-foreground italic">Voting not yet open</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ElectionCard;
