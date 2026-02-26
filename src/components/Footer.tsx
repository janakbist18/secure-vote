import { Shield } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card py-8">
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-display text-lg font-bold">SecureVote</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 SecureVote Electoral System. All rights reserved. Secured with SHA-256 encryption.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
