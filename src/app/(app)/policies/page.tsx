import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
  } from "@/components/ui/card";
  import { getUserPolicies, getPolicies } from "@/lib/data";
  import { format, parseISO } from "date-fns";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";

  export default async function PoliciesPage() {
    const userPoliciesData = await getUserPolicies();
    const policiesData = await getPolicies();
  
    // Assuming a logged-in user with id 'user-1'
    const currentUserPolicies = userPoliciesData.filter(
      (up) => up.userId === "user-1"
    );
  
    return (
      <div className="flex flex-col gap-8">
         <div>
            <h1 className="text-3xl font-bold tracking-tight">My Policies</h1>
            <p className="text-muted-foreground">
              Manage your active and past insurance policies.
            </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentUserPolicies.map((userPolicy) => {
            const policy = policiesData.find((p) => p.id === userPolicy.policyId);
            if (!policy) return null;
  
            return (
              <Card key={userPolicy.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle>{policy.name}</CardTitle>
                        <Badge variant={userPolicy.status === 'active' ? 'default' : 'secondary'} className="capitalize">
                            {userPolicy.status}
                        </Badge>
                    </div>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow grid gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Coverage</p>
                        <p className="text-2xl font-bold">${policy.coverage.toLocaleString()}</p>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Premium</p>
                        <p className="text-xl font-semibold">${policy.premium}/month</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Policy Period</p>
                        <p className="text-sm text-foreground">
                            {format(parseISO(userPolicy.startDate), "MMM d, yyyy")} - {format(parseISO(userPolicy.endDate), "MMM d, yyyy")}
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">View Details</Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }
