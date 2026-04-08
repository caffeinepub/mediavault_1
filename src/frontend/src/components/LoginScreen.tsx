import { Button } from "@/components/ui/button";
import { HardDrive, ShieldCheck, Vault, Zap } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  isLoading?: boolean;
}

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    desc: "Files encrypted and authenticated via Internet Identity — only you can access your vault.",
  },
  {
    icon: HardDrive,
    title: "All File Formats",
    desc: "Store photos, videos, audio, PDFs, Word docs, and more in one organized place.",
  },
  {
    icon: Zap,
    title: "Mobile Ready",
    desc: "Upload directly from iPhone or Android — optimized for touch and fast upload speeds.",
  },
];

export function LoginScreen({ onLogin, isLoading }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-12">
      {/* Hero card */}
      <div className="w-full max-w-md text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-5 shadow-lg">
          <Vault className="w-8 h-8 text-primary-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold text-foreground tracking-tight mb-2">
          MediaVault
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed">
          Your personal secure media library. Store, organize, and access all
          your files — anywhere, anytime.
        </p>
      </div>

      {/* Login card */}
      <div className="w-full max-w-sm bg-card border border-border rounded-xl p-6 shadow-sm mb-8">
        <Button
          className="w-full h-11 font-semibold gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={onLogin}
          disabled={isLoading}
          data-ocid="login-btn"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Connecting…
            </span>
          ) : (
            "Sign in with Internet Identity"
          )}
        </Button>
        <p className="text-xs text-muted-foreground text-center mt-3 leading-relaxed">
          Internet Identity provides anonymous, secure login — no email or
          password needed.
        </p>
      </div>

      {/* Features */}
      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 bg-card border border-border rounded-lg px-4 py-3"
          >
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground mb-0.5">
                {title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-10 text-xs text-muted-foreground">
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground transition-colors"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
