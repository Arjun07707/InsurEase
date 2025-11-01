import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ClaimsStatusChart } from "@/components/charts/claims-status-chart";
import { MonthlyPremiumsChart } from "@/components/charts/monthly-premiums-chart";

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">
              Analytics and insights into the insurance operations.
            </p>
        </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Claims by Status</CardTitle>
                 <CardDescription>A breakdown of all claims submitted.</CardDescription>
            </CardHeader>
            <CardContent>
                <ClaimsStatusChart />
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Premium Collection</CardTitle>
                 <CardDescription>Monthly paid premiums over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <MonthlyPremiumsChart />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
