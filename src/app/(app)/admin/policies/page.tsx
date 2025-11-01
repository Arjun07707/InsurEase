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
import { PlusCircle } from "lucide-react";

export default async function AdminPoliciesPage() {
  const policies = await getPolicies();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Policies</h1>
            <p className="text-muted-foreground">
            Create, edit, and manage all insurance policies.
            </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Policy
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {policies.map((policy) => (
          <Card key={policy.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{policy.name}</CardTitle>
              <CardDescription>{policy.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow grid gap-2">
                <div className="text-2xl font-bold">${policy.premium}<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                <p className="text-sm text-muted-foreground">Coverage: ${policy.coverage.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Duration: {policy.duration} months</p>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button className="w-full" variant="outline">Edit</Button>
              <Button className="w-full" variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
