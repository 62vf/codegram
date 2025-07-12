"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { aiCodeReview, type CodeReviewOutput } from "@/ai/flows/code-review";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const postFormSchema = z.object({
  caption: z.string().min(1, "Caption is required.").max(500),
  tags: z.string().optional(),
  code: z.string().optional(),
});

export function PostForm() {
  const [isReviewing, setIsReviewing] = useState(false);
  const [reviewResult, setReviewResult] = useState<CodeReviewOutput | null>(null);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      caption: "",
      tags: "",
      code: "",
    },
  });

  const handleAiReview = async () => {
    const code = form.getValues("code");
    if (!code) {
      setReviewError("Please enter some code to review.");
      return;
    }
    setIsReviewing(true);
    setReviewResult(null);
    setReviewError(null);
    try {
      const result = await aiCodeReview({ code });
      setReviewResult(result);
    } catch (error) {
      setReviewError("An error occurred while reviewing the code.");
      console.error(error);
    } finally {
      setIsReviewing(false);
    }
  };

  function onSubmit(values: z.infer<typeof postFormSchema>) {
    console.log(values);
    alert("Post submitted! (Check console for data)");
    form.reset();
    setReviewResult(null);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Code Snippet</CardTitle>
                <CardDescription>Enter the code you want to share. You can get an AI review before posting.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          placeholder="console.log('Hello, CodeGram!');"
                          className="min-h-[300px] font-code bg-secondary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="button" variant="outline" onClick={handleAiReview} disabled={isReviewing} className="mt-4">
                  {isReviewing ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Review with AI
                </Button>
              </CardContent>
            </Card>

            {reviewResult && (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>AI Code Review Feedback</AlertTitle>
                <AlertDescription>
                  <pre className="whitespace-pre-wrap font-sans">{reviewResult.feedback}</pre>
                </AlertDescription>
              </Alert>
            )}

            {reviewError && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{reviewError}</AlertDescription>
                </Alert>
            )}

          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Post Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Caption</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your post..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <FormControl>
                        <Input placeholder="#javascript #react #ai" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <Button type="button" variant="secondary" className="w-full">Upload Image/Video</Button>
              </CardContent>
            </Card>
            <Button type="submit" className="w-full" size="lg">Post to CodeGram</Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
