import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Home, PlusSquare, Search, User } from "lucide-react";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" data-ai-hint="logo" />
            <span className="font-bold">CodeGram</span>
          </Link>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Feed
          </Link>
          <Link href="/explore" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Explore
          </Link>
          <Link href="/profile/me" className="transition-colors hover:text-foreground/80 text-foreground/60">
            Profile
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Button asChild>
            <Link href="/submit">
              <PlusSquare className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src="https://placehold.co/40x40.png" alt="User" data-ai-hint="person" />
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
