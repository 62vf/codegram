import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const languages = ["Python", "JavaScript", "Rust", "Go", "TypeScript", "Java"];
const domains = ["BugBounty", "AI", "WebDev", "Mobile", "DataScience", "GameDev"];
const tools = ["BurpSuite", "Nmap", "Docker", "Kubernetes", "VSCode", "Neovim"];

export default function ExplorePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold font-headline">Explore CodeGram</h1>
        <p className="text-muted-foreground text-lg">
          Discover trending projects, new tools, and talented coders.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for tags, languages, or users..." className="pl-10 h-12 text-base" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {languages.map(lang => <Badge key={lang} variant="outline" className="text-lg py-1 px-3 cursor-pointer hover:bg-accent/50">#{lang}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Domains</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {domains.map(domain => <Badge key={domain} variant="outline" className="text-lg py-1 px-3 cursor-pointer hover:bg-accent/50">#{domain}</Badge>)}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {tools.map(tool => <Badge key={tool} variant="outline" className="text-lg py-1 px-3 cursor-pointer hover:bg-accent/50">#{tool}</Badge>)}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
