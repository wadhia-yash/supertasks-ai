import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MailCheck, AlertTriangle } from "lucide-react";

export default function InvitationPage() {
  // This page would handle invitation tokens from query params.
  // For now, it's a placeholder.
  const invitationStatus = "valid"; // "valid", "invalid", "expired" - could be determined from query param processing

  return (
    <div className="container mx-auto py-12 px-4 flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          {invitationStatus === "valid" && <MailCheck className="mx-auto h-12 w-12 text-green-500 mb-4" />}
          {invitationStatus !== "valid" && <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />}
          <CardTitle className="text-3xl font-bold mb-2 font-headline">Workspace Invitation</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {invitationStatus === "valid" && (
            <>
              <CardDescription className="text-lg">
                You've been invited to join a workspace!
              </CardDescription>
              <p>To accept the invitation, please log in or create an account.</p>
              <Button size="lg" className="w-full">Accept Invitation & Sign In</Button>
            </>
          )}
          {invitationStatus === "invalid" && (
            <>
              <CardDescription className="text-lg text-destructive">
                Invalid Invitation Link
              </CardDescription>
              <p>The invitation link you used is not valid. Please check the link or contact the person who invited you.</p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href='/'}>Go to Homepage</Button>
            </>
          )}
           {invitationStatus === "expired" && (
            <>
              <CardDescription className="text-lg text-destructive">
                Invitation Expired
              </CardDescription>
              <p>This invitation link has expired. Please request a new invitation.</p>
              <Button variant="outline" className="w-full" onClick={() => window.location.href='/'}>Go to Homepage</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
