'use server';

/**
 * @fileOverview An AI agent that suggests the Eisenhower matrix quadrant for a given task.
 *
 * - suggestTaskPlacement - A function that suggests the quadrant for a task.
 * - SuggestTaskPlacementInput - The input type for the suggestTaskPlacement function.
 * - SuggestTaskPlacementOutput - The return type for the suggestTaskPlacement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskPlacementInputSchema = z.object({
  title: z.string().describe('The title of the task.'),
  description: z.string().describe('The description of the task.'),
});
export type SuggestTaskPlacementInput = z.infer<typeof SuggestTaskPlacementInputSchema>;

const SuggestTaskPlacementOutputSchema = z.object({
  quadrant: z
    .enum([
      'urgent-and-important',
      'not-urgent-and-important',
      'urgent-and-not-important',
      'not-urgent-and-not-important',
    ])
    .describe(
      'The suggested quadrant for the task, options are: urgent-and-important, not-urgent-and-important, urgent-and-not-important, not-urgent-and-not-important.'
    ),
  reason: z.string().describe('The reasoning behind the quadrant suggestion.'),
});
export type SuggestTaskPlacementOutput = z.infer<typeof SuggestTaskPlacementOutputSchema>;

export async function suggestTaskPlacement(
  input: SuggestTaskPlacementInput
): Promise<SuggestTaskPlacementOutput> {
  return suggestTaskPlacementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPlacementPrompt',
  input: {schema: SuggestTaskPlacementInputSchema},
  output: {schema: SuggestTaskPlacementOutputSchema},
  prompt: `You are an expert in time management and productivity, specializing in the Eisenhower Matrix (aka Urgent-Important Matrix).

  Given a task title and description, you will suggest which quadrant the task belongs in, and explain your reasoning.

  The quadrants are:
  - urgent-and-important: Tasks that need immediate attention and contribute to long-term goals.
  - not-urgent-and-important: Tasks that contribute to long-term goals but do not need immediate attention.
  - urgent-and-not-important: Tasks that need immediate attention but do not contribute to long-term goals.
  - not-urgent-and-not-important: Tasks that do not need immediate attention and do not contribute to long-term goals.

  Title: {{{title}}}
  Description: {{{description}}}

  Suggest a quadrant and explain your reasoning:
  `,
});

const suggestTaskPlacementFlow = ai.defineFlow(
  {
    name: 'suggestTaskPlacementFlow',
    inputSchema: SuggestTaskPlacementInputSchema,
    outputSchema: SuggestTaskPlacementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
