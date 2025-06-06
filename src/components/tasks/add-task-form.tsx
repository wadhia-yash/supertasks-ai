"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Wand2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { suggestTaskPlacement } from "@/ai/flows/suggest-task-placement";
import type { QuadrantId, Task } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const quadrantMapping: Record<string, QuadrantId> = {
  'urgent-and-important': 'urgent-and-important',
  'not-urgent-and-important': 'not-urgent-and-important',
  'urgent-and-not-important': 'urgent-and-not-important',
  'not-urgent-and-not-important': 'not-urgent-and-not-important',
};

const quadrantOptions: { value: QuadrantId; label: string }[] = [
  { value: 'urgent-and-important', label: 'Urgent & Important' },
  { value: 'not-urgent-and-important', label: 'Not Urgent & Important' },
  { value: 'urgent-and-not-important', label: 'Urgent & Not Important' },
  { value: 'not-urgent-and-not-important', label: 'Not Urgent & Not Important' },
];

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().optional(),
  quadrant: z.custom<QuadrantId>(val => quadrantOptions.some(opt => opt.value === val), "Please select a quadrant."),
});

type AddTaskFormValues = z.infer<typeof formSchema>;

interface AddTaskFormProps {
  onSubmit: (values: Omit<Task, 'id' | 'createdAt'>) => void;
  initialData?: Partial<Task>; 
  isEditMode?: boolean;
}

export function AddTaskForm({ onSubmit, initialData, isEditMode = false }: AddTaskFormProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestionReason, setSuggestionReason] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      quadrant: initialData?.quadrant || quadrantOptions[0].value,
    },
  });
  
  useEffect(() => { // Update form if initialData changes (for editing)
    if (initialData) {
      form.reset({
        title: initialData.title || "",
        description: initialData.description || "",
        quadrant: initialData.quadrant || quadrantOptions[0].value,
      });
    }
  }, [initialData, form]);


  const handleSuggestPlacement = async () => {
    const title = form.getValues("title");
    const description = form.getValues("description") || "";

    if (!title) {
      form.setError("title", { message: "Title is required for AI suggestion." });
      return;
    }

    setIsSuggesting(true);
    setSuggestionReason(null);
    try {
      const result = await suggestTaskPlacement({ title, description });
      if (result && result.quadrant) {
        const mappedQuadrant = quadrantMapping[result.quadrant];
        if(mappedQuadrant) {
          form.setValue("quadrant", mappedQuadrant);
          setSuggestionReason(result.reason);
          toast({ title: "AI Suggestion", description: `Suggested: ${quadrantOptions.find(q => q.value === mappedQuadrant)?.label}. ${result.reason}` });
        } else {
          toast({ title: "AI Suggestion Error", description: "AI suggested an unknown quadrant.", variant: "destructive" });
        }
      } else {
         toast({ title: "AI Suggestion Error", description: "Could not get AI suggestion.", variant: "destructive" });
      }
    } catch (error) {
      console.error("AI suggestion error:", error);
      toast({ title: "AI Error", description: "Failed to get suggestion from AI.", variant: "destructive" });
    } finally {
      setIsSuggesting(false);
    }
  };

  function onFormSubmit(values: AddTaskFormValues) {
    onSubmit(values);
    if (!isEditMode) { // Only reset if not editing
      form.reset();
      setSuggestionReason(null);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="E.g., Finish project report" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Add more details about the task..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quadrant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quadrant</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a quadrant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {quadrantOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {suggestionReason && (
          <p className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
            <strong>AI Reason:</strong> {suggestionReason}
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <Button type="button" variant="outline" onClick={handleSuggestPlacement} disabled={isSuggesting} className="w-full sm:w-auto">
            {isSuggesting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            AI Suggest Placement
          </Button>
          <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            {isEditMode ? 'Update Task' : 'Add Task'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
