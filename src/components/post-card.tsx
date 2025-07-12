import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

type PostUser = {
  name: string;
  username: string;
  avatarUrl: string;
};

type PostContent = 
  | { type: 'code'; code: string; language: string; }
  | { type: 'image'; imageUrl: string; alt: string; };

type PostStats = {
  likes: number;
  comments: number;
  bookmarks: number;
};

export type PostProps = {
  id: string;
  user: PostUser;
  content: PostContent;
  caption: string;
  stats: PostStats;
  createdAt: string;
};

const SyntaxHighlighter = ({ code, language }: { code: string; language: string }) => {
  return (
    <pre className="bg-secondary rounded-md p-4 overflow-x-auto">
      <code className={`font-code text-sm language-${language}`}>{code}</code>
    </pre>
  );
};

export function PostCard({ user, content, caption, stats, createdAt }: PostProps) {
  const tags = caption.match(/#\w+/g) || [];
  const cleanCaption = caption.replace(/#\w+/g, '').trim();

  return (
    <Card className="w-full bg-card border-border shadow-lg rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <Link href={`/profile/${user.username}`} className="font-bold hover:underline">
            {user.name}
          </Link>
          <p className="text-sm text-muted-foreground">@{user.username} · {createdAt}</p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {content.type === 'code' ? (
          <div className="p-4">
             <SyntaxHighlighter code={content.code} language={content.language} />
          </div>
        ) : (
          <img src={content.imageUrl} alt={content.alt} className="w-full h-auto" data-ai-hint="terminal code" />
        )}

        <div className="p-4 space-y-2">
            <p className="text-foreground">{cleanCaption}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-primary/20">{tag}</Badge>
                ))}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 border-t border-border">
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500">
            <Heart className="h-5 w-5" />
            <span className="sr-only">{stats.likes}</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <MessageCircle className="h-5 w-5" />
             <span className="sr-only">{stats.comments}</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Send className="h-5 w-5" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Bookmark className="h-5 w-5" />
          <span className="sr-only">{stats.bookmarks}</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
