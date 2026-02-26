import { Link, useLocation } from "react-router-dom";
import { Shield, LogOut, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  voterName?: string;
}

const Navbar = ({ isLoggedIn = false, isAdmin = false, voterName }: NavbarProps) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">SecureVote</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <Button variant={isActive("/login") ? "secondary" : "ghost"} size="sm">Sign In</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">Register</Button>
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <Link to="/admin"><Button variant={isActive("/admin") ? "secondary" : "ghost"} size="sm">Dashboard</Button></Link>
              <Link to="/admin/elections"><Button variant={isActive("/admin/elections") ? "secondary" : "ghost"} size="sm">Elections</Button></Link>
              <Link to="/admin/voters"><Button variant={isActive("/admin/voters") ? "secondary" : "ghost"} size="sm">Voters</Button></Link>
              <div className="ml-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Admin</span>
                <Link to="/"><Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button></Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/dashboard"><Button variant={isActive("/dashboard") ? "secondary" : "ghost"} size="sm">Elections</Button></Link>
              <Link to="/results"><Button variant={isActive("/results") ? "secondary" : "ghost"} size="sm">Results</Button></Link>
              <div className="ml-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{voterName}</span>
                <Link to="/"><Button variant="ghost" size="sm"><LogOut className="h-4 w-4" /></Button></Link>
              </div>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden">
          <div className="flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Sign In</Button></Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}><Button variant="default" className="w-full">Register</Button></Link>
              </>
            ) : isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Dashboard</Button></Link>
                <Link to="/admin/elections" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Elections</Button></Link>
                <Link to="/admin/voters" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Voters</Button></Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Elections</Button></Link>
                <Link to="/results" onClick={() => setMobileOpen(false)}><Button variant="ghost" className="w-full justify-start">Results</Button></Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
