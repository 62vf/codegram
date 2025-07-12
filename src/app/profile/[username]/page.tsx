import { PostCard, type PostProps } from "@/components/post-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Globe, Linkedin } from "lucide-react";
import Link from "next/link";

const mockUser = {
  name: "Alice Coder",
  username: "alice_coder",
  avatarUrl: "https://placehold.co/128x128.png",
  bio: "Full-stack developer & open-source enthusiast. Turning coffee into code. #React #NodeJS #Cybersec",
  skills: ["Python", "JavaScript", "Cybersecurity", "React", "Node.js"],
  links: {
    github: "https://github.com/alice",
    linkedin: "https://linkedin.com/in/alice",
    website: "https://alice.dev",
  },
  stats: {
    posts: 42,
    followers: 2048,
    following: 128,
  }
};

const mockPosts: PostProps[] = [
  {
    id: "1",
    user: { name: "Alice Coder", username: "alice_coder", avatarUrl: "https://placehold.co/40x40.png" },
    content: { type: "code", code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`, language: "javascript" },
    caption: "Recursive Fibonacci function in JS!",
    stats: { likes: 1024, comments: 42, bookmarks: 128 },
    createdAt: "2h ago",
  },
  {
    id: "4",
    user: { name: "Alice Coder", username: "alice_coder", avatarUrl: "https://placehold.co/40x40.png" },
    content: { type: "image", imageUrl: "https://placehold.co/600x400.png", alt: "A diagram of a microservices architecture." },
    caption: "Designing a new microservices architecture for my latest project.",
    stats: { likes: 800, comments: 30, bookmarks: 90 },
    createdAt: "3d ago",
  },
];


export default function ProfilePage({ params }: { params: { username: string } }) {
  const user = mockUser;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-8">
        <Card className="p-6 text-center">
            <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait" />
                <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-4 text-foreground/80">{user.bio}</p>
            <div className="mt-6 flex justify-center gap-4">
                <Button>Follow</Button>
                <Button variant="secondary">Message</Button>
            </div>
        </Card>
        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold">Skills</h2>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {user.skills.map(skill => <Badge key={skill}>{skill}</Badge>)}
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold">Links</h2>
            </CardHeader>
            <CardContent className="space-y-2">
                <Link href={user.links.github} className="flex items-center gap-2 hover:text-primary">
                    <Github className="w-4 h-4" /> <span>GitHub</span>
                </Link>
                <Link href={user.links.linkedin} className="flex items-center gap-2 hover:text-primary">
                    <Linkedin className="w-4 h-4" /> <span>LinkedIn</span>
                </Link>
                <Link href={user.links.website} className="flex items-center gap-2 hover:text-primary">
                    <Globe className="w-4 h-4" /> <span>Website</span>
                </Link>
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 space-y-8">
        <h2 className="text-2xl font-bold font-headline">Posts</h2>
        {mockPosts.map(post => <PostCard key={post.id} {...post} />)}
        {mockPosts.length === 0 && <p className="text-muted-foreground">This user hasn't posted anything yet.</p>}
      </div>
    </div>
  );
}
