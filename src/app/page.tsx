import { PostCard, type PostProps } from "@/components/post-card";

const mockPosts: PostProps[] = [
  {
    id: "1",
    user: {
      name: "Alice Coder",
      username: "alice_coder",
      avatarUrl: "https://placehold.co/40x40.png",
    },
    content: {
      type: "code",
      code: `function fibonacci(n) {\n  if (n <= 1) return n;\n  return fibonacci(n - 1) + fibonacci(n - 2);\n}`,
      language: "javascript",
    },
    caption: "Just implemented a recursive Fibonacci function in JS! 🚀 #javascript #recursion #coding",
    stats: {
      likes: 1024,
      comments: 42,
      bookmarks: 128,
    },
    createdAt: "2h ago",
  },
  {
    id: "2",
    user: {
      name: "Bob Hacker",
      username: "bob_hacker",
      avatarUrl: "https://placehold.co/40x40.png",
    },
    content: {
      type: "image",
      imageUrl: "https://placehold.co/600x400.png",
      alt: "A terminal showing a successful Nmap scan."
    },
    caption: "Recon is key. Just finished a scan on my home lab. #cybersecurity #nmap #redteam",
    stats: {
      likes: 512,
      comments: 16,
      bookmarks: 64,
    },
    createdAt: "5h ago",
  },
  {
    id: "3",
    user: {
      name: "Charlie Dev",
      username: "charlie_dev",
      avatarUrl: "https://placehold.co/40x40.png",
    },
    content: {
      type: "code",
      code: `import React from 'react';\n\nconst HelloWorld = () => <h1>Hello, World!</h1>;\n\nexport default HelloWorld;`,
      language: "jsx",
    },
    caption: "My first React component! Simple but feels good. #react #webdev #learning",
    stats: {
      likes: 256,
      comments: 8,
      bookmarks: 32,
    },
    createdAt: "1d ago",
  },
];

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {mockPosts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
}
