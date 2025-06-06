import { EisenhowerMatrixClient } from "@/components/tasks/eisenhower-matrix-client";

export default function HomePage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 md:mb-8 font-headline">
        Prioritize Your Tasks
      </h1>
      <p className="text-muted-foreground text-center mb-6 md:mb-10 max-w-2xl mx-auto">
        Use the Eisenhower Matrix to distinguish between urgent and important tasks, helping you focus on what truly matters. Drag and drop tasks between quadrants.
      </p>
      <EisenhowerMatrixClient />
    </div>
  );
}
