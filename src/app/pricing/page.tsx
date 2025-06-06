import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function PricingPage() {
  const tiers = [
    {
      name: "Guest",
      price: "Free",
      features: ["5 Tasks", "Local Storage Only"],
      cta: "Continue as Guest",
      isCurrent: true,
    },
    {
      name: "Authenticated",
      price: "Free",
      features: ["7 Tasks", "Sync across devices", "Limited Workspace Features"],
      cta: "Sign Up",
    },
    {
      name: "Pro (Coming Soon)",
      price: "$10/mo",
      features: ["Unlimited Tasks", "Full Workspace Features", "Invite Team Members", "Advanced AI Insights"],
      cta: "Notify Me",
      disabled: true,
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4 font-headline">Pricing Plans</h1>
      <p className="text-xl text-muted-foreground text-center mb-12">
        Choose the plan that's right for you.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.name} className={`flex flex-col ${tier.isCurrent ? 'border-primary ring-2 ring-primary shadow-xl' : 'shadow-lg'}`}>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-headline mb-2">{tier.name}</CardTitle>
              <p className="text-3xl font-bold text-primary mb-1">{tier.price}</p>
              {tier.name !== "Guest" && tier.name !== "Authenticated" && <p className="text-sm text-muted-foreground">per month</p>}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-6 pt-0">
              <Button className="w-full" size="lg" disabled={tier.disabled}>
                {tier.cta}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
