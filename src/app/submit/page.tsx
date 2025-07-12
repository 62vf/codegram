import { PostForm } from "@/components/post-form";

export default function SubmitPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold font-headline">Create New Post</h1>
        <p className="text-muted-foreground">Share your code, projects, or thoughts with the community.</p>
      </div>
      <PostForm />
    </div>
  );
}
