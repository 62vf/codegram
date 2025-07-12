// This file uses server-side code.
'use server';

/**
 * @fileOverview AI code review flow.
 *
 * This flow allows users to submit their code posts to an AI tool that reviews
 * their code, providing suggestions for improvements or identifying potential
 * errors.
 *
 * @param {string} code - The code to be reviewed.
 * @returns {string} - The AI's feedback on the code.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeReviewInputSchema = z.object({
  code: z.string().describe('The code to be reviewed.'),
});
export type CodeReviewInput = z.infer<typeof CodeReviewInputSchema>;

const CodeReviewOutputSchema = z.object({
  feedback: z.string().describe('The AI feedback on the code.'),
});
export type CodeReviewOutput = z.infer<typeof CodeReviewOutputSchema>;

export async function aiCodeReview(input: CodeReviewInput): Promise<CodeReviewOutput> {
  return aiCodeReviewFlow(input);
}

const codeReviewPrompt = ai.definePrompt({
  name: 'codeReviewPrompt',
  input: {schema: CodeReviewInputSchema},
  output: {schema: CodeReviewOutputSchema},
  prompt: `You are an AI code reviewer. Review the following code and provide suggestions for improvements or identify potential errors.\n\nCode:\n\n{{code}}`,
});

const aiCodeReviewFlow = ai.defineFlow(
  {
    name: 'aiCodeReviewFlow',
    inputSchema: CodeReviewInputSchema,
    outputSchema: CodeReviewOutputSchema,
  },
  async input => {
    const {output} = await codeReviewPrompt(input);
    return output!;
  }
);
