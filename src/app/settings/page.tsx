import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, UserCircle, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  // This page would typically be protected.
  return (
    <div className="container mx-auto py-12 px-4">
       <Card className="max-w-2xl mx-auto shadow-xl">
        <CardHeader className="text-center">
          <SettingsIcon className="mx-auto h-12 w-12 text-primary mb-4" />
          <CardTitle className="text-4xl font-bold mb-2 font-headline">Settings</CardTitle>
          <CardDescription>
            Manage your account preferences and settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Profile Settings */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold flex items-center"><UserCircle className="mr-2 h-5 w-5 text-primary" />Profile</h3>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" defaultValue="Current User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="user@example.com" disabled />
            </div>
            <Button>Update Profile</Button>
          </div>

          {/* Notification Settings */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold flex items-center"><Bell className="mr-2 h-5 w-5 text-primary" />Notifications</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications" className="flex-grow">Email Notifications</Label>
              <Switch id="emailNotifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="pushNotifications" className="flex-grow">Push Notifications</Label>
              <Switch id="pushNotifications" />
            </div>
          </div>
          
          {/* Appearance Settings */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h3 className="text-xl font-semibold flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" />Appearance</h3>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode" className="flex-grow">Dark Mode</Label>
              {/* Basic toggle, full theme switching would be more complex */}
              <Switch id="darkMode" onCheckedChange={() => {
                document.documentElement.classList.toggle('dark');
              }}/>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
