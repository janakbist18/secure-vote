import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [showPw, setShowPw] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Registration submitted", description: "Your account is pending verification." });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md" style={{ boxShadow: "var(--card-shadow-lg)" }}>
        <CardHeader className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <CardTitle className="font-display text-2xl">Register to Vote</CardTitle>
          <CardDescription>Create your secure voter account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="voterId">National ID / Voter ID</Label>
              <Input id="voterId" placeholder="Enter your ID number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPw ? "text" : "password"} placeholder="••••••••" required />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">Create Account</Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Already registered?{" "}
            <Link to="/login" className="text-primary underline-offset-2 hover:underline">Sign in</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
