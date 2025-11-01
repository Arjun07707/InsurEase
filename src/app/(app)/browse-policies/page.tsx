import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPolicies } from "@/lib/data";
import { Check } from "lucide-react";

export default async function BrowsePoliciesPage() {
  const policies = await getPolicies();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Browse Policies</h1>
        <p className="text-muted-foreground">
          Find the perfect coverage for your needs.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <Card key={policy.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{policy.name}</CardTitle>
              <CardDescription>{policy.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow grid gap-4">
              <div className="text-3xl font-bold">
                ${policy.premium}
                <span className="text-sm font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Up to ${policy.coverage.toLocaleString()} coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Category: {policy.category}</span>
                </li>
                 <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Duration: {policy.duration} months</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Purchase Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
