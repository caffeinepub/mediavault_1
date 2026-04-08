import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu, Upload, Vault } from "lucide-react";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface HeaderProps {
  onUploadClick: () => void;
  onMenuToggle: () => void;
}

export function Header({ onUploadClick, onMenuToggle }: HeaderProps) {
  const { isAuthenticated, principalText, logout } = useCurrentUser();

  const shortPrincipal = principalText
    ? `${principalText.slice(0, 5)}...${principalText.slice(-3)}`
    : "";

  const initials = principalText
    ? principalText.slice(0, 2).toUpperCase()
    : "??";

  return (
    <header className="sticky top-0 z-40 flex items-center h-14 px-4 bg-card border-b border-border shadow-sm gap-3">
      {/* Mobile menu toggle */}
      <button
        type="button"
        className="lg:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        onClick={onMenuToggle}
        aria-label="Toggle navigation"
        data-ocid="nav-menu-toggle"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Logo */}
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0">
          <Vault className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-semibold text-foreground tracking-tight text-base hidden sm:block">
          MediaVault
        </span>
      </div>

      <div className="flex-1" />

      {/* Upload CTA */}
      {isAuthenticated && (
        <Button
          size="sm"
          className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
          onClick={onUploadClick}
          data-ocid="upload-cta"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload</span>
        </Button>
      )}

      {/* Profile menu */}
      {isAuthenticated && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              data-ocid="profile-menu-trigger"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <Badge
                variant="outline"
                className="hidden md:flex text-xs px-2 py-0 font-mono border-border"
              >
                {shortPrincipal}
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-xs font-mono truncate text-foreground">
                {shortPrincipal}
              </p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 text-destructive focus:text-destructive cursor-pointer"
              onClick={logout}
              data-ocid="sign-out-btn"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </header>
  );
}
