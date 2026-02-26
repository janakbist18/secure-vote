import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Vote, Lock, BarChart3, CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Shield, title: "Tamper-Proof Security", desc: "SHA-256 hashed ballots with full audit trail ensure every vote is protected." },
  { icon: Vote, title: "One Person, One Vote", desc: "Unique voter verification guarantees electoral integrity." },
  { icon: Lock, title: "Ballot Privacy", desc: "Encrypted vote storage ensures your choice remains confidential." },
  { icon: BarChart3, title: "Transparent Results", desc: "Automatic counting with real-time turnout and public result publishing." },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMzRoNnptMC0zMHY2aC02VjRoNnptMCAxMHY2aC02VjE0aDZ6bTAgMTB2Nmg2di02aC02em0wIDEwdjZoNnYtNmgtNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="container relative mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>Trusted by organizations worldwide</span>
            </div>
            <h1 className="mb-6 font-display text-4xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Democracy, Secured <br />
              <span className="text-gradient">by Technology</span>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/75">
              A transparent, tamper-proof electoral voting system that ensures every vote counts. 
              Built with security at its core.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="min-w-[180px] text-base font-semibold">
                  Register to Vote
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="min-w-[180px] border-primary-foreground/30 text-base text-primary-foreground hover:bg-primary-foreground/10">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold">How We Protect Your Vote</h2>
            <p className="mt-3 text-muted-foreground">Built on industry-standard security principles</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-1"
                style={{ boxShadow: "var(--card-shadow)", animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold">Ready to Participate?</h2>
          <p className="mt-2 text-muted-foreground">Check active elections and cast your vote securely.</p>
          <Link to="/register" className="mt-6 inline-block">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
