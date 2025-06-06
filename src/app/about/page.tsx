import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-3xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold mb-4 font-headline">About supertasks.ai</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-lg text-foreground">
          <div className="flex justify-center mb-8">
            <Image 
              src="https://placehold.co/300x200.png" 
              alt="Productivity illustration" 
              width={300} 
              height={200}
              className="rounded-lg shadow-md"
              data-ai-hint="productivity matrix"
            />
          </div>
          <p>
            <strong>supertasks.ai</strong> is your personal assistant for mastering the art of task management using the renowned Eisenhower Matrix.
            We believe that true productivity comes not just from doing more, but from doing the right things.
          </p>
          <p>
            The Eisenhower Matrix, also known as the Urgent-Important Matrix, helps you categorize your tasks based on their urgency and importance. This simple yet powerful framework allows you to:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li><strong className="text-primary">Do First:</strong> Tackle urgent and important tasks immediately.</li>
            <li><strong className="text-blue-500">Schedule:</strong> Plan important but not urgent tasks for later.</li>
            <li><strong className="text-yellow-500">Delegate:</strong> Assign urgent but not important tasks if possible.</li>
            <li><strong className="text-green-500">Eliminate:</strong> Drop tasks that are neither urgent nor important.</li>
          </ul>
          <p>
            Our application provides an intuitive drag-and-drop interface, AI-powered suggestions for task placement (optional), and different access tiers to suit your needs. Whether you're a student, a professional, or anyone looking to improve focus and efficiency, supertasks.ai is designed to help you achieve your goals.
          </p>
          <p className="text-center font-semibold text-primary">
            Start prioritizing effectively today!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
