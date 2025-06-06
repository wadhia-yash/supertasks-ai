import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function WorkspacePage() {
  // This page would typically be protected by authentication.
  // For now, it's a simple placeholder.
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <LayoutDashboard className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-4xl font-bold mb-2 font-headline">My Workspace</CardTitle>
          <CardDescription>
            This is your main workspace dashboard. Manage your projects, tasks, and collaborations here.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg text-muted-foreground">
            Workspace features are currently under development. Check back soon!
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl">Your Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View and manage all your ongoing projects.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Invite and collaborate with your team.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
